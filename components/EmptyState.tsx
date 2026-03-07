import { APP_COPY } from '../constants';

interface EmptyStateProps {
  onSelect?: (suggestion: string) => void;
}

export default function EmptyState({ onSelect }: EmptyStateProps) {
  return (
    <section className="state-panel empty-state">
      <h2>Ready when you are</h2>
      <p>Ask a question above to get a structured action plan tailored for Iraq.</p>
      <div className="examples empty-examples">
        {APP_COPY.promptSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSelect?.(suggestion)}
            className={onSelect ? 'chip-interactive' : ''}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </section>
  );
}
