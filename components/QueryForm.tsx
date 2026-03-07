import { FormEvent } from 'react';
import { APP_CONTENT, EXAMPLE_QUERIES } from '../constants';

interface QueryFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function QueryForm({ query, onQueryChange, onSubmit, isLoading }: QueryFormProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <section className="query-card">
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={APP_CONTENT.placeholder}
          rows={5}
          aria-label="Ask Iraq Compass"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? APP_CONTENT.loadingLabel : APP_CONTENT.buttonLabel}
        </button>
      </form>
      <div className="examples">
        {EXAMPLE_QUERIES.map((example) => (
          <button key={example} type="button" onClick={() => onQueryChange(example)} disabled={isLoading}>
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
