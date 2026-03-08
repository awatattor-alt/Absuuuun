import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { APP_COPY } from '../constants';
import { filterSuggestions } from '../features/discovery/suggestions';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const QueryForm = ({ onSubmit, isLoading }: QueryFormProps) => {
  const [query, setQuery] = useState('');

  const suggestions = useMemo(() => filterSuggestions(APP_COPY.promptSuggestions, query), [query]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  return (
    <div className="surface">
      <form className="query-form" onSubmit={handleSubmit}>
        <label htmlFor="query">What is your goal?</label>
        <div className="query-input-wrap">
          <Search size={16} />
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe what you want to achieve..."
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={!query.trim() || isLoading}>
          {isLoading ? 'Generating...' : 'Get Guidance'}
        </button>
      </form>

      <div className="suggestion-chips">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="suggestion-chip"
            onClick={() => setQuery(suggestion)}
            disabled={isLoading}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
