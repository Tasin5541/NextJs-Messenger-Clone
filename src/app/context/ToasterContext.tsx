"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        className: "dark:bg-lightgray dark:text-gray-200",
      }}
    />
  );
};

export default ToasterContext;
