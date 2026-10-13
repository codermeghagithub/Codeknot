import React from 'react';
import { motion } from 'framer-motion';
import { APP_NAME } from '../../utils/constants';

/**
 * Editorial Logo Component for Landing Page
 * - Displays the official CodeKnot intertwined knot and curly bracket emblem
 * - Spring scale transition on hover
 * - High-contrast brand typography using Bricolage Grotesque
 */
export default function Logo({ className = '', iconOnly = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${APP_NAME} home`}
      className={`group flex items-center gap-2.5 text-left text-[var(--text-ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] rounded-lg p-1 transition-opacity cursor-pointer ${className}`}
    >
      {/* Official CodeKnot Knot + Curly Bracket Mark */}
      <motion.div
        className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--bg-paper-secondary)] border border-[var(--border-paper)] shadow-xs overflow-hidden p-0.5"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      >
        <img
          src="/codeknot-logo.png"
          alt={`${APP_NAME} Knot Mark`}
          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(234,88,12,0.25)]"
        />
      </motion.div>

      {!iconOnly && (
        <span className="font-display font-bold text-lg tracking-tight text-[var(--text-ink)] leading-none select-none">
          {APP_NAME}
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent-orange,#F25C05)] ml-0.5 align-baseline" />
        </span>
      )}
    </button>
  );
}
