import { FC } from "react";

interface IDialogProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: FC<IDialogProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-[7px]"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Dialog;
