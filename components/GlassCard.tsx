
import React, { ComponentType } from 'react';
import { MapPin } from './IconComponents';

interface GlassCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  category: string;
  badge?: {
    text: string;
    icon: ComponentType<{ className?: string }>;
    color: 'purple' | 'pink' | 'cyan';
  };
}

const GlassCard: React.FC<GlassCardProps> = ({ imageUrl, title, subtitle, category, badge }) => {
  const badgeColorClasses = {
    purple: 'bg-[#6C2BD9]/20 text-[#a37cf0]',
    pink: 'bg-[#FF2E97]/20 text-[#FF2E97]',
    cyan: 'bg-[#00D9FF]/20 text-[#00D9FF]',
  };

  return (
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transition-all duration-500 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1.5 shadow-xl hover:shadow-[#6C2BD9]/30 h-full flex flex-col">
      <div className="relative overflow-hidden h-40">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start flex-grow gap-2">
          <div>
            <h3 className="font-bold text-lg text-white group-hover:text-[#00D9FF] transition-colors duration-300">{title}</h3>
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#00D9FF]"/>
              {subtitle}
            </p>
          </div>
          <span className={`text-[10px] uppercase tracking-wider font-bold ${badge ? 'hidden' : 'inline-flex'} ${badgeColorClasses.pink} px-2.5 py-1 rounded-lg flex-shrink-0 border border-white/5`}>{category}</span>
        </div>
        {badge && (
          <div className={`mt-3 self-start inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold ${badgeColorClasses[badge.color]} px-2.5 py-1 rounded-lg border border-white/5`}>
            <badge.icon className="w-3.5 h-3.5" />
            <span>{badge.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlassCard;