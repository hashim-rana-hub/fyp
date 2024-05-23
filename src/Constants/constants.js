export const getNextPage = (lastPage, _pages) => {
  if (!!lastPage?.data?.next) {
    const pageRegex = /page=([0-9]+)/;
    const match = lastPage?.data?.next.match(pageRegex);
    const pageNumber = match ? match[1] : 1;
    return pageNumber;
  }
};
