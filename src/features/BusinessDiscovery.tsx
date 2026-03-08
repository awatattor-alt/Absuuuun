import { useState } from 'react';
import { Search } from 'lucide-react';
import { discoverBusinesses } from '../services/discoveryService';
import type { DiscoveryItem } from '../types';

export function BusinessDiscovery() {
  const [keyword, setKeyword] = useState('');
  const [items, setItems] = useState<DiscoveryItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    const results = await discoverBusinesses(keyword);
    setItems(results);
    setIsSearching(false);
  };

  return (
    <section className="surface discovery">
      <h2 className="result-title">Business Discovery</h2>
      <div className="discovery-search">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Search by city, sector, or keyword"
        />
        <button type="button" onClick={handleSearch} disabled={isSearching}>
          <Search size={16} />
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="discovery-results">
        {items.length === 0 ? (
          <p className="step-body">Run a search to discover organizations and opportunities.</p>
        ) : (
          items.map((item) => (
            <article className="step-card" key={item.id}>
              <h3 className="step-title">{item.name}</h3>
              <p className="step-body">{item.summary}</p>
              <p className="meta-line">
                {item.category} · {item.city}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
