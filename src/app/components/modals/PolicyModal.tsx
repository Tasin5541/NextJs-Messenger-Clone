import { privacyPolicyContent, termsOfServiceContent } from "@/app/components/modals/PolicyContent";

import Modal from "./Modal";

// Adjust path if necessary

// Adjust path if necessary

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  policyType: "privacy" | "terms";
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, policyType }) => {
  const isPrivacy = policyType === "privacy";

  // Get the correct content based on the type
  const content = isPrivacy ? privacyPolicyContent : termsOfServiceContent;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="policy-content-container max-h-[80vh] overflow-y-auto">{content}</div>
    </Modal>
  );
};

export default PolicyModal;
