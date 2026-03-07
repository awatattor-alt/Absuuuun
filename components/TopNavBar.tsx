interface TopNavBarProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function TopNavBar({ tabs, activeTab, onChange }: TopNavBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-slate-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'border-transparent text-slate-500'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
