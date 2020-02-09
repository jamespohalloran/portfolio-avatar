interface PageState {
  [key: string]: any;
}

export const initialPageStates: PageState = {
  ["/"]: {
    bgState: "light"
  },
  ["/contact"]: {
    bgState: "light"
  },
  ["/about"]: {
    bgState: "dark"
  }
};
