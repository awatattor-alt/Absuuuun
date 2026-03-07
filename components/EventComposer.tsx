import { Event } from '../types';

export default function EventComposer({ onCreate }: { onCreate: (event: Partial<Event>) => void }) {
  return (
    <div className="space-y-2">
      <input className="w-full rounded-lg border p-2" placeholder="Event title" onChange={(e) => onCreate({ title: e.target.value })} />
      <input className="w-full rounded-lg border p-2" placeholder="Location" onChange={(e) => onCreate({ location: e.target.value })} />
      <input className="w-full rounded-lg border p-2" placeholder="Date" onChange={(e) => onCreate({ date: e.target.value })} />
    </div>
  );
}
