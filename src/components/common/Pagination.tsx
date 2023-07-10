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
  return (
    <div className="mt-9 flex justify-center items-center">
      <button
        className={`flex flex-row items-center ${
          currentPage === 1 ? "disabled" : ""
        }`}
      >
        <span className="arrow-left-sm border-brown-400 aria-hidden" />
        <span className="text-brown-400 mr-2.5 text-sm">이전</span>
      </button>
      {new Array(maxPage).fill(null).map((_, index) => (
        <PageButton
          key={index}
          pageNumber={index + 1}
          onClick={() => onClickPageButton(index + 1)}
          selected={index + 1 === currentPage}
        />
      ))}
      <button
        className={`flex flex-row items-center ${
          currentPage === maxPage ? "disabled" : ""
        }`}
      >
        <span className="text-brown-400 ml-2.5 text-sm">다음</span>
        <span className="arrow-right-sm border-brown-400 aria-hidden" />
      </button>
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
