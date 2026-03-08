import React, { useMemo } from 'react';
import type { TranslationSet, Business } from '../types';
import { MOCK_BUSINESSES } from '../constants';
import { Accessibility, Type, Wind, CheckCircle, MapPin } from './IconComponents';

interface AccessibilityHubSlideProps {
  t: TranslationSet;
  fontSize: string;
  setFontSize: (size: string) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
}

const AccessibleBusinessItem: React.FC<{ business: Business; t: TranslationSet }> = ({ business, t }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
    <img src={business.imageUrl} alt={business.name} className="w-full sm:w-20 h-20 object-cover rounded-lg flex-shrink-0" />
    <div className="flex-grow text-center sm:text-left">
      <h3 className="font-bold text-lg text-white">{business.name}</h3>
      <p className="text-sm text-gray-400 flex items-center justify-center sm:justify-start gap-1">
        <MapPin className="w-3 h-3"/>
        {business.governorate}
      </p>
    </div>
    <div className="flex items-center gap-2 text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-full flex-shrink-0 mt-2 sm:mt-0">
      <CheckCircle className="w-4 h-4" />
      <span className="text-sm font-semibold">{t.accessibilityHub.accessibleVenue}</span>
    </div>
  </div>
);


const AccessibilityHubSlide: React.FC<AccessibilityHubSlideProps> = ({ t, fontSize, setFontSize, reduceMotion, setReduceMotion }) => {

  const accessibleBusinesses = useMemo(() => MOCK_BUSINESSES.filter(b => b.isAccessible), []);

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0E27] focus:ring-[#00D9FF] ${
        checked ? 'bg-[#6C2BD9]' : 'bg-white/10'
      }`}
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ${
          checked ? 'translate-x-9 rtl:-translate-x-9' : 'translate-x-1 rtl:-translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <section>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{t.accessibilityHub.title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">{t.accessibilityHub.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-black/20">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Accessibility className="w-7 h-7 text-[#00D9FF]"/> {t.accessibilityHub.settingsTitle}</h3>
            
            <div className="space-y-8">
                {/* Font Size Control */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Type className="w-5 h-5 text-[#00D9FF]" />
                        <label className="font-bold text-lg text-white">{t.accessibilityHub.fontSize}</label>
                    </div>
                    <div className="bg-white/10 rounded-full p-1.5 flex items-center gap-1.5 border border-white/10">
                        {(['sm', 'base', 'lg'] as const).map(size => (
                            <button
                                key={size}
                                onClick={() => setFontSize(size)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${fontSize === size ? 'bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-white shadow-lg' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
                                aria-pressed={fontSize === size}
                            >
                                {t.accessibilityHub[`fontSize${size.charAt(0).toUpperCase() + size.slice(1)}` as keyof typeof t.accessibilityHub]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reduce Motion Control */}
                 <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Wind className="w-5 h-5 text-[#00D9FF]" />
                        <label className="font-bold text-lg text-white">{t.accessibilityHub.reduceMotion}</label>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-400">{reduceMotion ? t.accessibilityHub.motionReduced : t.accessibilityHub.motionEnabled}</span>
                        <ToggleSwitch checked={reduceMotion} onChange={setReduceMotion} />
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl shadow-black/20">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">{t.accessibilityHub.findInclusiveEventsTitle}</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-3 custom-scrollbar">
                {accessibleBusinesses.map(business => (
                    <AccessibleBusinessItem key={business.id} business={business} t={t} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default AccessibilityHubSlide;
