import { Reel } from '../types';

export default function ReelComposer({ onCreate }: { onCreate: (reel: Partial<Reel>) => void }) {
  return (
    <div className="space-y-2">
      <input className="w-full rounded-lg border p-2" placeholder="Reel title" onChange={(e) => onCreate({ title: e.target.value })} />
      <input className="w-full rounded-lg border p-2" placeholder="Caption" onChange={(e) => onCreate({ caption: e.target.value })} />
    </div>
  );
}
