import { FormEvent, useState } from "react";
import SearchRecommedList from "../components/posts/SearchRecommedList";
import SearchReviewList from "../components/posts/SearchReviewList";
import { reviewCountState, recommendCountState } from "../state/searchState";
import { useRecoilValue } from "recoil";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const reviewCount = useRecoilValue(reviewCountState);
  const recommendCount = useRecoilValue(recommendCountState);
  let totalCount = reviewCount + recommendCount;

  const exampleSearchTerms = [
    { name: "lanvin", term: "랑방" },
    { name: "dior", term: "디올" },
    { name: "summer", term: "여름" },
  ];

  const clickExamples = (exTerm: string) => {
    setSubmittedSearchTerm(exTerm);
    setSearchTerm(exTerm);
  };

  const checkSearchValue = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === "") {
      alert("검색어를 입력해 주세요.");
      return false;
    }
    return true;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkSearchValue(searchTerm)) {
      setSubmittedSearchTerm(searchTerm);
    }
  };

  return (
    <div className="pt-14 px-4">
      <div className="w-100">
        <form onSubmit={onSubmit} className="flex justify-center">
          <input
            type="text"
            className="border-b border-brown p-2 mr-4 w-[280px] focus:outline-none placeholder:text-brown-300 placeholder:italic"
            placeholder="브랜드명, 제품명을 검색해 보세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn primary-btn px-6">
            검색
          </button>
        </form>
        <div className="flex items-center justify-start pt-4">
          <span className="text-brown-500">추천검색어</span>
          <div>
            {exampleSearchTerms.map((searchTerm) => (
              <button
                key={searchTerm.name}
                className="badge badge-lg py-4 ml-2.5 text-brown-400 hover:hover:bg-beige"
                onClick={() => clickExamples(searchTerm.term)}
              >
                {searchTerm.term}
              </button>
            ))}
          </div>
        </div>
      </div>
      {submittedSearchTerm && (
        <>
          <p className="text-sm pt-4 text-brown-500">
            "{submittedSearchTerm}" | 총 {totalCount}개의 글이 검색되었어요.
          </p>
          <div className="mt-6">
            <h2 className="text-2xl text-left font-bold mb-6">
              향기 리뷰 ({reviewCount})
            </h2>
            <SearchReviewList
              limit={6}
              currentPage={1}
              searchTerm={submittedSearchTerm}
            />
          </div>
          <div className="mt-10">
            <h2 className="text-2xl text-left font-bold mb-6">
              추천 문의 ({recommendCount})
            </h2>
            <SearchRecommedList
              limit={4}
              currentPage={1}
              searchTerm={submittedSearchTerm}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
