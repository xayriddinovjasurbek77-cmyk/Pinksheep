import React from 'react';
import { SheepAvatar } from '../../types';

// The 6 avatar sheep coats from Screenshot 17
export const SHEEP_AVATARS: SheepAvatar[] = [
  { id: 1, name: 'Klassik Pushti', coatColor: '#EC008C', hatColor: '#FF4DA6', bgHex: '#FDF2F8' },
  { id: 2, name: 'Lavanda Nafis', coatColor: '#D946EF', hatColor: '#EC008C', bgHex: '#FAF5FF' },
  { id: 3, name: 'Yalpizli Zefir', coatColor: '#10B981', hatColor: '#EC008C', bgHex: '#ECFDF5' },
  { id: 4, name: 'Moviy Osmon', coatColor: '#3B82F6', hatColor: '#EC008C', bgHex: '#EFF6FF' },
  { id: 5, name: 'Quyoshli Iliq', coatColor: '#F59E0B', hatColor: '#EC008C', bgHex: '#FFFBEB' },
  { id: 6, name: 'Binafsha Sehr', coatColor: '#8B5CF6', hatColor: '#EC008C', bgHex: '#F5F3FF' },
];

interface MascotProps {
  avatarId?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  className?: string;
  showHat?: boolean;
  mood?: 'happy' | 'thinking' | 'victory';
}

export const PinkSheepMascot: React.FC<MascotProps> = ({
  avatarId = 1,
  size = 'md',
  className = '',
  showHat = true,
  mood = 'happy'
}) => {
  const avatar = SHEEP_AVATARS.find(a => a.id === avatarId) || SHEEP_AVATARS[0];

  const sizeDimensions = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
    '2xl': 'w-28 h-28',
    hero: 'w-48 h-48 sm:w-64 sm:h-64'
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 hover:scale-105 ${sizeDimensions[size]} ${className}`}
      style={{ backgroundColor: avatar.bgHex }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-[8%]"
      >
        {/* Sheep wool cloud puffs (back) */}
        <circle cx="28" cy="40" r="16" fill={avatar.coatColor} />
        <circle cx="72" cy="40" r="16" fill={avatar.coatColor} />
        <circle cx="24" cy="58" r="15" fill={avatar.coatColor} />
        <circle cx="76" cy="58" r="15" fill={avatar.coatColor} />
        <circle cx="36" cy="74" r="16" fill={avatar.coatColor} />
        <circle cx="64" cy="74" r="16" fill={avatar.coatColor} />
        <circle cx="50" cy="77" r="16" fill={avatar.coatColor} />
        <circle cx="50" cy="30" r="17" fill={avatar.coatColor} />

        {/* Ears */}
        <ellipse cx="20" cy="46" rx="9" ry="5" fill="#FCE7F3" stroke={avatar.coatColor} strokeWidth="2.5" transform="rotate(-20 20 46)" />
        <ellipse cx="80" cy="46" rx="9" ry="5" fill="#FCE7F3" stroke={avatar.coatColor} strokeWidth="2.5" transform="rotate(20 80 46)" />

        {/* Main Face circle */}
        <ellipse cx="50" cy="52" rx="28" ry="24" fill="#FFFFFF" />

        {/* Rosy Cheeks */}
        <ellipse cx="32" cy="57" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.8" />
        <ellipse cx="68" cy="57" rx="5" ry="3.5" fill="#FDA4AF" opacity="0.8" />

        {/* Eyes */}
        {mood === 'victory' ? (
          <>
            {/* Happy squint eyes ^^ */}
            <path d="M34 50 Q39 44 44 50" stroke="#242124" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M56 50 Q61 44 66 50" stroke="#242124" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <circle cx="38" cy="48" r="4.5" fill="#242124" />
            <circle cx="40" cy="46" r="1.5" fill="#FFFFFF" />
            <circle cx="62" cy="48" r="4.5" fill="#242124" />
            <circle cx="64" cy="46" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* Cute Nose and Smile */}
        <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill={avatar.coatColor} />
        <path
          d="M45 59 Q50 65 55 59"
          stroke="#242124"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Forehead curl / hat puff */}
        {showHat && (
          <g>
            <circle cx="42" cy="34" r="8" fill={avatar.hatColor} />
            <circle cx="58" cy="34" r="8" fill={avatar.hatColor} />
            <circle cx="50" cy="28" r="9" fill={avatar.hatColor} />
            <ellipse cx="50" cy="34" rx="14" ry="5" fill={avatar.hatColor} />
          </g>
        )}
      </svg>
    </div>
  );
};

export const PinkSheepLogo: React.FC<{ onClick?: () => void; className?: string }> = ({ onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 cursor-pointer select-none transition-transform hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <PinkSheepMascot size="sm" />
      <span className="text-xl font-extrabold tracking-tight text-[#242124]">
        Pink<span className="text-[#EC008C]">Sheep</span>
      </span>
    </div>
  );
};
