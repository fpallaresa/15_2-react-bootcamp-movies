import React from 'react';

const useFetch = (apiUrl) => {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((data) => data.json())
        .then((dataParsed) => setResult(dataParsed));
    }
  }, [apiUrl]);

  return [result];
};

export default useFetch;
