export const formatEventDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleString('en-IQ', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
