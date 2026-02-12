import { Temporal } from '@js-temporal/polyfill';

export const WelcomeDate = (): string => {
  const Hour = Temporal.Now.zonedDateTimeISO('America/Chicago').hour;

  if (Hour >= 0 && Hour <= 4) {
    return 'Good night';
  } else if (Hour >= 5 && Hour <= 11) {
    return 'Good morning';
  } else if (Hour >= 12 && Hour <= 16) {
    return 'Good afternoon';
  } else if (Hour >= 17 && Hour <= 20) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};
