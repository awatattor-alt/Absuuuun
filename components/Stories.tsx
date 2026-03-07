import { STORY_USERS } from '../constants';
import { Language } from '../types';
import { t } from '../translations';

export default function Stories({ language }: { language: Language }) {
  return (
    <section>
      <h3 className="text-sm font-semibold text-slate-700 mb-2">{t(language).stories}</h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {STORY_USERS.map((user) => (
          <div key={user.id} className="min-w-16 text-center">
            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full mx-auto border-2 border-indigo-500 p-0.5 object-cover" />
            <p className="text-xs text-slate-600 truncate mt-1">{user.name.split(' ')[0]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
