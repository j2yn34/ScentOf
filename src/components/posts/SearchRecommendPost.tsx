import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../../database/initialize";
import { useEffect, useState } from "react";
import TimeDiff from "../common/timeFormat/TimeDiff";

type RecommendData = {
  id: string;
  nickname: string;
  postedDate: Timestamp;
  title: string;
};

type RecommendPostProps = {
  limit: number;
  searchTerm: string;
};

const SearchRecommendPost = ({
  limit,
  searchTerm,
}: RecommendPostProps): JSX.Element => {
  const [searchResults, setSearchResults] = useState<RecommendData[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const reviewsRef = collection(db, "recommendations");

      const querySnapshot: QuerySnapshot = await getDocs(
        query(
          reviewsRef,
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        )
      );

      const results: RecommendData[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          } as RecommendData;
        }
      );

      setSearchResults(results);
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="flex flex-col">
      {searchResults.slice(0, limit).map((data) => (
        <Link
          to={`/recommend/${data.id}`}
          key={data.id}
          className="flex items-center justify-between bg-beige w-full min-h-[64px] p-4 border-t border-brown-200 hover:bg-brown-200/[0.4] transition-all"
        >
          <p className="text-brown-900 md:text-base text-sm">{data.title}</p>
          <div className="flex items-center text-brown-400 md:text-sm text-xs">
            <span className="md:mx-4 mx-2.5 text-center md:w-[90px] w-[60px]">
              {data.nickname}
            </span>
            <div className="md:w-[80px] w-[64px] text-center">
              <TimeDiff timestamp={data.postedDate} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchRecommendPost;
