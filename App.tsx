import React, { useEffect, useMemo, useState } from 'react';
import type { Language, Listing, ListingType, SortOption, TranslationSet } from './types';
import { IRAQ_CITIES, LANGUAGES, LISTINGS } from './constants';
import en from './locales/en.json';
import ar from './locales/ar.json';
import ku from './locales/ku.json';

type Route = { name: 'home' | 'cities' | 'directory' | 'deals' | 'search' | 'about' } | { name: 'city' | 'listing'; id: string };
const TRANSLATIONS: Record<Language, TranslationSet> = { en, ar, ku };
const glass = 'bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl';

const parseRoute = (path: string): Route => {
  if (path.startsWith('/city/')) return { name: 'city', id: path.split('/')[2] ?? '' };
  if (path.startsWith('/listing/')) return { name: 'listing', id: path.split('/')[2] ?? '' };
  if (path === '/cities') return { name: 'cities' };
  if (path === '/directory') return { name: 'directory' };
  if (path === '/deals') return { name: 'deals' };
  if (path === '/search') return { name: 'search' };
  if (path === '/about') return { name: 'about' };
  return { name: 'home' };
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [route, setRoute] = useState<Route>(parseRoute(window.location.pathname));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const [homeCategory, setHomeCategory] = useState<ListingType>('events');
  const [cityTab, setCityTab] = useState<'all' | 'events' | 'food' | 'hotels' | 'experiences'>('all');
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | ListingType>('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [toast, setToast] = useState('');

  const t = TRANSLATIONS[language];

  useEffect(() => {
    document.documentElement.dir = language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handler = () => setRoute(parseRoute(window.location.pathname));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setRoute(parseRoute(path));
    setMobileOpen(false);
    setSearch('');
    setCityFilter('all');
    setTypeFilter('all');
    setPriceFilter('all');
    setRatingFilter('all');
    setSortBy('default');
  };

  const cityName = (id: string) => {
    const city = IRAQ_CITIES.find((c) => c.id === id);
    return city ? city[`name_${language}` as 'name_en' | 'name_ar' | 'name_ku'] : id;
  };

  const sourceListings = useMemo(() => {
    if (route.name === 'deals') return LISTINGS.filter((l) => l.type === 'deals');
    if (route.name === 'city') {
      const byCity = LISTINGS.filter((l) => l.city === route.id);
      if (cityTab === 'all') return byCity;
      if (cityTab === 'food') return byCity.filter((l) => l.type === 'restaurants' || l.type === 'cafes');
      return byCity.filter((l) => l.type === cityTab);
    }
    return LISTINGS;
  }, [route, cityTab]);

  const filtered = useMemo(() => {
    let arr = sourceListings.filter((l) =>
      (cityFilter === 'all' || l.city === cityFilter) &&
      (typeFilter === 'all' || l.type === typeFilter) &&
      (ratingFilter === 'all' || l.rating >= Number(ratingFilter)) &&
      (priceFilter === 'all' || (l.price || l.price_range || '').includes(priceFilter)) &&
      (search === '' || `${l.title} ${l.description} ${l.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
    );
    if (sortBy === 'rating') arr = [...arr].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'newest') arr = [...arr].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    if (sortBy === 'price_low') arr = [...arr].sort((a, b) => (a.price || a.price_range || '').localeCompare(b.price || b.price_range || ''));
    if (sortBy === 'price_high') arr = [...arr].sort((a, b) => (b.price || b.price_range || '').localeCompare(a.price || a.price_range || ''));
    return arr;
  }, [sourceListings, cityFilter, typeFilter, ratingFilter, priceFilter, search, sortBy]);

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setToast(t.common.copied);
    window.setTimeout(() => setToast(''), 1200);
  };

  const card = (l: Listing) => (
    <article key={l.id} className={`${glass} overflow-hidden`}>
      <img src={l.image_url} alt={l.title} className="w-full h-44 object-cover" />
      <div className="p-4 space-y-2"><h3 className="font-semibold">{l.title}</h3><p className="text-sm text-gray-300 line-clamp-2">{l.description}</p><p className="text-yellow-400 text-sm">★ {l.rating.toFixed(1)}</p><button onClick={() => navigate(`/listing/${l.id}`)} className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF]">{t.common.viewDetails}</button></div>
    </article>
  );

  const filterBar = (withSort: boolean) => (
    <div className={`${glass} p-4 grid md:grid-cols-6 gap-2`}>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.directory.searchPlaceholder} className="md:col-span-2 p-2 rounded-lg bg-white/10 border border-white/20" />
      <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="p-2 rounded-lg bg-[#0A0E27] border border-white/20"><option value="all">{t.common.allCities}</option>{IRAQ_CITIES.map((c) => <option key={c.id} value={c.id}>{cityName(c.id)}</option>)}</select>
      <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'all' | ListingType)} className="p-2 rounded-lg bg-[#0A0E27] border border-white/20"><option value="all">{t.common.allTypes}</option>{(['events', 'restaurants', 'cafes', 'hotels', 'experiences', 'deals'] as ListingType[]).map((type) => <option key={type} value={type}>{t.home.categoryTabs[type]}</option>)}</select>
      <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="p-2 rounded-lg bg-[#0A0E27] border border-white/20"><option value="all">{t.common.price}</option><option value="$">$</option><option value="$$">$$</option><option value="$$$">$$$</option></select>
      <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="p-2 rounded-lg bg-[#0A0E27] border border-white/20"><option value="all">{t.common.rating}</option><option value="4">4+</option><option value="4.5">4.5+</option></select>
      {withSort && <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} className="p-2 rounded-lg bg-[#0A0E27] border border-white/20"><option value="default">{t.common.all}</option><option value="rating">{t.common.byRating}</option><option value="newest">{t.common.newest}</option><option value="price_low">{t.common.lowToHigh}</option><option value="price_high">{t.common.highToLow}</option></select>}
    </div>
  );

  return (
    <div className="bg-[#0A0E27] text-white min-h-screen">
      <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="text-2xl font-bold bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-transparent bg-clip-text">Iraq Compass</button>
          <nav className="hidden md:flex gap-5 text-gray-300">
            <button onClick={() => navigate('/')}>{t.nav.home}</button><button onClick={() => navigate('/cities')}>{t.nav.cities}</button><button onClick={() => navigate('/directory')}>{t.nav.directory}</button><button onClick={() => navigate('/deals')}>{t.nav.deals}</button><button onClick={() => navigate('/about')}>{t.nav.about}</button>
          </nav>
          <div className="flex items-center gap-2">{LANGUAGES.map((l) => <button key={l.code} onClick={() => setLanguage(l.code)} className={`px-2 py-1 rounded border text-xs ${language === l.code ? 'border-white' : 'border-white/20 text-gray-400'}`}>{l.code.toUpperCase()}</button>)}<button className="md:hidden border border-white/20 px-2 py-1 rounded" onClick={() => setMobileOpen((v) => !v)}>☰</button></div>
        </div>
        {mobileOpen && <div className="md:hidden p-4 space-y-2">{[['/', t.nav.home], ['/cities', t.nav.cities], ['/directory', t.nav.directory], ['/deals', t.nav.deals], ['/about', t.nav.about], ['/search', t.searchPage.title]].map(([p, l]) => <button key={String(p)} onClick={() => navigate(String(p))} className={`${glass} w-full p-2 text-left`}>{l}</button>)}</div>}
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {route.name === 'home' && <>
          <section className={`${glass} p-6 text-center space-y-3`}><h1 className="text-3xl md:text-5xl font-bold">{t.home.heroTitle}</h1><p className="text-gray-300">{t.home.heroSubtitle}</p><div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2"><input value={heroSearch} onChange={(e) => setHeroSearch(e.target.value)} placeholder={t.common.searchPlaceholder} className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20" /><button onClick={() => navigate('/search')} className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF]">{t.common.search}</button></div></section>
          <section><h2 className="text-2xl font-bold mb-3">{t.home.browseCities}</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{IRAQ_CITIES.slice(0, 6).map((c) => <button key={c.id} onClick={() => navigate(`/city/${c.id}`)} className={`${glass} overflow-hidden text-left`}><img src={c.image_url} className="w-full h-32 object-cover" alt={c.name_en} /><p className="p-3">{cityName(c.id)}</p></button>)}</div></section>
          <section><h2 className="text-2xl font-bold mb-3">{t.home.tonight}</h2><div className="flex overflow-x-auto gap-4 pb-2">{LISTINGS.filter((l) => l.type === 'events').map((l) => <div key={l.id} className="min-w-72">{card(l)}</div>)}</div></section>
          <section><h2 className="text-2xl font-bold mb-3">{t.home.featuredVenues}</h2><div className="grid md:grid-cols-3 gap-4">{LISTINGS.filter((l) => l.featured).slice(0, 6).map(card)}</div></section>
          <section><h2 className="text-2xl font-bold mb-3">{t.home.deals}</h2><div className="grid md:grid-cols-3 gap-4">{LISTINGS.filter((l) => l.type === 'deals').map(card)}</div></section>
          <section><h2 className="text-2xl font-bold mb-3">{t.home.categoriesTitle}</h2><div className="flex flex-wrap gap-2 mb-3">{(['events', 'restaurants', 'hotels', 'experiences', 'deals'] as ListingType[]).map((type) => <button key={type} onClick={() => setHomeCategory(type)} className={`px-3 py-2 rounded-lg border ${homeCategory === type ? 'bg-white/20' : 'bg-white/5'} border-white/20`}>{t.home.categoryTabs[type]}</button>)}</div><div className="grid md:grid-cols-3 gap-4">{LISTINGS.filter((l) => l.type === homeCategory && (`${l.title} ${l.tags.join(' ')}`.toLowerCase().includes(heroSearch.toLowerCase()))).slice(0, 6).map(card)}</div></section>
        </>}

        {route.name === 'cities' && <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{IRAQ_CITIES.map((c) => <button key={c.id} onClick={() => navigate(`/city/${c.id}`)} className={`${glass} overflow-hidden text-left`}><img src={c.image_url} className="w-full h-40 object-cover" alt={c.name_en} /><div className="p-4"><h2 className="font-semibold">{cityName(c.id)}</h2></div></button>)}</section>}

        {route.name === 'city' && <section className="space-y-4">{(() => {const city = IRAQ_CITIES.find((c) => c.id === route.id); if (!city) return <p>{t.common.noResults}</p>; return <><div className={`${glass} overflow-hidden`}><img src={city.image_url} className="w-full h-56 object-cover" alt={city.name_en} /><div className="p-4"><h1 className="text-3xl font-bold">{cityName(city.id)}</h1></div></div><div className="flex flex-wrap gap-2">{(['all', 'events', 'food', 'hotels', 'experiences'] as const).map((k) => <button key={k} onClick={() => setCityTab(k)} className={`px-3 py-2 rounded-lg border ${cityTab === k ? 'bg-white/20' : 'bg-white/5'} border-white/20`}>{k === 'all' ? t.cityPage.tabs.all : k === 'food' ? t.cityPage.tabs.restaurantsAndCafes : k === 'events' ? t.cityPage.tabs.events : k === 'hotels' ? t.cityPage.tabs.hotels : t.cityPage.tabs.experiences}</button>)}</div>{filterBar(false)}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.length ? filtered.map(card) : <p>{t.common.noResults}</p>}</div></>;})()}</section>}

        {route.name === 'listing' && <section className="space-y-4">{(() => {const listing = LISTINGS.find((l) => l.id === route.id); if (!listing) return <p>{t.common.noResults}</p>; return <><div className={`${glass} overflow-hidden`}><img src={listing.image_url} className="w-full h-72 object-cover" alt={listing.title} /><div className="p-4 space-y-2"><span className="px-2 py-1 rounded bg-white/10 text-xs">{t.home.categoryTabs[listing.type]}</span><h1 className="text-3xl font-bold">{listing.title}</h1><p>{cityName(listing.city)} • ★ {listing.rating}</p><p>{listing.price || listing.price_range}</p><p className="text-gray-300">{listing.description}</p>{listing.phone && <p>{t.listing.phone}: {listing.phone}</p>}{listing.website && <p>{t.listing.website}: <a href={listing.website} className="text-cyan-300">{listing.website}</a></p>}{listing.opening_hours && <p>{t.listing.openingHours}: {listing.opening_hours}</p>}{listing.event_datetime && <p>{t.listing.eventTime}: {new Date(listing.event_datetime).toLocaleString()}</p>}<button onClick={share} className="px-3 py-2 rounded bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF]">{t.common.share}</button></div></div><h2 className="text-2xl font-bold">{t.listing.related}</h2><div className="grid md:grid-cols-3 gap-4">{LISTINGS.filter((l) => l.city === listing.city && l.id !== listing.id).slice(0, 3).map(card)}</div></>;})()}</section>}

        {route.name === 'directory' && <section className="space-y-4"><h1 className="text-3xl font-bold">{t.directory.title}</h1>{filterBar(true)}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.length ? filtered.map(card) : <p>{t.common.noResults}</p>}</div></section>}
        {route.name === 'deals' && <section className="space-y-4"><h1 className="text-3xl font-bold">{t.home.deals}</h1>{filterBar(true)}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.length ? filtered.map(card) : <p>{t.common.noResults}</p>}</div></section>}
        {route.name === 'search' && <section className="space-y-4"><h1 className="text-3xl font-bold">{t.searchPage.title}</h1><p className="text-gray-300">{t.searchPage.subtitle}</p>{filterBar(false)}<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.length ? filtered.map(card) : <p>{t.common.noResults}</p>}</div></section>}
        {route.name === 'about' && <section className={`${glass} p-6`}><h1 className="text-3xl font-bold">{t.about.title}</h1><p className="text-gray-300 mt-2">{t.about.body}</p></section>}
      </main>

      <footer className="border-t border-white/10 mt-8"><div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-4"><div><h3 className="text-xl font-bold bg-gradient-to-r from-[#6C2BD9] to-[#00D9FF] text-transparent bg-clip-text">{t.appName}</h3><p className="text-gray-400">{t.tagline}</p></div><div><p className="font-semibold">{t.footer.linksTitle}</p><div className="text-gray-400 flex gap-4 mt-2"><button onClick={() => navigate('/')}>{t.nav.home}</button><button onClick={() => navigate('/cities')}>{t.nav.cities}</button><button onClick={() => navigate('/directory')}>{t.nav.directory}</button><button onClick={() => navigate('/deals')}>{t.nav.deals}</button></div><p className="mt-3 text-gray-400">{t.footer.copyright}</p></div></div></footer>
      {toast && <div className="fixed bottom-4 right-4 bg-black/80 border border-white/20 rounded px-3 py-2">{toast}</div>}
    </div>
  );
};

export default App;
