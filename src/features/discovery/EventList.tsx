import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import type { BusinessEvent } from '../../types/models';
import { formatEventDate } from '../../utils/format';

interface EventListProps {
  events: BusinessEvent[];
}

export function EventList({ events }: EventListProps) {
  if (!events.length) {
    return (
      <div className="surface empty-state">
        No results yet. Search to discover business and community opportunities.
      </div>
    );
  }

  return (
    <div className="event-list">
      {events.map((event, index) => (
        <motion.article
          key={event.id}
          className="surface step-card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <h3 className="step-title">{event.title}</h3>
          <p className="step-body">{event.summary}</p>
          <div className="event-meta">
            <span>
              <CalendarDays size={15} /> {formatEventDate(event.startsAt)}
            </span>
            <span>
              <MapPin size={15} /> {event.city}
            </span>
            <span className="event-category">{event.category}</span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
