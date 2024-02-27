export const roundPercentage = (voteAverage) => {
  return Math.round(parseFloat(voteAverage) * 10);
};

export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getClassForAverage = (average) => {
  if (average >= 75 && average <= 100) {
    return 'trending__card-average-data trending__card-average-data--positive';
  } else if (average >= 50 && average <= 74) {
    return 'trending__card-average-data trending__card-average-data--middle';
  } else if (average >= 1 && average <= 49) {
    return 'trending__card-average-data trending__card-average-data--negative';
  } else {
    return 'trending__card-average-data';
  }
};
