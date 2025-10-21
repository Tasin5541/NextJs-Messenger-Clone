"use client";

import { useState } from "react";

import PolicyModal from "@/app/components/modals/PolicyModal";

const Policy = () => {
  const [modalContent, setModalContent] = useState<"privacy" | "terms" | null>(null);

  const openModal = (type: "privacy" | "terms") => {
    setModalContent(type);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="space-x-4 mb-2">
          {/* Policy Links with onClick handlers */}
          <button
            onClick={() => openModal("privacy")}
            className="
                                text-gray-500 hover:text-gray-600 
                                dark:text-gray-400 dark:hover:text-gray-300 
                                transition duration-150 ease-in-out underline
                            "
          >
            Privacy Policy
          </button>

          <button
            onClick={() => openModal("terms")}
            className="
                                text-gray-500 hover:text-gray-600 
                                dark:text-gray-400 dark:hover:text-gray-300 
                                transition duration-150 ease-in-out underline
                            "
          >
            Terms of Service
          </button>
        </div>
        <div>contact: tasinmiftaulmannan@gmail.com</div>
      </div>
      {/* Render the PolicyModal when modalContent is set */}
      {modalContent && (
        <PolicyModal
          isOpen={!!modalContent} // Always true when rendered
          onClose={closeModal}
          policyType={modalContent}
        />
      )}
    </>
  );
};
export default Policy;
