import React, { useState, useEffect, useMemo } from 'react';
import type { Deal, TranslationSet, Language } from '../types';
import { Clock, Tag } from './IconComponents';

interface DealCardProps {
  deal: Deal;
  t: TranslationSet['dealsMarketplace'];
  language: Language;
}

const formatPrice = (price: number, lang: Language) => {
    const locale = lang === 'ku' ? 'ckb' : lang;
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'IQD', minimumFractionDigits: 0 }).format(price);
};

const useCountdown = (targetDate: Date) => {
    const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - new Date().getTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(targetDate.getTime() - new Date().getTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: timeLeft <= 0 };
};

const DealCard: React.FC<DealCardProps> = ({ deal, t, language }) => {
    const { days, hours, minutes, seconds, isExpired } = useCountdown(deal.expiresAt);

    const discountPercentage = useMemo(() => {
        return Math.round(((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100);
    }, [deal.originalPrice, deal.discountedPrice]);
    
    const claimedPercentage = useMemo(() => {
        return (deal.claimed / deal.total) * 100;
    }, [deal.claimed, deal.total]);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group transition-all duration-500 hover:bg-white/15 hover:border-white/30 transform hover:-translate-y-1.5 shadow-xl hover:shadow-[#FF2E97]/30 flex flex-col">
      <div className="relative overflow-hidden h-40">
        <img 
          src={deal.imageUrl} 
          alt={deal.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-0 end-0 bg-gradient-to-r from-[#FF2E97] to-[#6C2BD9] text-white font-bold px-4 py-2 rounded-es-2xl flex items-center gap-1.5 shadow-lg z-10">
            <Tag className="w-4 h-4"/>
            <span className="text-sm tracking-tight">-{discountPercentage}%</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-semibold text-[#00D9FF] text-xs uppercase tracking-wider mb-1">{deal.businessName}</h3>
        <p className="font-bold text-lg text-white flex-grow group-hover:text-[#00D9FF] transition-colors duration-300">{deal.title}</p>
        
        <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-bold text-white">{formatPrice(deal.discountedPrice, language)}</span>
            <span className="text-gray-500 line-through text-sm">{formatPrice(deal.originalPrice, language)}</span>
        </div>

        <div className="mt-5">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">
                <span>{t.claimed}</span>
                <span className="text-[#FF2E97]">{deal.claimed} / {deal.total}</span>
            </div>
            <div className="w-full bg-black/40 rounded-full h-1.5 overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-[#FF2E97] to-[#6C2BD9] h-full rounded-full transition-all duration-1000" style={{ width: `${claimedPercentage}%` }}></div>
            </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-white/10 text-center">
            {isExpired ? (
                 <span className="text-red-400 font-bold uppercase text-xs tracking-widest">Deal Expired</span>
            ) : (
                <div className="flex items-center justify-center gap-2.5 text-gray-300">
                    <Clock className="w-4 h-4 text-[#00D9FF]" />
                    <span className="text-[10px] uppercase tracking-widest font-bold">{t.expiresIn}</span>
                    <div className="flex gap-2 font-mono font-bold text-white text-xs tracking-tighter">
                       <span className="bg-white/10 px-1.5 py-0.5 rounded">{days}{t.days}</span>
                       <span className="bg-white/10 px-1.5 py-0.5 rounded">{hours}{t.hours}</span>
                       <span className="bg-white/10 px-1.5 py-0.5 rounded">{minutes}{t.minutes}</span>
                       <span className="bg-white/10 px-1.5 py-0.5 rounded text-[#FF2E97]">{seconds}{t.seconds}</span>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DealCard;
