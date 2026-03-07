import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({ children, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
);

export const Home: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></BaseIcon>
);
export const Rss: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></BaseIcon>
);
export const MessageCircle: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M21 11.5a8.5 8.5 0 1 1-3.2-6.7" /><path d="M7 21l-1.5-3" /></BaseIcon>
);
export const Bell: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><path d="M15 17H5l1-1v-5a6 6 0 1 1 12 0v5l1 1h-4" /><path d="M10 21a2 2 0 0 0 4 0" /></BaseIcon>
);
export const User: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></BaseIcon>
);
