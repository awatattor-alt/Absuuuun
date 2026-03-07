import { HomeIcon, SearchIcon, ComposeIcon, NotificationsIcon, ProfileIcon, ExploreIcon, EventsIcon, DebatesIcon, CandidatesIcon } from './icons/Icons';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const items = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'explore', label: 'Explore', Icon: ExploreIcon },
  { key: 'events', label: 'Events', Icon: EventsIcon },
  { key: 'debates', label: 'Debates', Icon: DebatesIcon },
  { key: 'candidates', label: 'Candidates', Icon: CandidatesIcon },
  { key: 'search', label: 'Search', Icon: SearchIcon },
  { key: 'compose', label: 'Compose', Icon: ComposeIcon },
  { key: 'notifications', label: 'Notifications', Icon: NotificationsIcon },
  { key: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function Sidebar({ currentView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-56 md:flex-col border-r border-slate-200 p-3 gap-1">
      {items.map(({ key, label, Icon }) => (
        <button key={key} onClick={() => onNavigate(key)} className={`flex items-center gap-3 rounded-lg p-2 text-sm ${currentView === key ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600 hover:bg-slate-100'}`}>
          <Icon size={20} />
          <span>{label}</span>
        </button>
      ))}
    </aside>
  );
}
