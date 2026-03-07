import React from 'react';

type IconProps = { className?: string; size?: number };
const IconWrap = ({ className, size = 24, children }: IconProps & { children: React.ReactNode }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

export const HomeIcon = (p: IconProps) => <IconWrap {...p}><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/></IconWrap>;
export const SearchIcon = (p: IconProps) => <IconWrap {...p}><circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/></IconWrap>;
export const ComposeIcon = (p: IconProps) => <IconWrap {...p}><path d="M4 20h4l10-10-4-4L4 16z"/><path d="m12 6 4 4"/></IconWrap>;
export const NotificationsIcon = (p: IconProps) => <IconWrap {...p}><path d="M15 17H5l1.2-1.6c.5-.6.8-1.4.8-2.2V10a5 5 0 1 1 10 0v3.2c0 .8.3 1.6.8 2.2L19 17h-4"/><path d="M10 20a2 2 0 0 0 4 0"/></IconWrap>;
export const ProfileIcon = (p: IconProps) => <IconWrap {...p}><circle cx="12" cy="8" r="3.5"/><path d="M4 20a8 8 0 0 1 16 0"/></IconWrap>;
export const ExploreIcon = (p: IconProps) => <IconWrap {...p}><circle cx="12" cy="12" r="9"/><path d="m9 15 2-6 6-2-2 6z"/></IconWrap>;
export const EventsIcon = (p: IconProps) => <IconWrap {...p}><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></IconWrap>;
export const DebatesIcon = (p: IconProps) => <IconWrap {...p}><path d="M4 5h12v8H9l-4 4z"/><path d="M10 11h10v8h-6l-3 3z"/></IconWrap>;
export const CandidatesIcon = (p: IconProps) => <IconWrap {...p}><circle cx="9" cy="8" r="3"/><path d="M3 18a6 6 0 0 1 12 0"/><path d="m17 10 2 2 3-3"/></IconWrap>;
