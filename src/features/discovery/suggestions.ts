export const filterSuggestions = (suggestions: string[], searchTerm: string): string[] => {
  const normalized = searchTerm.trim().toLowerCase();

  if (!normalized) {
    return suggestions;
  }

  return suggestions.filter((item) => item.toLowerCase().includes(normalized));
};
