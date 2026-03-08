export const getGeminiApiKey = (): string | null => {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === 'string' && key.trim() ? key.trim() : null;
};
