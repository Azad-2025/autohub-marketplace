import { useEffect, useState, useCallback } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('autohub_install_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  // Service worker update registration using vite-plugin-pwa virtual hook
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW({
    onRegistered(r) {
      // Periodic check for SW update (e.g. every hour)
      if (r) {
        setInterval(() => {
          r.update().catch(() => {});
        }, 60 * 60 * 1000);
      }
    },
    onRegisterError(error) {
      // SW registration error caught safely
    }
  });

  useEffect(() => {
    // Check if running in standalone mode (already installed PWA)
    const checkStandalone = () => {
      const isDisplayStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(Boolean(isDisplayStandalone || isNavigatorStandalone));
    };

    checkStandalone();

    // Listen for display mode changes (e.g. launched from home screen)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const mediaListener = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', mediaListener);
    }

    // Detect iOS devices
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Capture beforeinstallprompt event (Chromium / Android)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Track app installation completion
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      try {
        localStorage.setItem('autohub_install_banner_dismissed', 'true');
      } catch {}
    };

    // Network connectivity listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', mediaListener);
      }
    };
  }, []);

  const installApp = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unsupported'> => {
    if (!deferredPrompt) {
      return 'unsupported';
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsStandalone(true);
        setDeferredPrompt(null);
        try {
          localStorage.setItem('autohub_install_banner_dismissed', 'true');
        } catch {}
      }
      return choice.outcome;
    } catch {
      return 'dismissed';
    }
  }, [deferredPrompt]);

  const dismissBanner = useCallback(() => {
    setIsBannerDismissed(true);
    try {
      localStorage.setItem('autohub_install_banner_dismissed', 'true');
    } catch {}
  }, []);

  const handleUpdate = useCallback(async () => {
    await updateServiceWorker(true);
  }, [updateServiceWorker]);

  return {
    isInstallable: Boolean(deferredPrompt) || isIOS,
    hasNativePrompt: Boolean(deferredPrompt),
    isStandalone,
    isIOS,
    isOnline,
    isBannerDismissed,
    installApp,
    dismissBanner,
    needRefresh,
    setNeedRefresh,
    handleUpdate
  };
}
