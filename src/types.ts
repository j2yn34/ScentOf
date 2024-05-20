import { Timestamp } from "firebase/firestore";

export interface PostData {
  userId: string;
  id: string;
  nickname: string;
  brandName: string;
  productName: string;
  rating: number;
  title: string;
  content: string;
  imageUrl?: string;
  postedDate: Timestamp;
}

export interface ReviewProps {
  limit: number;
  currentPage: number;
  userId?: string;
  searchTerm?: string;
}

export interface RecommendProps {
  limit: number;
  currentPage: number;
  userId?: string;
  searchTerm?: string;
}
