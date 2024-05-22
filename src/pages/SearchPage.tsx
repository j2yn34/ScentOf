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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedSearchTerm(searchTerm);
  };

  return (
    <div className="pt-14 px-4">
      <form onSubmit={onSubmit} className="flex justify-center">
        <input
          type="text"
          className="border-b border-brown p-2 mr-4 w-[280px] focus:outline-none placeholder:text-brown-300 placeholder:italic"
          placeholder="브랜드명, 제품명을 검색해 보세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn primary-btn">
          검색
        </button>
      </form>
      {submittedSearchTerm && (
        <>
          <div className="mt-8">
            <h2 className="text-2xl text-left font-bold mb-6">
              향기 리뷰 검색 결과 ({reviewCount})
            </h2>
            <SearchReviewList
              limit={6}
              currentPage={1}
              searchTerm={submittedSearchTerm}
            />
          </div>
          <div className="mt-10">
            <h2 className="text-2xl text-left font-bold mb-6">
              추천 문의 검색 결과 ({recommendCount})
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
