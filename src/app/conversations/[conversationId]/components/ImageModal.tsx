"use client";

import Image from "next/image";

import Modal from "../../../components/modals/Modal";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, src }) => {
  if (!src) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image className="object-contain" fill alt="Image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
