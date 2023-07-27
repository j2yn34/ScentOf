type Pagenation = {
  currentPage: number;
  maxPage: number;
  onClickPageButton: (pageNumber: number) => void;
};

type PageButton = {
  pageNumber: number;
  onClick: () => void;
  selected: boolean;
};

const Pagination = ({
  currentPage,
  maxPage,
  onClickPageButton,
}: Pagenation): JSX.Element => {
  const isFirstPage = currentPage === 1;
  const isMaxPage = currentPage === maxPage;

  const getPageNumbers = () => {
    const pageNumbers = [];

    let startPage = 1;
    let endPage = Math.min(maxPage, startPage + maxPage - 1);

    if (isMaxPage && maxPage > 1) {
      startPage = Math.max(1, maxPage - 4);
      endPage = maxPage;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mt-11 flex justify-center items-center">
      {!isFirstPage && (
        <button
          className={`flex flex-row items-center ${
            isFirstPage ? "disabled" : ""
          }`}
          onClick={() => onClickPageButton(currentPage - 1)}
        >
          <span className="arrow-left-sm border-brown-400 aria-hidden" />
          <span className="text-brown-400 mr-2.5 text-sm">이전</span>
        </button>
      )}
      {getPageNumbers().map((pageNumber) => (
        <PageButton
          key={pageNumber}
          pageNumber={pageNumber}
          onClick={() => onClickPageButton(pageNumber)}
          selected={pageNumber === currentPage}
        />
      ))}
      {!isMaxPage && (
        <button
          className={`flex flex-row items-center ${
            currentPage === maxPage ? "disabled" : ""
          }`}
          onClick={() => onClickPageButton(currentPage + 1)}
        >
          <span className="text-brown-400 ml-2.5 text-sm">다음</span>
          <span className="arrow-right-sm border-brown-400 aria-hidden" />
        </button>
      )}
    </div>
  );
};

const PageButton = ({
  pageNumber,
  onClick,
  selected,
}: PageButton): JSX.Element => {
  return (
    <button
      className={`text-brown-500 px-3 py-1 hover:underline rounded ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      {pageNumber}
    </button>
  );
};

export default Pagination;
