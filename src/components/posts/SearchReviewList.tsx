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

  useEffect(() => {
    const getSearchData = async () => {
      const dbreviews = collection(db, "reviews");

      const brandQuery = query(
        dbreviews,
        where("brandName", ">=", searchTerm),
        where("brandName", "<=", searchTerm + "\uf8ff")
      );
      const productQuery = query(
        dbreviews,
        where("productName", ">=", searchTerm),
        where("productName", "<=", searchTerm + "\uf8ff")
      );

      const [brandQuerySnapshot, productQuerySnapshot] = await Promise.all([
        getDocs(brandQuery),
        getDocs(productQuery),
      ]);

      const docsToReviewData = (snapshot: QuerySnapshot): PostData[] =>
        snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
          ...doc.data(),
          id: doc.id,
        })) as PostData[];

      const brandResults = docsToReviewData(brandQuerySnapshot);
      const productResults = docsToReviewData(productQuerySnapshot);

      let dataArr = [...brandResults, ...productResults];

      const startIndex = (currentPage - 1) * limit;
      const endIndex = currentPage * limit;

      setSearchResult(dataArr.slice(startIndex, endIndex));
    };
    getSearchData();
  }, [searchTerm]);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {searchResult.slice(0, limit).map((post: PostData) => (
          <ReviewCard data={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default SearchReviewList;
