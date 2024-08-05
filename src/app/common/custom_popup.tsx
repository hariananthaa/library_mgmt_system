"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { usePopupStore } from "../zustand/popup_store";

export default function CustomPopup() {
  const popup = usePopupStore((state) => state.popup);
  const setPopup = usePopupStore((state) => state.setPopup);

  return (
    <Dialog
      open={popup.open}
      onClose={() => {
        setPopup({
          open: false,
          children: <></>,
        });
      }}
      className="relative z-20"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full max-w-96 transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {popup?.children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
