import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialIconsProps {
  className?: string;
  iconSize?: number;
  orientation?: 'horizontal' | 'vertical';
}

const SocialIcons: React.FC<SocialIconsProps> = ({ 
  className,
  iconSize = 20,
  orientation = 'horizontal'
}) => {
  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61578844394701',
      label: 'Facebook',
      color: 'hover:text-blue-500'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/107870987',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: Instagram,
      href: '#instagram',
      label: 'Instagram',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <div className={cn(
      "flex gap-3",
      orientation === 'vertical' ? 'flex-col' : 'flex-row',
      className
    )}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "p-2 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-110 backdrop-blur-sm",
              social.color
            )}
            aria-label={social.label}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;