import React from 'react';

export const usePagination = (items, numItemsPerPage = 20) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const start = (currentPage - 1) * numItemsPerPage;
  const end = currentPage * numItemsPerPage;
  const firstItems = items?.slice(start, end) || [];
  const showMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const theAreMore = end < items?.length;

  return [firstItems, showMore, theAreMore];
};
