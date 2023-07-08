export interface ReviewData {
  imageUrl: string;
  brandName: string;
  productName: string;
  reviewTitle: string;
  nickname: string;
  rate: number;
  id: number;
}

export const reviewData: ReviewData[] = [
  {
    imageUrl:
      "https://shop.dior.co.kr/cdn/shop/products/3348901627375_0_800x.jpg?v=1671502598",
    brandName: "브랜드명",
    productName: "제품명1",
    reviewTitle: "한줄평 리뷰 제목",
    nickname: "닉네임1",
    rate: 3.5,
    id: 1,
  },
  {
    imageUrl:
      "https://www.dailygrid.net/news/photo/201905/222119_121434_5843.jpg",
    brandName: "브랜드명",
    productName: "제품명2",
    reviewTitle: "한줄평 리뷰 제목",
    nickname: "닉네임2",
    rate: 4,
    id: 2,
  },
  {
    imageUrl:
      "https://nonfiction.com/web/product/small/202008/9475d4ce8aa398a0e69c3b0f98a4c335.jpg",
    brandName: "브랜드명",
    productName: "제품명3",
    reviewTitle: "한줄평 리뷰 제목",
    nickname: "닉네임3",
    rate: 5,
    id: 3,
  },
];
