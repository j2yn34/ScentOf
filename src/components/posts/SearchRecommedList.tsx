import { useEffect, useState } from "react";
import RecommendCard from "./RecommendCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../database/initialize";
import { PostData } from "../../types";

const SearchRecommedList = ({
  limit,
  currentPage,
  searchTerm,
}: {
  limit: number;
  currentPage: number;
  searchTerm: string;
}) => {
  const [searchResult, setSearchResult] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSearchData = async () => {
      try {
        setIsLoading(true);

        const dbRecommendations = collection(db, "recommendations");

        let queryRef = query(
          dbRecommendations,
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        );

        const result = await getDocs(queryRef);
        const dataArr = result.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as PostData[];

        const startIndex = (currentPage - 1) * limit;
        const endIndex = currentPage * limit;

        setSearchResult(dataArr.slice(startIndex, endIndex));
      } catch (error) {
        console.log("검색 결과를 불러오는 중 오류 발생", error);
      } finally {
        setIsLoading(false);
      }
    };
    getSearchData();
  }, [searchTerm]);

  return (
    <>
      {isLoading ? (
        <div className="min-h-[204px] flex items-center justify-center">
          <span className="loading loading-spinner loading-md text-brown-200"></span>
        </div>
      ) : (
        <>
          {searchResult.map((post: PostData) => (
            <RecommendCard data={post} key={post.id} />
          ))}
        </>
      )}
    </>
  );
};

export default SearchRecommedList;
