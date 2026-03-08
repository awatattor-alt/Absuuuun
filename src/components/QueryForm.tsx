import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { APP_COPY } from '../features/compass/constants';

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
    }
  };

  return (
    <div className="surface">
      <form className="query-form" onSubmit={handleSubmit}>
        <label htmlFor="query">What is your goal?</label>
        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe what you want to achieve..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!query.trim() || isLoading}>
          <Compass size={16} />
          {isLoading ? 'Generating...' : 'Get Guidance'}
        </button>
      </form>

      <div className="suggestion-chips">
        {APP_COPY.promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="suggestion-chip"
            onClick={() => setQuery(suggestion)}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
