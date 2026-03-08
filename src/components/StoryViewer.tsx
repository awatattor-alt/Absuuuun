import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Story, TranslationSet } from '../types';
import { ChevronLeft, ChevronRight, X } from './IconComponents';

interface StoryViewerProps {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
  t: TranslationSet['storyViewer'];
}

const STORY_DURATION = 5000; // 5 seconds

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose, t }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const nextStory = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  }, [stories.length]);

  const prevStory = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextStory, STORY_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex, nextStory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextStory();
      if (e.key === 'ArrowLeft') prevStory();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, nextStory]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full max-w-[375px] h-full max-h-[812px] bg-black rounded-lg overflow-hidden shadow-2xl shadow-purple-500/20" onClick={(e) => e.stopPropagation()}>
        
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
          {stories.map((_, index) => (
            <div key={index} className="h-1 bg-white/30 flex-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: index < currentIndex ? '100%' : '0%' }}
                animate={{ width: index === currentIndex ? '100%' : (index < currentIndex ? '100%' : '0%') }}
                transition={index === currentIndex ? { duration: STORY_DURATION / 1000, ease: 'linear' } : { duration: 0 }}
              />
            </div>
          ))}
        </div>

        {/* Story Content */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0"
          >
            <img src={stories[currentIndex].avatarUrl} alt={stories[currentIndex].username} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-3">
                <img src={`https://picsum.photos/seed/${currentIndex+1}/200`} alt={stories[currentIndex].username} className="w-10 h-10 rounded-full border-2 border-white"/>
                <p className="font-bold text-white">{stories[currentIndex].username}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Controls */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white z-30 p-2 bg-black/30 rounded-full hover:bg-black/50" aria-label={t.close}>
          <X className="w-6 h-6" />
        </button>
        <button onClick={prevStory} className="absolute top-1/2 -translate-y-1/2 left-2 text-white z-30 p-2 bg-black/30 rounded-full hover:bg-black/50" aria-label={t.previous}>
          <ChevronLeft className="w-6 h-6" />
        </button>
         <button onClick={nextStory} className="absolute top-1/2 -translate-y-1/2 right-2 text-white z-30 p-2 bg-black/30 rounded-full hover:bg-black/50" aria-label={t.next}>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
};

export default StoryViewer;