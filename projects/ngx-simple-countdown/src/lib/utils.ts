import { CountdownResult, CountdownKeywords } from './models/';

export const getDateNow = () => {
  return Math.floor(Date.now() / 1000);
};

export const getCountdownResult = (secondes: number): CountdownResult => {
  return {
    seconds: Math.floor((secondes / 1) % 60),
    minutes: Math.floor((secondes / 1 / 60) % 60),
    hours: Math.floor((secondes / (1 * 60 * 60)) % 24),
    day: Math.floor(secondes / (1 * 60 * 60 * 24))
  };
};

export const getLanguage = (language: string): CountdownKeywords => {
  if (language === 'fr') {
    return {
      timeago: 'il y a',
      now: "à l'instant",
      seconds: 's',
      minutes: 'm',
      hours: 'h',
      day: 'j'
    };
  } else if (language === 'de') {
    return {
      timeago: 'vor',
      now: 'gerade jetzt',
      seconds: 'z',
      minutes: 'm',
      hours: 's',
      day: 't'
    };
  } else if (language === 'pt') {
    return {
      timeago: 'há',
      now: 'agora mesmo',
      seconds: 's',
      minutes: 'm',
      hours: 's',
      day: 'd'
    };
  } else if (language === 'es') {
    return {
      timeago: 'hace',
      now: 'en este momento',
      seconds: 's',
      minutes: 'm',
      hours: 's',
      day: 'd'
    };
  } else if (language === 'cs') {
    return {
      timeago: 'před',
      now: 'právě teď',
      seconds: 's',
      minutes: 'm',
      hours: 'h',
      day: 'd'
    };
  } else if (language === 'pl') {
    return {
      timeago: 'jest',
      now: 'właśnie',
      seconds: 's',
      minutes: 'm',
      hours: 'g',
      day: 'd'
    };
  } else if (language === 'ge') {
    return {
      timeago: 'დასრულდა',
      now: 'დროა',
      seconds: 'წმ',
      minutes: 'წთ',
      hours: 'სთ',
      day: 'დღე'
    };
  } else {
    return {
      timeago: 'there is',
      now: 'just now',
      seconds: 's',
      minutes: 'm',
      hours: 'h',
      day: 'd'
    };
  }
};
