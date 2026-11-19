import React from 'react';
import { BinConfig, WasteCategory } from '../data/wasteItems';

interface TrashBin2DProps {
  bin: BinConfig;
  isHovered: boolean;
  feedbackState: 'idle' | 'correct' | 'wrong';
  disabled: boolean;
  onSelect: (category: WasteCategory) => void;
  binRef?: (el: HTMLButtonElement | null) => void;
}

export const TrashBin2D: React.FC<TrashBin2DProps> = ({
  bin,
  isHovered,
  feedbackState,
  disabled,
  onSelect,
  binRef,
}) => {
  const animClass =
    feedbackState === 'correct'
      ? 'animate-bin-bounce'
      : feedbackState === 'wrong'
        ? 'animate-bin-shake'
        : '';

  const palette = {
    organik: {
      body: '#16A34A',
      bodyDark: '#15803D',
      lid: '#22C55E',
      ring: 'ring-emerald-400',
      surface: 'bg-emerald-50 hover:bg-emerald-100/90 border-emerald-300',
      badgeText: 'text-emerald-900',
    },
    anorganik: {
      body: '#D97706',
      bodyDark: '#B45309',
      lid: '#F59E0B',
      ring: 'ring-amber-400',
      surface: 'bg-amber-50 hover:bg-amber-100/90 border-amber-300',
      badgeText: 'text-amber-950',
    },
    b3: {
      body: '#DC2626',
      bodyDark: '#B91C1C',
      lid: '#EF4444',
      ring: 'ring-red-400',
      surface: 'bg-red-50 hover:bg-red-100/90 border-red-300',
      badgeText: 'text-red-950',
    },
  }[bin.id];

  return (
    <button
      ref={binRef}
      type="button"
      disabled={disabled}
      onClick={() => onSelect(bin.id)}
      aria-label={`Pilih ${bin.label}: ${bin.subtitle}`}
      className={`group relative flex flex-col items-center justify-between w-full min-h-[210px] sm:min-h-[236px] p-4 sm:p-5 rounded-3xl border-2 transition-transform duration-150 focus-visible:outline-none focus-visible:ring-4 ${palette.ring} ${palette.surface} ${
        isHovered
          ? `scale-[1.04] ring-4 ${palette.ring} shadow-lg`
          : 'shadow-sm hover:-translate-y-1 active:scale-[0.98]'
      } ${disabled ? 'opacity-85 cursor-default' : 'cursor-pointer'} ${animClass}`}
    >
      {/* Top keyboard / tap indicator */}
      <div className="w-full flex items-center justify-between text-xs font-semibold text-slate-500">
        <span className="font-mono tabular-nums">Tombol {bin.shortcutKey}</span>
        {isHovered && (
          <span className={`font-bold ${palette.badgeText}`}>Lepas di sini!</span>
        )}
      </div>

      {/* 2D Vector Bin Illustration */}
      <div className="relative my-2 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible" aria-hidden="true">
          {/* Hinged Lid (tilts open on hover or correct!) */}
          <g
            style={{
              transformOrigin: '24px 36px',
              transform:
                isHovered || feedbackState === 'correct'
                  ? 'rotate(-18deg) translateY(-4px)'
                  : 'rotate(0deg)',
              transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Lid handle */}
            <rect
              x="48"
              y="18"
              width="24"
              height="8"
              rx="4"
              fill={palette.bodyDark}
              stroke="#0F172A"
              strokeWidth="3"
            />
            {/* Lid top */}
            <rect
              x="20"
              y="26"
              width="80"
              height="14"
              rx="6"
              fill={palette.lid}
              stroke="#0F172A"
              strokeWidth="3.5"
            />
          </g>

          {/* Bin Body */}
          <path
            d="M26 42 L94 42 L88 106 C87.5 110, 84 112, 80 112 L40 112 C36 112, 32.5 110, 32 106 Z"
            fill={palette.body}
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Subtle shading stripe */}
          <path
            d="M78 44 L90 44 L84 108 L74 108 Z"
            fill={palette.bodyDark}
            opacity="0.35"
          />

          {/* Friendly 2D Eyes */}
          {feedbackState === 'correct' ? (
            <>
              <path d="M44 62 Q48 56 52 62" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M68 62 Q72 56 76 62" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M52 70 Q60 78 68 70" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : feedbackState === 'wrong' ? (
            <>
              <path d="M44 58 L51 64 M51 58 L44 64" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M69 58 L76 64 M76 58 L69 64" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
              <path d="M53 74 Q60 69 67 74" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="48" cy="60" r="4" fill="#FFFFFF" />
              <circle cx="49" cy="59" r="1.8" fill="#0F172A" />
              <circle cx="72" cy="60" r="4" fill="#FFFFFF" />
              <circle cx="73" cy="59" r="1.8" fill="#0F172A" />
              <path d="M54 68 Q60 73 66 68" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Category Icon Emblem on lower bin */}
          {bin.id === 'organik' && (
            <g transform="translate(49, 80)">
              <circle cx="11" cy="11" r="13" fill="#FFFFFF" opacity="0.95" />
              <path
                d="M5 17 C5 9, 11 4, 18 5 C17 13, 12 18, 5 17 Z"
                fill="#16A34A"
              />
              <path d="M5 17 L14 9" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          )}

          {bin.id === 'anorganik' && (
            <g transform="translate(49, 80)">
              <circle cx="11" cy="11" r="13" fill="#FFFFFF" opacity="0.95" />
              <path
                d="M11 3 L17 13 L5 13 Z"
                fill="none"
                stroke="#D97706"
                strokeWidth="2.6"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="11" r="2.2" fill="#D97706" />
            </g>
          )}

          {bin.id === 'b3' && (
            <g transform="translate(49, 80)">
              <circle cx="11" cy="11" r="13" fill="#FFFFFF" opacity="0.95" />
              <polygon
                points="11,3 19,17 3,17"
                fill="#FEF08A"
                stroke="#DC2626"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <line x1="11" y1="8" x2="11" y2="12" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="11" cy="14.8" r="1.2" fill="#DC2626" />
            </g>
          )}
        </svg>
      </div>

      {/* Clear, high-contrast label for back-row classroom readability */}
      <div className="text-center">
        <div className={`font-display text-xl sm:text-2xl font-extrabold tracking-tight ${palette.badgeText}`}>
          {bin.shortTitle}
        </div>
        <div className="text-sm font-semibold text-slate-700 mt-0.5">
          {bin.subtitle}
        </div>
        <div className="text-xs text-slate-500 mt-0.5 hidden sm:block">
          {bin.examples}
        </div>
      </div>
    </button>
  );
};
