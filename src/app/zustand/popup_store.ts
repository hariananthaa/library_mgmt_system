import { create } from "zustand";
import { ReactElement } from "react";

interface PopupProps {
  open: boolean;
  children: ReactElement | null;
}

interface PopupStore {
  popup: PopupProps;
  setPopup: (props: PopupProps) => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  popup: {
    open: false,
    children: null,
  },
  setPopup: (props) => {
    set({ popup: props });
  },
}));
