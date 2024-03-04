import defaultImage from '../assets/dummy.png';

export const roundPercentage = (voteAverage) => {
  return Math.round(parseFloat(voteAverage) * 10);
};

export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getClassForAverage = (average) => {
  if (average >= 75 && average <= 100) {
    return 'cards-film__card-average-data cards-film__card-average-data--positive';
  } else if (average >= 50 && average <= 74) {
    return 'cards-film__card-average-data cards-film__card-average-data--middle';
  } else if (average >= 1 && average <= 49) {
    return 'cards-film__card-average-data cards-film__card-average-data--negative';
  } else {
    return 'cards-film__card-average-data';
  }
};

export const getClassForAverageDetail = (average) => {
  if (average >= 75 && average <= 100) {
    return 'film-detail__average-data film-detail__average-data--positive';
  } else if (average >= 50 && average <= 74) {
    return 'film-detail__average-data film-detail__average-data--middle';
  } else if (average >= 1 && average <= 49) {
    return 'film-detail__average-data film-detail__average-data--negative';
  } else {
    return 'film-detail__average-data';
  }
};

export const handleImageError = (event) => {
  event.target.src = defaultImage;
};

export const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;

  return rand;
};
