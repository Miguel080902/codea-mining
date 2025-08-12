import React from 'react';

interface FlagIconProps {
  countryCode: string;
  className?: string;
}

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className = "w-6 h-4" }) => {
  const flags: Record<string, JSX.Element> = {
    'PE': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="8" height="16" fill="#D91023" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#D91023" />
      </svg>
    ),
    'CL': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="8" fill="#FFFFFF" />
        <rect y="8" width="24" height="8" fill="#D52B1E" />
        <rect width="8" height="8" fill="#0F3975" />
        <polygon points="4,2 5.2,4.8 8,4 5.2,5.2 4,8 2.8,5.2 0,4 2.8,4.8" fill="#FFFFFF" />
      </svg>
    ),
    'CO': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="8" fill="#FDE047" />
        <rect y="8" width="24" height="4" fill="#3B82F6" />
        <rect y="12" width="24" height="4" fill="#DC2626" />
      </svg>
    ),
    'AR': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#74C0FC" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#74C0FC" />
        <circle cx="12" cy="8" r="2" fill="none" stroke="#FDE047" strokeWidth="0.5" />
        <path d="M12,6 L12.5,7 L13.5,7 L12.8,7.8 L13,8.5 L12,8 L11,8.5 L11.2,7.8 L10.5,7 L11.5,7 Z" fill="#FDE047" />
      </svg>
    ),
    'BR': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#009739" />
        <path d="M2 8 L12 2 L22 8 L12 14 Z" fill="#FEDD00" />
        <circle cx="12" cy="8" r="3" fill="#002776" />
      </svg>
    ),
    'EC': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="8" fill="#FFD100" />
        <rect y="8" width="24" height="4" fill="#0052CC" />
        <rect y="12" width="24" height="4" fill="#FF0000" />
      </svg>
    ),
    'BO': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#D52B1E" />
        <rect y="5.33" width="24" height="5.34" fill="#FFD100" />
        <rect y="10.67" width="24" height="5.33" fill="#007A33" />
      </svg>
    ),
    'UY': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#FFFFFF" />
        <rect y="1.78" width="24" height="1.78" fill="#0038A8" />
        <rect y="5.33" width="24" height="1.78" fill="#0038A8" />
        <rect y="8.89" width="24" height="1.78" fill="#0038A8" />
        <rect y="12.44" width="24" height="1.78" fill="#0038A8" />
        <rect width="8" height="8" fill="#FFFFFF" />
        <circle cx="4" cy="4" r="1.5" fill="none" stroke="#FDE047" strokeWidth="0.3" />
        <path d="M4,2.5 L4.3,3.2 L5,3.2 L4.5,3.7 L4.7,4.3 L4,4 L3.3,4.3 L3.5,3.7 L3,3.2 L3.7,3.2 Z" fill="#FDE047" />
      </svg>
    ),
    'PY': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#D52B1E" />
        <rect y="5.33" width="24" height="5.34" fill="#FFFFFF" />
        <rect y="10.67" width="24" height="5.33" fill="#0038A8" />
      </svg>
    ),
    'VE': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#FFD100" />
        <rect y="5.33" width="24" height="5.34" fill="#0052CC" />
        <rect y="10.67" width="24" height="5.33" fill="#FF0000" />
        <g fill="#FFFFFF">
          <polygon points="7,6 7.2,6.6 7.8,6.6 7.4,7 7.6,7.6 7,7.3 6.4,7.6 6.6,7 6.2,6.6 6.8,6.6" />
          <polygon points="9,6 9.2,6.6 9.8,6.6 9.4,7 9.6,7.6 9,7.3 8.4,7.6 8.6,7 8.2,6.6 8.8,6.6" />
          <polygon points="11,6 11.2,6.6 11.8,6.6 11.4,7 11.6,7.6 11,7.3 10.4,7.6 10.6,7 10.2,6.6 10.8,6.6" />
          <polygon points="13,6 13.2,6.6 13.8,6.6 13.4,7 13.6,7.6 13,7.3 12.4,7.6 12.6,7 12.2,6.6 12.8,6.6" />
          <polygon points="15,6 15.2,6.6 15.8,6.6 15.4,7 15.6,7.6 15,7.3 14.4,7.6 14.6,7 14.2,6.6 14.8,6.6" />
          <polygon points="17,6 17.2,6.6 17.8,6.6 17.4,7 17.6,7.6 17,7.3 16.4,7.6 16.6,7 16.2,6.6 16.8,6.6" />
          <polygon points="8,8 8.2,8.6 8.8,8.6 8.4,9 8.6,9.6 8,9.3 7.4,9.6 7.6,9 7.2,8.6 7.8,8.6" />
          <polygon points="16,8 16.2,8.6 16.8,8.6 16.4,9 16.6,9.6 16,9.3 15.4,9.6 15.6,9 15.2,8.6 15.8,8.6" />
        </g>
      </svg>
    ),
    'MX': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="8" height="16" fill="#006847" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#CE1126" />
      </svg>
    ),
    'US': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#B22234" />
        <rect y="1.23" width="24" height="1.23" fill="#FFFFFF" />
        <rect y="3.69" width="24" height="1.23" fill="#FFFFFF" />
        <rect y="6.15" width="24" height="1.23" fill="#FFFFFF" />
        <rect y="8.62" width="24" height="1.23" fill="#FFFFFF" />
        <rect y="11.08" width="24" height="1.23" fill="#FFFFFF" />
        <rect y="13.54" width="24" height="1.23" fill="#FFFFFF" />
        <rect width="9.6" height="8.62" fill="#3C3B6E" />
      </svg>
    ),
    'CA': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="6" height="16" fill="#FF0000" />
        <rect x="6" width="12" height="16" fill="#FFFFFF" />
        <rect x="18" width="6" height="16" fill="#FF0000" />
        <path d="M12,4 L13,6 L15,5 L14,7 L16,8 L14,9 L15,11 L13,10 L12,12 L11,10 L9,11 L10,9 L8,8 L10,7 L9,5 L11,6 Z" fill="#FF0000" />
      </svg>
    ),
    'ES': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="4" fill="#AA151B" />
        <rect y="4" width="24" height="8" fill="#F1BF00" />
        <rect y="12" width="24" height="4" fill="#AA151B" />
      </svg>
    ),
    'FR': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="8" height="16" fill="#002654" />
        <rect x="8" width="8" height="16" fill="#FFFFFF" />
        <rect x="16" width="8" height="16" fill="#CE1126" />
      </svg>
    ),
    'DE': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="5.33" fill="#000000" />
        <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
        <rect y="10.67" width="24" height="5.33" fill="#FFCE00" />
      </svg>
    ),
    'GB': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="1.6" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" strokeWidth="1" />
        <path d="M12,0 L12,16 M0,8 L24,8" stroke="#FFFFFF" strokeWidth="2.8" />
        <path d="M12,0 L12,16 M0,8 L24,8" stroke="#C8102E" strokeWidth="1.6" />
      </svg>
    ),
    'AU': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#012169" />
        <rect width="12" height="8" fill="#012169" />
        <path d="M0,0 L12,8 M12,0 L0,8" stroke="#FFFFFF" strokeWidth="0.8" />
        <path d="M0,0 L12,8 M12,0 L0,8" stroke="#C8102E" strokeWidth="0.5" />
        <path d="M6,0 L6,8 M0,4 L12,4" stroke="#FFFFFF" strokeWidth="1.4" />
        <path d="M6,0 L6,8 M0,4 L12,4" stroke="#C8102E" strokeWidth="0.8" />
      </svg>
    ),
    'CN': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#DE2910" />
        <polygon points="4,2 5,4.5 7.5,4 5.5,5.5 6,8 4,6.5 2,8 2.5,5.5 0.5,4 3,4.5" fill="#FFDE00" />
        <polygon points="10,1 10.3,1.7 11,1.7 10.5,2.2 10.7,2.9 10,2.5 9.3,2.9 9.5,2.2 9,1.7 9.7,1.7" fill="#FFDE00" />
        <polygon points="12,3 12.3,3.7 13,3.7 12.5,4.2 12.7,4.9 12,4.5 11.3,4.9 11.5,4.2 11,3.7 11.7,3.7" fill="#FFDE00" />
        <polygon points="12,6 12.3,6.7 13,6.7 12.5,7.2 12.7,7.9 12,7.5 11.3,7.9 11.5,7.2 11,6.7 11.7,6.7" fill="#FFDE00" />
        <polygon points="10,8 10.3,8.7 11,8.7 10.5,9.2 10.7,9.9 10,9.5 9.3,9.9 9.5,9.2 9,8.7 9.7,8.7" fill="#FFDE00" />
      </svg>
    ),
    'JP': (
      <svg className={className} viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="16" fill="#FFFFFF" />
        <circle cx="12" cy="8" r="4.8" fill="#BC002D" />
      </svg>
    ),
  };

  return flags[countryCode] || (
    <div className={`${className} bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600`}>
      {countryCode}
    </div>
  );
};

export default FlagIcon;