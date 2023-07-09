export interface ReviewData {
  readonly id: number;
  readonly imageUrl?: string;
  readonly brandName: string;
  readonly productName: string;
  readonly title: string;
  readonly nickname: string;
  readonly rating: number;
}

export interface RecommendData {
  readonly id: number;
  readonly title: string;
  readonly nickname: string;
  readonly postedDate: number;
}

export const reviewData: ReviewData[] = [
  {
    id: 1,
    imageUrl:
      "https://shop.dior.co.kr/cdn/shop/products/3348901627375_0_800x.jpg?v=1671502598",
    brandName: "브랜드명",
    productName: "제품명1",
    title: "한줄평 리뷰 제목",
    nickname: "닉네임1",
    rating: 4.5,
  },
  {
    id: 2,
    imageUrl:
      "https://www.dailygrid.net/news/photo/201905/222119_121434_5843.jpg",
    brandName: "브랜드명",
    productName: "제품명2",
    title: "한줄평 리뷰 제목",
    nickname: "닉네임2",
    rating: 4,
  },
  {
    id: 3,
    imageUrl:
      "https://nonfiction.com/web/product/small/202008/9475d4ce8aa398a0e69c3b0f98a4c335.jpg",
    brandName: "브랜드명",
    productName: "제품명3",
    title: "한줄평 리뷰 제목",
    nickname: "닉네임3",
    rating: 3.5,
  },
];

export const recommendData: RecommendData[] = [
  {
    id: 1,
    title: "추천질문 제목1",
    nickname: "닉네임1",
    postedDate: 2023 - 7 - 7,
  },
  {
    id: 2,
    title: "추천질문 제목2",
    nickname: "닉네임2",
    postedDate: 2023 - 7 - 8,
  },
  {
    id: 3,
    title: "추천질문 제목3",
    nickname: "닉네임3",
    postedDate: 2023 - 7 - 9,
  },
  {
    id: 4,
    title: "추천질문 제목4",
    nickname: "닉네임4",
    postedDate: 2023 - 7 - 10,
  },
];
