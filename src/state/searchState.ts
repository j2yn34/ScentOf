import { atom } from "recoil";

export const reviewCountState = atom<number>({
  key: "reviewCountState",
  default: 0,
});

export const recommendCountState = atom<number>({
  key: "recommendCountState",
  default: 0,
});
