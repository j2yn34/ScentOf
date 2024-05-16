import { FormEvent, useState } from "react";
import SearchReviewPost from "../components/posts/SearchReviewPost";
import RecommendPost from "../components/posts/RecommendPost";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");

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
              향기 리뷰 검색 결과
            </h2>
            <SearchReviewPost limit={6} searchTerm={submittedSearchTerm} />
          </div>
          <div className="mt-10">
            <h2 className="text-2xl text-left font-bold mb-6">
              추천 문의 검색 결과
            </h2>
            <RecommendPost
              limit={4}
              searchTerm={submittedSearchTerm}
              currentPage={1}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
