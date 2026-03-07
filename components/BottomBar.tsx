import { HomeIcon, SearchIcon, ComposeIcon, NotificationsIcon, ProfileIcon } from './icons/Icons';

interface BottomBarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const items = [
  { key: 'home', label: 'Home', Icon: HomeIcon },
  { key: 'search', label: 'Search', Icon: SearchIcon },
  { key: 'compose', label: 'Compose', Icon: ComposeIcon },
  { key: 'notifications', label: 'Alerts', Icon: NotificationsIcon },
  { key: 'profile', label: 'Profile', Icon: ProfileIcon },
];

export default function BottomBar({ currentView, onNavigate }: BottomBarProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-30">
      <div className="grid grid-cols-5">
        {items.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => onNavigate(key)} className={`flex flex-col items-center py-2 text-xs ${currentView === key ? 'text-indigo-600' : 'text-slate-500'}`}>
            <Icon size={20} />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
