export function getRandomIntInclusive(minNumber: number, maxNumber: number): number {
  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

export function shuffle(array: string[]) {
  array.sort(() => Math.random() - 0.5);
}

export function returnsWordStatisticTemplate(date: string) {
  return {
    difficulty: 'easy',
    optional: {
      isLearned: false,
      correctAnswers: 0,
      wrongAnswers: 0,
      progress: 0,
      time: date,
    },
  };
}

export function returnsStatisticGameTemplate(date: string) {
  return {
    correctAnswers: 0,
    lastChanged: date,
    newWords: 0,
    longestSeries: 0,
    wrongAnswers: 0,
    totalScore: 0,
  };
}

export function returnsStatisticWordsTemplate(date: string) {
  return {
    [date]: {
      correctAnswers: 0,
      mistakes: 0,
      newWords: 0,
      learnedWords: 0,
    },
  };
}

export function returnsStatisticTemplate(date: string) {
  return {
    learnedWords: 0,
    optional: {
      sprint: returnsStatisticGameTemplate(date),
      audio: returnsStatisticGameTemplate(date),
      wordStatistics: returnsStatisticWordsTemplate(date),
    },
  };
}

export function dateConstructor() {
  const date = new Date();
  const strDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}.${date.getFullYear()}`;
  return strDate;
}
