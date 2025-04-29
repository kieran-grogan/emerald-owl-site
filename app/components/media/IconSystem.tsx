import React, { SVGProps } from 'react';

interface IconProps {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

export type IconName =
  // Basic UI icons
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'check'
  | 'close'
  | 'menu'
  | 'search'
  | 'settings'
  | 'user'
  // Media/content icons
  | 'image'
  | 'video'
  | 'play'
  | 'pause'
  | 'volume'
  | 'mute'
  // Communication icons
  | 'email'
  | 'phone'
  | 'message'
  | 'share'
  // Social icons
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  // Actions
  | 'edit'
  | 'delete'
  | 'add'
  | 'download'
  | 'upload'
  // Emerald Owl specific
  | 'laser'
  | 'foam'
  | 'neon'
  | 'water'
  | 'owl'
  | 'calendar'
  | 'location';

export default function Icon({
  name,
  size = 'md',
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  onClick,
}: IconProps) {
  // Convert size string to number
  const sizeValue = typeof size === 'string' 
    ? { xs: 16, sm: 20, md: 24, lg: 32, xl: 40 }[size] || 24 
    : size;
  
  // Apply default class for consistent styling
  const iconClass = `inline-block ${className}`;
  
  // SVG common props
  const svgProps: SVGProps<SVGSVGElement> = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: sizeValue,
    height: sizeValue,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    className: iconClass,
    strokeWidth,
    strokeLinecap: 'round' as 'round',
    strokeLinejoin: 'round' as 'round',
    onClick
  };

  // Return icon based on name
  switch (name) {
    // Basic UI icons
    case 'arrow-right':
      return (
        <svg {...svgProps}>
          <path d="M9 5l7 7-7 7" />
        </svg>
      );
    case 'arrow-left':
      return (
        <svg {...svgProps}>
          <path d="M15 19l-7-7 7-7" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg {...svgProps}>
          <path d="M5 15l7-7 7 7" />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg {...svgProps}>
          <path d="M19 9l-7 7-7-7" />
        </svg>
      );
    case 'check':
      return (
        <svg {...svgProps}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case 'close':
      return (
        <svg {...svgProps}>
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...svgProps}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case 'search':
      return (
        <svg {...svgProps}>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
      );
    case 'user':
      return (
        <svg {...svgProps}>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );

    // Media/content icons
    case 'image':
      return (
        <svg {...svgProps}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      );
    case 'video':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <path d="M10 8l6 4-6 4V8z" />
        </svg>
      );
    case 'play':
      return (
        <svg {...svgProps}>
          <path d="M8 5v14l11-7z" />
        </svg>
      );
    case 'pause':
      return (
        <svg {...svgProps}>
          <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
        </svg>
      );
    case 'volume':
      return (
        <svg {...svgProps}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
          <path d="M19.07 4.93a10 10 0 010 14.14" />
        </svg>
      );
    case 'mute':
      return (
        <svg {...svgProps}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      );

    // Communication icons
    case 'email':
      return (
        <svg {...svgProps}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...svgProps}>
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      );
    case 'message':
      return (
        <svg {...svgProps}>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case 'share':
      return (
        <svg {...svgProps}>
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );

    // Social icons
    case 'facebook':
      return (
        <svg {...svgProps} fill={color} stroke="none">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg {...svgProps} fill={color} stroke="none">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...svgProps}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...svgProps} fill={color} stroke="none">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      );

    // Actions
    case 'edit':
      return (
        <svg {...svgProps}>
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    case 'delete':
      return (
        <svg {...svgProps}>
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      );
    case 'add':
      return (
        <svg {...svgProps}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case 'download':
      return (
        <svg {...svgProps}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'upload':
      return (
        <svg {...svgProps}>
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      );

    // Emerald Owl specific
    case 'laser':
      return (
        <svg {...svgProps}>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
          <path d="M4 4l16 16" />
          <path d="M4 20l16 -16" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'foam':
      return (
        <svg {...svgProps}>
          <circle cx="9" cy="8" r="4" />
          <circle cx="15" cy="8" r="3" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="7" cy="14" r="3" />
          <circle cx="17" cy="14" r="3" />
        </svg>
      );
    case 'neon':
      return (
        <svg {...svgProps}>
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M4.93 19.07l1.41-1.41" />
          <path d="M17.66 6.34l1.41-1.41" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    case 'water':
      return (
        <svg {...svgProps}>
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
        </svg>
      );
    case 'owl':
      return (
        <svg {...svgProps}>
          <circle cx="8" cy="9" r="4" />
          <circle cx="16" cy="9" r="4" />
          <circle cx="9" cy="9" r="2" />
          <circle cx="15" cy="9" r="2" />
          <path d="M12 16c3 0 6-2 6-7-2 4-4 5-6 5s-4-1-6-5c0 5 3 7 6 7z" />
          <path d="M7 3c-1 0-3 1-3 5" />
          <path d="M17 3c1 0 3 1 3 5" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...svgProps}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'location':
      return (
        <svg {...svgProps}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    
    // Default fallback icon
    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}

// Icon button with hover effects
export function IconButton({
  name,
  size = 'md',
  color = 'currentColor',
  label,
  onClick,
  className = '',
  variant = 'default',
}: {
  name: IconName;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  label?: string;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'outlined';
}) {
  // Button styling based on variant
  const variantStyles = {
    default: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700',
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    outlined: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
  };
  
  const buttonClasses = `
    inline-flex items-center justify-center p-2 rounded-full
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
    transition-colors duration-200
    ${variantStyles[variant]}
    ${className}
  `.trim();
  
  return (
    <button 
      className={buttonClasses} 
      onClick={onClick}
      aria-label={label || `${name} button`}
      type="button"
    >
      <Icon name={name} size={size} color={color} />
    </button>
  );
} 