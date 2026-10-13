import React from 'react';

/**
 * CodeKnot Brand Logo
 * Replaces the previous generic circle checkmark with the official CodeKnot intertwined knot & curly bracket emblem.
 */
export default function Logo({
  className = "w-7 h-7",
  showText = true,
  textClassName = "text-lg font-bold",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2.5 group cursor-pointer select-none"
    >
      {/* Official CodeKnot Knot + Curly Bracket Mark */}
      <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <img
          src="/codeknot-logo.png"
          alt="CodeKnot Logo"
          className={`object-contain transition-all filter drop-shadow-[0_2px_4px_rgba(234,88,12,0.25)] ${className}`}
        />
      </div>

      {showText && (
        <span
          className={`tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1 font-display ${textClassName}`}
        >
          CodeKnot
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-orange,#F25C05)] animate-pulse" />
        </span>
      )}
    </div>
  );
}
