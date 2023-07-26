import { atom } from "recoil";

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

export const hasUserReviewState = atom<boolean>({
  key: "hasUserReviewState",
  default: true,
});

export const hasUserRecommendState = atom<boolean>({
  key: "hasUserRecommendState",
  default: true,
});
