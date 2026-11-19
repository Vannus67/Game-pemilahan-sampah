import React from 'react';

interface WasteIllustrationProps {
  id: string;
  className?: string;
}

export const WasteIllustration: React.FC<WasteIllustrationProps> = ({
  id,
  className = 'w-28 h-28',
}) => {
  switch (id) {
    case 'kulit-pisang':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="64" r="46" fill="#FEF9C3" />
          {/* Left peel */}
          <path
            d="M55 42 C34 48, 22 68, 26 84 C36 82, 46 72, 56 54 Z"
            fill="#FACC15"
            stroke="#854D0E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Right peel */}
          <path
            d="M65 42 C86 48, 98 68, 94 84 C84 82, 74 72, 64 54 Z"
            fill="#FDE047"
            stroke="#854D0E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Center peel */}
          <path
            d="M54 40 C52 60, 48 80, 58 92 C68 80, 66 60, 66 40 Z"
            fill="#FEF08A"
            stroke="#854D0E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Stem */}
          <path
            d="M54 40 L56 26 L64 26 L66 40 Z"
            fill="#A16207"
            stroke="#854D0E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Spots */}
          <circle cx="38" cy="68" r="2.5" fill="#A16207" />
          <circle cx="82" cy="70" r="2.5" fill="#A16207" />
        </svg>
      );

    case 'daun-kering':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEF3C7" />
          {/* Large leaf */}
          <path
            d="M28 84 C26 52, 54 26, 92 28 C90 66, 64 92, 28 84 Z"
            fill="#D97706"
            stroke="#78350F"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Midrib & veins */}
          <path
            d="M22 90 L82 36 M48 66 L44 50 M62 54 L58 40 M54 62 L70 64"
            stroke="#78350F"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Small dry leaf */}
          <path
            d="M68 84 C74 70, 90 66, 98 76 C90 90, 76 94, 68 84 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'tulang-ikan':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#E0F2FE" />
          {/* Spine */}
          <line x1="34" y1="60" x2="88" y2="60" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
          {/* Ribs */}
          <line x1="48" y1="42" x2="48" y2="78" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="60" y1="40" x2="60" y2="80" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          <line x1="72" y1="44" x2="72" y2="76" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
          {/* Head */}
          <path
            d="M36 44 C20 48, 18 72, 36 76 Z"
            fill="#F8FAFC"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="56" r="2.5" fill="#334155" />
          {/* Tail */}
          <path
            d="M86 60 L100 46 L96 60 L100 74 Z"
            fill="#F8FAFC"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'potongan-sayur':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#DCFCE7" />
          {/* Carrot top */}
          <path
            d="M34 52 L54 52 L48 86 C46 92, 42 92, 40 86 Z"
            fill="#FB923C"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M44 52 C38 38, 30 36, 32 30 M44 52 C44 36, 48 32, 52 28 M44 52 C52 40, 60 40, 58 32"
            fill="none"
            stroke="#15803D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Cabbage leaf */}
          <path
            d="M62 46 C78 38, 96 48, 94 68 C92 84, 72 90, 62 76 C56 66, 56 52, 62 46 Z"
            fill="#4ADE80"
            stroke="#166534"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M70 76 C74 64, 78 58, 84 54" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'apel-bekas':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEE2E2" />
          {/* Top cap */}
          <path
            d="M36 42 C38 28, 54 28, 60 34 C66 28, 82 28, 84 42 C72 46, 48 46, 36 42 Z"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Core */}
          <path
            d="M52 44 C56 56, 56 68, 52 80 L68 80 C64 68, 64 56, 68 44 Z"
            fill="#FEF3C7"
            stroke="#92400E"
            strokeWidth="3"
          />
          {/* Seeds */}
          <ellipse cx="57" cy="62" rx="2" ry="3.5" fill="#451A03" />
          <ellipse cx="63" cy="62" rx="2" ry="3.5" fill="#451A03" />
          {/* Bottom cap */}
          <path
            d="M38 80 C48 76, 72 76, 82 80 C80 94, 66 96, 60 90 C54 96, 40 94, 38 80 Z"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Stem & leaf */}
          <path d="M60 34 L62 20" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 24 C72 18, 78 24, 72 30 C68 32, 62 28, 62 24 Z" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
        </svg>
      );

    case 'sisa-nasi':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#F1F5F9" />
          {/* Rice mound */}
          <path
            d="M32 64 C32 42, 46 34, 60 34 C74 34, 88 42, 88 64 Z"
            fill="#FFFFFF"
            stroke="#64748B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Bowl */}
          <path
            d="M26 64 L94 64 C92 84, 78 92, 60 92 C42 92, 28 84, 26 64 Z"
            fill="#38BDF8"
            stroke="#0369A1"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="44" y="92" width="32" height="6" rx="3" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5" />
          {/* Rice grain details */}
          <ellipse cx="48" cy="50" rx="3" ry="1.8" fill="#CBD5E1" transform="rotate(-20 48 50)" />
          <ellipse cx="62" cy="46" rx="3" ry="1.8" fill="#CBD5E1" transform="rotate(15 62 46)" />
          <ellipse cx="72" cy="54" rx="3" ry="1.8" fill="#CBD5E1" transform="rotate(-10 72 54)" />
        </svg>
      );

    case 'botol-plastik':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#DBEAFE" />
          {/* Cap */}
          <rect x="50" y="18" width="20" height="10" rx="3" fill="#2563EB" stroke="#1E3A8A" strokeWidth="3" />
          {/* Neck & Body */}
          <path
            d="M52 28 L68 28 L72 42 L78 48 L78 94 C78 98, 74 100, 70 100 L50 100 C46 100, 42 98, 42 94 L42 48 L48 42 Z"
            fill="#93C5FD"
            stroke="#1D4ED8"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Label band */}
          <rect x="42" y="58" width="36" height="22" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
          <line x1="48" y1="66" x2="72" y2="66" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="73" x2="64" y2="73" stroke="#DBEAFE" strokeWidth="2.5" strokeLinecap="round" />
          {/* Highlight */}
          <line x1="49" y1="48" x2="49" y2="54" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'kaleng-minuman':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEE2E2" />
          {/* Can body */}
          <rect
            x="40"
            y="28"
            width="40"
            height="66"
            rx="8"
            fill="#EF4444"
            stroke="#7F1D1D"
            strokeWidth="3.5"
          />
          {/* Top & Bottom metallic rims */}
          <rect x="42" y="26" width="36" height="8" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="3" />
          <rect x="42" y="88" width="36" height="8" rx="4" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
          {/* Lightning / stripe */}
          <path d="M40 54 L80 46 L80 66 L40 74 Z" fill="#FDE047" stroke="#7F1D1D" strokeWidth="2.5" />
          {/* Pull tab */}
          <ellipse cx="60" cy="24" rx="6" ry="3" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        </svg>
      );

    case 'kardus-bekas':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEF3C7" />
          {/* Open flaps */}
          <polygon points="30,44 60,34 60,48 30,58" fill="#F59E0B" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="90,44 60,34 60,48 90,58" fill="#D97706" stroke="#78350F" strokeWidth="3" strokeLinejoin="round" />
          {/* Box front */}
          <rect
            x="30"
            y="48"
            width="60"
            height="44"
            rx="4"
            fill="#FBBF24"
            stroke="#78350F"
            strokeWidth="3.5"
          />
          {/* Tape strip */}
          <rect x="52" y="48" width="16" height="14" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          {/* Recycle symbol hint */}
          <path
            d="M52 72 L60 64 L68 72 M56 80 L64 80"
            fill="none"
            stroke="#78350F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'botol-kaca':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#CCFBF1" />
          <path
            d="M52 22 L68 22 L68 38 L78 52 L78 92 C78 96, 74 98, 70 98 L50 98 C46 98, 42 96, 42 92 L42 52 L52 38 Z"
            fill="#5EEAD4"
            stroke="#0F766E"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <rect x="50" y="18" width="20" height="6" rx="2" fill="#0D9488" stroke="#0F766E" strokeWidth="2.5" />
          <rect x="46" y="60" width="28" height="20" rx="3" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2.5" />
          <circle cx="60" cy="70" r="5" fill="#14B8A6" />
        </svg>
      );

    case 'sedotan-plastik':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FCE7F3" />
          {/* Bent straw 1 */}
          <path
            d="M36 92 L54 44 L82 32"
            fill="none"
            stroke="#EC4899"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M36 92 L54 44 L82 32"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeDasharray="6 6"
            strokeLinecap="round"
          />
          {/* Straw 2 */}
          <path
            d="M60 94 L72 52 L92 48"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'kantong-plastik':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#E0E7FF" />
          {/* Handles */}
          <path
            d="M42 42 L42 26 C42 22, 48 22, 48 26 L48 42 M72 42 L72 26 C72 22, 78 22, 78 26 L78 42"
            fill="none"
            stroke="#4338CA"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Bag body */}
          <path
            d="M34 42 L86 42 L90 90 C90 94, 86 96, 82 96 L38 96 C34 96, 30 94, 30 90 Z"
            fill="#A5B4FC"
            stroke="#3730A3"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Crinkle lines */}
          <path d="M44 58 L54 72 M72 56 L64 78" stroke="#E0E7FF" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'baterai-bekas':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEE2E2" />
          {/* Terminal top */}
          <rect x="52" y="20" width="16" height="8" rx="2" fill="#94A3B8" stroke="#1E293B" strokeWidth="3" />
          {/* Battery body */}
          <rect x="38" y="28" width="44" height="68" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          <rect x="38" y="28" width="44" height="24" rx="6" fill="#EF4444" stroke="#0F172A" strokeWidth="3.5" />
          {/* Plus / Minus & Bolt */}
          <path d="M56 38 L64 38 M60 34 L60 42" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 60 L54 74 L61 74 L58 86 L68 70 L61 70 Z" fill="#FACC15" />
        </svg>
      );

    case 'lampu-neon':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEF3C7" />
          {/* Bulb glass */}
          <path
            d="M46 72 C34 62, 34 32, 60 28 C86 32, 86 62, 74 72 L70 82 L50 82 Z"
            fill="#E2E8F0"
            stroke="#334155"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Crack mark */}
          <path d="M56 38 L64 48 L56 56 L62 64" fill="none" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Metal base */}
          <rect x="48" y="82" width="24" height="14" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <line x1="50" y1="88" x2="70" y2="88" stroke="#334155" strokeWidth="2.5" />
        </svg>
      );

    case 'obat-kedaluwarsa':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FEE2E2" />
          {/* Cap */}
          <rect x="44" y="24" width="32" height="12" rx="3" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
          {/* Bottle */}
          <rect x="36" y="36" width="48" height="58" rx="8" fill="#FFFFFF" stroke="#475569" strokeWidth="3.5" />
          {/* Cross */}
          <rect x="56" y="52" width="8" height="24" rx="2" fill="#EF4444" />
          <rect x="48" y="60" width="24" height="8" rx="2" fill="#EF4444" />
          {/* X warning badge */}
          <circle cx="82" cy="82" r="11" fill="#FACC15" stroke="#78350F" strokeWidth="2.5" />
          <path d="M78 78 L86 86 M86 78 L78 86" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'kaleng-semprot':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#FFEDD5" />
          {/* Nozzle */}
          <rect x="54" y="20" width="12" height="12" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
          <circle cx="62" cy="25" r="2" fill="#DC2626" />
          {/* Shoulder */}
          <path d="M40 44 C40 34, 48 32, 60 32 C72 32, 80 34, 80 44 Z" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
          {/* Can body */}
          <rect x="40" y="44" width="40" height="52" rx="4" fill="#EA580C" stroke="#7C2D12" strokeWidth="3.5" />
          {/* Hazard triangle */}
          <polygon points="60,54 72,76 48,76" fill="#FEF08A" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="60" y1="62" x2="60" y2="69" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="73" r="1.5" fill="#7C2D12" />
        </svg>
      );

    case 'cat-bekas':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#F3E8FF" />
          {/* Paint bucket */}
          <rect x="34" y="38" width="52" height="54" rx="5" fill="#94A3B8" stroke="#334155" strokeWidth="3.5" />
          {/* Rim */}
          <rect x="30" y="32" width="60" height="10" rx="4" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
          {/* Paint drip */}
          <path
            d="M36 42 L84 42 L84 52 C80 58, 76 52, 72 64 C68 72, 62 58, 56 54 C50 62, 44 68, 40 54 L36 52 Z"
            fill="#DC2626"
            stroke="#7F1D1D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Label */}
          <rect x="44" y="68" width="32" height="14" rx="2" fill="#FEF08A" stroke="#334155" strokeWidth="2" />
        </svg>
      );

    case 'elektronik-rusak':
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="60" cy="62" r="46" fill="#E2E8F0" />
          {/* Phone body */}
          <rect x="38" y="24" width="44" height="72" rx="7" fill="#334155" stroke="#0F172A" strokeWidth="3.5" />
          {/* Broken screen */}
          <rect x="43" y="32" width="34" height="52" rx="3" fill="#64748B" />
          <path d="M46 38 L62 54 L52 66 L70 78" fill="none" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M72 42 L58 52" fill="none" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="90" r="3" fill="#94A3B8" />
        </svg>
      );
  }
};
