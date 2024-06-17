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

export interface CommentData {
  id: string;
  postId: string;
  content: string;
  nickname: string;
  userId: string;
  createdDate: Timestamp;
}
