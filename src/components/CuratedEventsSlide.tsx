
import React, { useState, useCallback } from 'react';
import { Event, TranslationSet } from '../types';
import { generateCuratedEvents } from '../services/geminiService';
import GlassCard from './GlassCard';
import { Zap } from './IconComponents';

interface CuratedEventsSlideProps {
  t: TranslationSet;
}

const CuratedEventsSlide: React.FC<CuratedEventsSlideProps> = ({ t }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedEvents = await generateCuratedEvents();
      setEvents(generatedEvents);
    } catch (err) {
      setError(t.curatedEvents.error);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  const renderSkeletons = () => (
    Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-pulse">
            <div className="bg-white/10 h-40 rounded-lg mb-4"></div>
            <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-1/2"></div>
        </div>
    ))
  );

  return (
    <section>
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{t.aiCuratedEvents}</h2>
        <p className="text-gray-400 mb-6">{t.aiEventsSub}</p>
        <button
          onClick={handleGenerateEvents}
          disabled={isLoading}
          className="bg-gradient-to-r from-[#FF2E97] to-[#6C2BD9] text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t.curatedEvents.generating : t.curatedEvents.generateButton}
        </button>
      </div>

      {error && <p className="text-center text-red-400 mt-6">{error}</p>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {isLoading ? (
          renderSkeletons()
        ) : (
          events.map((event, index) => (
            <GlassCard
              key={index}
              imageUrl={`https://picsum.photos/seed/event${index}/400/300`}
              title={event.eventName}
              subtitle={event.city}
              category={event.suggestedDate}
              badge={{
                text: t.curatedEvents.aiCurated,
                icon: Zap,
                color: 'purple'
              }}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CuratedEventsSlide;