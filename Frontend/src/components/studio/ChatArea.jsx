import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Check,
  HelpCircle,
  Code2,
  Terminal,
  PanelRightClose,
  PanelRightOpen,
  ArrowRight,
  Menu,
} from 'lucide-react';
import { CHAT_MODES, SUGGESTION_CHIPS } from '../../utils/constants';

export default function ChatArea({
  conversation,
  activeMode,
  onChangeMode,
  onSendMessage,
  onTriggerConceptTest,
  understandingPanelOpen,
  onToggleUnderstandingPanel,
  onOpenMobileSidebar,
  onGoHome,
}) {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const messages = conversation?.messages || [];

  return (
    <div className="flex-1 h-full flex flex-col bg-transparent overflow-hidden">
      {/* Top Studio Action Bar */}
      <div className="h-14 border-b border-[var(--border-subtle)] px-4 flex items-center justify-between glass-panel bg-[var(--bg-surface)]/70 backdrop-blur-xl shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="md:hidden p-1.5 rounded-lg text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white bg-black/5 dark:bg-white/5"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {conversation?.title || "New Doubt"}
            </h2>
            <div className="text-[10px] text-stone-600 dark:text-zinc-400 font-mono">
              Topic: <span className="font-semibold text-orange-600 dark:text-orange-400">{conversation?.topic || "General Programming"}</span>
            </div>
          </div>
        </div>

        {/* Center/Right: Mode Switcher Pills */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center p-1 rounded-xl glass-pill">
            {CHAT_MODES.map((mode) => {
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => onChangeMode(mode.id)}
                  title={mode.desc}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/25'
                      : 'text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Toggle Understanding Panel */}
          <button
            onClick={onToggleUnderstandingPanel}
            title={understandingPanelOpen ? "Close Understanding Panel" : "Open Understanding Panel"}
            className="p-2 rounded-xl text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white glass-pill transition-colors cursor-pointer"
          >
            {understandingPanelOpen ? (
              <PanelRightClose className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          /* Empty State with Suggestion Chips */
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-12">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 shadow-sm">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
              What coding concept are you untangling today?
            </h3>
            <p className="text-xs text-stone-700 dark:text-zinc-300 mb-8 max-w-md leading-relaxed">
              Ask any debugging dilemma or concept question. CodeKnot will explain the intuition and verify your understanding with 3 targeted questions.
            </p>

            <div className="w-full space-y-2 text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 dark:text-zinc-400 font-bold block px-1">
                Suggested Starter Queries:
              </span>
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(chip.text)}
                  className="glass-card w-full p-3.5 rounded-xl border border-[var(--border-subtle)] hover:border-orange-500/40 text-xs text-stone-800 dark:text-zinc-200 transition-all flex items-center justify-between cursor-pointer group shadow-sm"
                >
                  <span className="truncate pr-2 font-medium">"{chip.text}"</span>
                  <span className="text-[10px] font-mono text-orange-600 dark:text-orange-400/90 group-hover:text-orange-500 shrink-0 font-semibold">
                    {chip.topic}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active Chat Stream */
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Role Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 text-xs font-bold shadow-md ${
                    isUser
                      ? 'bg-stone-800 text-white border border-white/20'
                      : 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-orange-500/25 p-1.5'
                  }`}
                  title={isUser ? "You" : "CodeKnot AI Tutor"}
                >
                  {isUser ? (
                    'You'
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" opacity="0.35" />
                      <path d="M4.5 12a7.5 7.5 0 0 1 12.8-5.3L19 8.5" />
                      <path d="M19.5 12a7.5 7.5 0 0 1-12.8 5.3L5 15.5" />
                      <path d="m9 12 2 2 4-4" strokeWidth="2.4" />
                    </svg>
                  )}
                </div>

                {/* Message Body */}
                <div className={`space-y-3 max-w-[88%] ${isUser ? 'items-end' : ''}`}>
                  <div
                    className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'glass-bubble-user rounded-tr-sm space-y-3 shadow-lg'
                        : 'glass-bubble-assistant rounded-tl-sm space-y-3.5 shadow-md'
                    }`}
                  >
                    {/* Message text */}
                    <div className={`whitespace-pre-line ${isUser ? 'text-white font-medium' : 'text-stone-900 dark:text-zinc-100 font-normal leading-relaxed'}`}>
                      {msg.content}
                    </div>

                    {/* Syntax Code Block */}
                    {msg.code && (
                      <div className={`rounded-xl p-4 font-mono text-xs relative group overflow-x-auto shadow-inner ${
                        isUser
                          ? 'bg-black/60 backdrop-blur-md border border-white/20 text-amber-200'
                          : 'bg-stone-900/95 dark:bg-black/90 border border-stone-800/80 dark:border-white/10 text-emerald-400'
                      }`}>
                        <button
                          onClick={() => handleCopy(msg.id, msg.code)}
                          className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-zinc-200 hover:text-white text-[10px] flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <pre className="pt-2 leading-relaxed">{msg.code}</pre>
                      </div>
                    )}

                    {/* Complexity badge */}
                    {msg.complexity && (
                      <div className="text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30 inline-block shadow-xs">
                        {msg.complexity}
                      </div>
                    )}
                  </div>

                  {/* Core Innovation CTA: "Still confused? Test my understanding" */}
                  {!isUser && msg.showVerificationCta && (
                    <div className="glass-panel p-4 rounded-2xl border border-orange-500/40 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-orange-500/5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                            Did you actually understand the concept?
                          </h4>
                          <p className="text-[11px] text-stone-600 dark:text-zinc-300">
                            Don't just copy the code. Run a 3-question formative check.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={onTriggerConceptTest}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/30 transition-all cursor-pointer active:scale-95 shrink-0"
                      >
                        <span>Still confused? Test my understanding</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Chat Input Bar */}
      <div className="p-3.5 sm:p-4 border-t border-[var(--border-subtle)] glass-panel bg-[var(--bg-surface)]/70 backdrop-blur-xl shrink-0">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative flex items-center">
          <textarea
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a coding doubt, paste broken code, or question an error... (Enter to send)"
            className="w-full py-3.5 pl-4 pr-12 rounded-2xl bg-white/85 dark:bg-black/50 border border-white/70 dark:border-white/10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/25 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-zinc-500 text-xs sm:text-sm resize-none focus:outline-none transition-all shadow-md backdrop-blur-md"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2.5 p-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 disabled:opacity-40 text-white transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-orange-600/25"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
