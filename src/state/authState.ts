import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

export const hasUserReviewState = atom({
  key: "hasUserReviewState",
  default: true,
});

export const hasUserRecommendState = atom({
  key: "hasUserRecommendState",
  default: true,
});
