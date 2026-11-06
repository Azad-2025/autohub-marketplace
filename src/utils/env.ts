/**
 * Environment configuration and validation utility for AutoHub.
 * Safely inspects Vite client-side environment variables without exposing secrets.
 */

export interface AppEnvConfig {
  appUrl: string;
  isProduction: boolean;
  isDevelopment: boolean;
  version: string;
}

export const getAppEnv = (): AppEnvConfig => {
  return {
    appUrl: import.meta.env.VITE_APP_URL || window.location.origin,
    isProduction: import.meta.env.PROD ?? false,
    isDevelopment: import.meta.env.DEV ?? true,
    version: '2.4.0'
  };
};
