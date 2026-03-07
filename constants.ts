export const APP_NAME = 'Iraq Compass';

export const APP_COPY = {
  subtitle:
    'Share your goal, challenge, or question and get a practical roadmap powered by Gemini.',
  promptSuggestions: [
    'I want to start a small coffee shop in Baghdad. What should I do first?',
    'Plan a 30-day roadmap to improve my English for work interviews.',
    'How can I move from freelance work to launching a digital agency?',
  ],
};

export const UI_TEXT = {
  inputLabel: 'What do you need guidance on?',
  inputPlaceholder: 'Example: Help me build a 3-month plan to start my online business.',
  submit: 'Guide Me',
  loading: 'Calibrating your compass...',
  errorFallback: 'Something went wrong while contacting Gemini. Please try again.',
  retry: 'Try Again',
  roadmapTitle: 'Your Roadmap',
};

export const GEMINI_CONFIG = {
  model: 'gemini-1.5-flash',
  temperature: 0.7,
};
