import { FormEvent, KeyboardEvent } from 'react';
import { UI_TEXT } from '../constants';

interface QueryFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  canSubmit: boolean;
}

export const QueryForm = ({ query, onQueryChange, onSubmit, isLoading, canSubmit }: QueryFormProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <form className="query-card" onSubmit={onSubmit}>
      <label htmlFor="goal-input" className="input-label">
        {UI_TEXT.inputLabel}
      </label>
      <textarea
        id="goal-input"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={UI_TEXT.inputPlaceholder}
        rows={6}
        disabled={isLoading}
      />
      <button type="submit" disabled={!canSubmit}>
        {isLoading ? UI_TEXT.loading : UI_TEXT.submit}
      </button>
    </form>
  );
};
