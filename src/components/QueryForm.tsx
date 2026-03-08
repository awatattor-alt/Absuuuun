import { Search } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { APP_COPY } from '../constants';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      onSubmit(query);
    }
  };

  return (
    <div className="surface">
      <form className="query-form" onSubmit={handleSubmit}>
        <label htmlFor="query">What do you want to discover?</label>
        <textarea
          id="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for events, resources, and opportunities..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!query.trim() || isLoading}>
          <Search size={16} />
          <span>{isLoading ? 'Searching...' : 'Discover'}</span>
        </button>
      </form>

      <div className="suggestion-chips">
        {APP_COPY.promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="suggestion-chip"
            onClick={() => {
              setQuery(suggestion);
              onSubmit(suggestion);
            }}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
