import { FeedItem, User } from '../types';

interface PostCardProps {
  item: FeedItem;
  currentUser: User | null;
  onRequestLogin: () => void;
}

export default function PostCard({ item, currentUser, onRequestLogin }: PostCardProps) {
  const gatedAction = () => {
    if (!currentUser) onRequestLogin();
  };

  return (
    <article className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3 mb-3">
        <img src={item.author.avatar} alt={item.author.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-sm">{item.author.name}</p>
          <p className="text-xs text-slate-500">{item.createdAt} · {item.type}</p>
        </div>
      </div>
      <p className="text-sm text-slate-800">{item.content}</p>
      {item.image && <img src={item.image} alt="post" className="mt-3 rounded-lg h-52 w-full object-cover" />}
      <div className="mt-3 flex gap-5 text-sm text-slate-500">
        <button onClick={gatedAction}>❤️ {item.likes}</button>
        <button onClick={gatedAction}>💬 {item.comments}</button>
        <button onClick={gatedAction}>↗️ {item.shares}</button>
      </div>
    </article>
  );
}
