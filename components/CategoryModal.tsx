import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, TranslationSet } from '../types';
import { X } from './IconComponents';

interface CategoryModalProps {
  category: Category;
  onClose: () => void;
  onCategorySelect: (categoryId: string) => void;
  t: TranslationSet;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose, onCategorySelect, t }) => {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
  };

  const handleParentCategoryClick = () => {
    onCategorySelect(category.id);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl shadow-purple-500/10"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-title"
        >
          <header className="p-6 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <category.icon className="w-8 h-8 text-[#00D9FF]" />
              <h2 id="category-modal-title" className="text-2xl font-bold">
                {t.categoryModal.title}: {t.categories[category.labelKey]}
              </h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={t.storyViewer.close}
            >
              <X className="w-6 h-6" />
            </button>
          </header>

          <div className="p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <button 
                onClick={handleParentCategoryClick}
                className="col-span-full text-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-transparent hover:border-white/20 font-bold"
              >
                {t.categoryModal.allCategory.replace('{category}', t.categories[category.labelKey])}
              </button>
              {category.subcategories.map(sub => (
                <button 
                  key={sub.id} 
                  onClick={handleParentCategoryClick}
                  className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
                >
                  {t.subcategories[sub.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CategoryModal;