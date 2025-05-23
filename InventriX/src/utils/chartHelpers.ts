// Generate dates for different time periods
export const generateTimelineDates = (period: 'week' | 'month' | 'year'): string[] => {
  const dates: string[] = [];
  const today = new Date();

  switch (period) {
    case 'week':
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      break;
    case 'month':
      // Last 30 days in weeks
      for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        dates.push(`Week ${4 - i + 1}`);
      }
      break;
    case 'year':
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date(today);
        date.setMonth(date.getMonth() - i);
        dates.push(date.toLocaleDateString('en-US', { month: 'short' }));
      }
      break;
  }

  return dates;
};

// Generate random data points
export const generateRandomData = (length: number, min: number, max: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};