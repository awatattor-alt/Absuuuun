interface EmptyStateProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export const EmptyState = ({ suggestions, onSelect }: EmptyStateProps) => (
  <section className="state-panel">
    <h2>Ready when you are</h2>
    <p>Pick a suggestion or write your own goal above.</p>
    <div className="suggestions" role="list">
      {suggestions.map((suggestion) => (
        <button key={suggestion} type="button" className="chip" onClick={() => onSelect(suggestion)}>
          {suggestion}
        </button>
      ))}
    </div>
  </section>
);
