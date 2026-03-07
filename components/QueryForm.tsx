import type { FormEvent } from 'react';
import { UI_TEXT } from '../constants';

interface QueryFormProps {
  query: string;
  isLoading: boolean;
  canSubmit: boolean;
  onQueryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const QueryForm = ({ query, isLoading, canSubmit, onQueryChange, onSubmit }: QueryFormProps) => (
  <form className="query-form" onSubmit={onSubmit}>
    <label htmlFor="goal-input">{UI_TEXT.inputLabel}</label>
    <textarea
      id="goal-input"
      value={query}
      onChange={(event) => onQueryChange(event.target.value)}
      placeholder={UI_TEXT.inputPlaceholder}
      rows={4}
      required
    />
    <button type="submit" disabled={!canSubmit}>
      {isLoading ? UI_TEXT.loading : UI_TEXT.submit}
    </button>
  </form>
);
