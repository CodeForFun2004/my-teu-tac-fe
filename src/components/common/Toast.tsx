import { useEffect } from "react";
import Icon from "@/components/common/Icon";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ open, message, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="alert"
      className="ghost-border fixed right-gutter top-24 z-[200] flex w-full max-w-sm items-start gap-3 rounded-lg bg-surface-container-high p-4 shadow-xl"
    >
      <Icon name="error" className="mt-0.5 text-xl text-error" />
      <p className="flex-1 font-body-md text-body-md text-on-background">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng thông báo"
        className="text-on-surface-variant transition-colors hover:text-secondary"
      >
        <Icon name="close" className="text-lg" />
      </button>
    </div>
  );
};

export default Toast;
