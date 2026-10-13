import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import UnderstandingPanel from './UnderstandingPanel';
import ConceptTestModal from './ConceptTestModal';
import ProfileModal from './ProfileModal';
import PdfExamModal from './PdfExamModal';
import { INITIAL_CONVERSATION } from '../../utils/constants';

export default function StudioWorkspace({
  currentUser,
  sessionRemaining,
  onSignOut,
  onGoHome,
}) {
  const [conversations, setConversations] = useState([INITIAL_CONVERSATION]);
  const [activeConvId, setActiveConvId] = useState(INITIAL_CONVERSATION.id);
  const [activeMode, setActiveMode] = useState('explain');
  const [understandingPanelOpen, setUnderstandingPanelOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals state
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [pdfExamModalOpen, setPdfExamModalOpen] = useState(false);
  const [conceptScore, setConceptScore] = useState(67);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleNewChat = () => {
    const newConv = {
      id: 'conv_' + Date.now(),
      title: 'New Coding Doubt',
      topic: 'General Programming',
      messages: [],
    };
    setConversations([newConv, ...conversations]);
    setActiveConvId(newConv.id);
  };

  const handleSendMessage = (text) => {
    const userMsg = {
      id: 'msg_' + Date.now(),
      role: 'user',
      content: text,
      time: 'Just now',
    };

    const updatedMessages = [...(activeConversation.messages || []), userMsg];

    // Auto title update if it's the first message
    const updatedTitle =
      activeConversation.messages.length === 0
        ? text.slice(0, 32) + (text.length > 32 ? '...' : '')
        : activeConversation.title;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? { ...c, title: updatedTitle, messages: updatedMessages }
          : c
      )
    );

    // Simulate AI response with pedagogical explanation & Still Confused button
    setTimeout(() => {
      const aiReply = {
        id: 'msg_reply_' + Date.now(),
        role: 'assistant',
        mode: activeMode,
        content: `Here is the pedagogical breakdown in **${activeMode.toUpperCase()}** mode:

1. **Intuition:** The core issue stems from how lexical scoping and event dispatching synchronize in your runtime engine.
2. **Corrected Pattern:** Avoid stale closures by adopting idempotent callbacks or stabilizing references.`,
        code: `// ✅ Recommended implementation (${activeMode} mode)
function resolveDoubt(payload) {
  const sanitized = Object.freeze({ ...payload });
  return processWithVerification(sanitized);
}`,
        complexity: 'Time: O(1) | Space: O(1)',
        time: 'Just now',
        showVerificationCta: true,
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, aiReply] }
            : c
        )
      );
    }, 700);
  };

  const handleTestCompleted = (percent) => {
    setConceptScore(percent);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] relative p-2.5 sm:p-3.5 lg:p-4 flex gap-3 sm:gap-3.5">
      {/* Ambient glassmorphic backlight orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-orange-500/20 via-amber-500/15 to-rose-500/10 blur-[120px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-indigo-500/10 blur-[150px] pointer-events-none -z-0" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-orange-600/20 via-amber-500/15 to-emerald-500/10 blur-[130px] pointer-events-none -z-0" />

      {/* 1. Left Sidebar (Desktop) */}
      <div className="hidden md:flex flex-col h-full shrink-0 z-10 rounded-2xl overflow-hidden glass-panel shadow-lg border border-white/60 dark:border-white/10">
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConvId}
          onSelectConversation={setActiveConvId}
          onNewChat={handleNewChat}
          onOpenPdfExam={() => setPdfExamModalOpen(true)}
          onOpenProfile={() => setProfileModalOpen(true)}
          currentUser={currentUser}
          sessionRemaining={sessionRemaining}
          onSignOut={onSignOut}
          onGoHome={onGoHome}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/80 backdrop-blur-sm p-3">
          <div className="w-64 h-full rounded-2xl overflow-hidden glass-panel">
            <Sidebar
              conversations={conversations}
              activeConversationId={activeConvId}
              onSelectConversation={(id) => {
                setActiveConvId(id);
                setMobileSidebarOpen(false);
              }}
              onNewChat={() => {
                handleNewChat();
                setMobileSidebarOpen(false);
              }}
              onOpenPdfExam={() => {
                setPdfExamModalOpen(true);
                setMobileSidebarOpen(false);
              }}
              onOpenProfile={() => {
                setProfileModalOpen(true);
                setMobileSidebarOpen(false);
              }}
              currentUser={currentUser}
              sessionRemaining={sessionRemaining}
              onSignOut={onSignOut}
              onGoHome={onGoHome}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* 2. Center Chat Console Area */}
      <div className="flex-1 h-full min-w-0 flex flex-col z-10 rounded-2xl overflow-hidden glass-panel shadow-lg border border-white/60 dark:border-white/10">
        <ChatArea
          conversation={activeConversation}
          activeMode={activeMode}
          onChangeMode={setActiveMode}
          onSendMessage={handleSendMessage}
          onTriggerConceptTest={() => setTestModalOpen(true)}
          understandingPanelOpen={understandingPanelOpen}
          onToggleUnderstandingPanel={() =>
            setUnderstandingPanelOpen(!understandingPanelOpen)
          }
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onGoHome={onGoHome}
        />
      </div>

      {/* 3. Right Collapsible Understanding Panel */}
      {understandingPanelOpen && (
        <div className="hidden lg:flex flex-col h-full shrink-0 animate-in fade-in duration-200 z-10 rounded-2xl overflow-hidden glass-panel shadow-lg border border-white/60 dark:border-white/10">
          <UnderstandingPanel
            topic={activeConversation.topic || "React Hook Lifecycle & Closures"}
            scorePercent={conceptScore}
            onLaunchTest={() => setTestModalOpen(true)}
          />
        </div>
      )}

      {/* Interactive 3-Question Concept Test Modal */}
      <ConceptTestModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        onTestCompleted={handleTestCompleted}
      />

      {/* User Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        currentUser={currentUser}
        sessionRemaining={sessionRemaining}
      />

      {/* PDF Exam Modal */}
      <PdfExamModal
        isOpen={pdfExamModalOpen}
        onClose={() => setPdfExamModalOpen(false)}
      />
    </div>
  );
}
