import ReviewCard from "./ReviewCard";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../database/initialize";
import { PostData } from "../../types";
import { useState, useEffect } from "react";

const SearchReviewList = ({
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

        const dbreviews = collection(db, "reviews");

        const brandQuerySnapshot = getDocs(
          query(
            dbreviews,
            where("brandName", ">=", searchTerm),
            where("brandName", "<=", searchTerm + "\uf8ff")
          )
        );
        const productQuerySnapshot = getDocs(
          query(
            dbreviews,
            where("productName", ">=", searchTerm),
            where("productName", "<=", searchTerm + "\uf8ff")
          )
        );

        const docsToReviewData = (snapshot: QuerySnapshot): PostData[] =>
          snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            ...doc.data(),
            id: doc.id,
          })) as PostData[];

        const brandResults = docsToReviewData(await brandQuerySnapshot);
        const productResults = docsToReviewData(await productQuerySnapshot);

        let dataArr = [...brandResults, ...productResults];

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
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {searchResult.slice(0, limit).map((post: PostData) => (
            <ReviewCard data={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchReviewList;
