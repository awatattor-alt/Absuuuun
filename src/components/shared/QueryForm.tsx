import { Compass } from 'lucide-react';
import { FormEvent, useState } from 'react';

const promptSuggestions = [
  'How do I start a tech business in Iraq?',
  'Find legal requirements to open a restaurant in Baghdad',
  'Create a 90-day market entry plan for Erbil',
  'Discover grants and incubators for startups in Iraq',
  'How can I validate demand for my service quickly?',
];

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryForm({ onSubmit, isLoading }: QueryFormProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query);
    }
  };

  return (
    <section className="panel">
      <form className="query-form" onSubmit={handleSubmit}>
        <label htmlFor="query">What is your goal?</label>
        <textarea
          id="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Describe what you want to achieve..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!query.trim() || isLoading}>
          <Compass size={16} />
          {isLoading ? 'Generating...' : 'Get Guidance'}
        </button>
      </form>

      <div className="chip-list">
        {promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="chip"
            onClick={() => setQuery(suggestion)}
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}
