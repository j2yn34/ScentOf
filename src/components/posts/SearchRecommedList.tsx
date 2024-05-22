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

  useEffect(() => {
    const getSearchData = async () => {
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
    };
    getSearchData();
  }, [searchTerm]);

  return (
    <>
      {searchResult.map((post: PostData) => (
        <RecommendCard data={post} key={post.id} />
      ))}
    </>
  );
};

export default SearchRecommedList;
