import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  MessageSquare,
  ShieldCheck,
  Phone,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MessagesScreen: React.FC = () => {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    sendMessage,
    setActiveScreen,
    setSelectedCarId
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const activeConv = conversations.find(c => c.id === activeConversationId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, inputMessage);
    setInputMessage('');
  };

  return (
    <div className="pb-24 px-4 pt-3 max-w-md mx-auto text-white min-h-screen flex flex-col">
      {/* If inside active chat conversation */}
      {activeConv ? (
        <div className="flex-1 flex flex-col h-[calc(100vh-120px)]">
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.15)] mb-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveConversationId(null)}
                className="w-9 h-9 rounded-xl bg-[#102943]/70 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white truncate max-w-[170px]">
                    {activeConv.dealerName}
                  </h3>
                  <ShieldCheck size={14} className="text-[#50A8FF]" />
                </div>
                <p className="text-[10px] text-emerald-400">Online · Fast Dealer Response</p>
              </div>
            </div>

            {/* Quick Car link */}
            <button
              onClick={() => {
                setSelectedCarId(activeConv.carId);
                setActiveScreen('details');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.18)] hover:border-[#50A8FF]/40 text-[10px] font-medium text-[#50A8FF]"
            >
              <span>View Car</span>
              <ChevronRight size={12} />
            </button>
          </div>

          {/* Vehicle context pill */}
          <div
            onClick={() => {
              setSelectedCarId(activeConv.carId);
              setActiveScreen('details');
            }}
            className="flex items-center gap-2.5 p-2 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.12)] mb-3 cursor-pointer shrink-0"
          >
            <img
              src={activeConv.carImage}
              alt={activeConv.carName}
              referrerPolicy="no-referrer"
              className="w-10 h-8 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0 text-xs">
              <span className="font-semibold text-white truncate block">{activeConv.carName}</span>
              <span className="text-[10px] text-[#50A8FF]">Tap for full specs & window sticker</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
            {activeConv.messages.map(msg => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl ${
                      isUser
                        ? 'bg-[#237BFF] text-white rounded-br-none shadow-[0_0_12px_rgba(35,123,255,0.3)]'
                        : 'bg-[#102943] border border-[rgba(150,190,255,0.18)] text-[#A8B9CC] rounded-bl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[9px] text-[#71869D] mt-1 px-1">{msg.timestamp}</span>
                </div>
              );
            })}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="pt-3 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Type your message to dealer..."
              className="flex-1 px-4 py-3 rounded-2xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white text-xs focus:outline-none focus:border-[#50A8FF]"
            />
            <button
              type="submit"
              className="w-11 h-11 rounded-2xl bg-[#237BFF] hover:bg-[#3A8BFF] text-white flex items-center justify-center shadow-[0_0_12px_rgba(35,123,255,0.4)] cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        /* Conversations List */
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.12)] mb-4">
            <button
              onClick={() => setActiveScreen('home')}
              className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
            >
              <ArrowLeft size={19} />
            </button>

            <div className="text-center">
              <h1 className="text-base font-bold text-white">Dealer Messages</h1>
              <p className="text-[10px] text-[#50A8FF]">Direct Certified Dealer Connect</p>
            </div>

            <div className="w-10" />
          </div>

          {conversations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[#102943]/50 border border-[rgba(150,190,255,0.18)] text-center my-8">
              <MessageSquare size={36} className="mx-auto text-[#50A8FF] mb-3 opacity-60" />
              <h3 className="text-base font-bold text-white">No Inquiries Yet</h3>
              <p className="text-xs text-[#71869D] mt-1 mb-5">
                Browse vehicles and tap "Contact Dealer" to ask questions, schedule test drives, or request financing terms.
              </p>
              <button
                onClick={() => setActiveScreen('search')}
                className="py-2.5 px-5 rounded-2xl bg-[#237BFF] text-white text-xs font-semibold"
              >
                Browse Cars
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className="p-3.5 rounded-2xl bg-[#102943]/70 hover:bg-[#173550]/80 border border-[rgba(150,190,255,0.18)] hover:border-[#50A8FF]/40 transition-all cursor-pointer group flex items-center gap-3.5 relative"
                >
                  {/* Dealer / Car Thumbnail */}
                  <div className="w-13 h-13 rounded-xl overflow-hidden bg-[#071525] shrink-0 border border-[rgba(150,190,255,0.18)]">
                    <img
                      src={conv.carImage}
                      alt={conv.carName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs font-bold text-white truncate">
                          {conv.dealerName}
                        </span>
                        {conv.dealerVerified && (
                          <ShieldCheck size={13} className="text-[#50A8FF] shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-[#71869D] shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-[#50A8FF] truncate mt-0.5">
                      {conv.carName}
                    </p>

                    <p className="text-xs text-[#A8B9CC] truncate mt-0.5 line-clamp-1">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <div className="w-5 h-5 rounded-full bg-[#237BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_8px_#237BFF]">
                      {conv.unreadCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
