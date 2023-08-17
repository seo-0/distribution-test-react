// state.js
import { atom } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: false,
});

export const signUpModalState = atom({
  key: "signUpModalState",
  default: false,
});

export const userState1 = atom({
  key: "userState1",
  default: {
    isLoggedIn: false,
    token: null,
    username: null,
    email: null,
    userId: null,
  },
});

export const asksState = atom({
  key: "asksState",
  default: [],
});
