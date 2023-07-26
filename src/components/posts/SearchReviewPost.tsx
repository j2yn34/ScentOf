import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../database/initialize";
import Rating from "../common/Rating";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

type reviewData = {
  id: string;
  nickname: string;
  brandName: string;
  productName: string;
  rating: number;
  title: string;
  content: string;
  imageUrl?: string;
};

const SearchReviewPost = ({
  limit,
  searchTerm,
}: {
  limit: number;
  searchTerm: string;
}): JSX.Element => {
  const [searchResults, setSearchResults] = useState<reviewData[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const reviewsRef = collection(db, "reviews");

      const querySnapshot: QuerySnapshot = await getDocs(
        query(
          reviewsRef,
          where("brandName", ">=", searchTerm),
          where("brandName", "<=", searchTerm + "\uf8ff")
        )
      );

      const results: reviewData[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          } as reviewData;
        }
      );

      setSearchResults(results);
    };

    fetchSearchResults();
  }, [searchTerm]);

  const defaultImage = "src/assets/defaultImage.jpg";

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {searchResults.slice(0, limit).map((review, index) => (
        <Link
          to={`/review/${review.id}`}
          key={index}
          className="min-h-[204px] card bg-beige p-4 hover:drop-shadow-md transition-all outline-none"
        >
          <div className="flex flex-auto">
            <figure className="rounded md:shrink-0 mb-2 mr-3.5">
              <img
                className="rounded w-[120px] h-[140px]"
                src={review.imageUrl || defaultImage}
                alt={review.imageUrl ? "이미지" : "기본 이미지"}
              />
            </figure>
            <div className="card-body p-0 gap-0">
              <span className="text-sm text-brown-300">{review.brandName}</span>
              <h2 className="card-title py-1 text-brown-900">
                {review.productName}
              </h2>
              <p className="text-sm text-brown-500 mt-1 pb-2">{review.title}</p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <Rating
              rating={review.rating}
              readOnly={true}
              ratingTextVisible={false}
              setRating={() => void {}}
            />
            <span className="text-right text-sm text-brown-400">
              {review.nickname}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchReviewPost;
