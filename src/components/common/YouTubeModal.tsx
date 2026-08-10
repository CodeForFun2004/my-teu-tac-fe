import { useEffect } from "react";
import Icon from "@/components/common/Icon";

interface YouTubeModalProps {
  videoId: string;
  open: boolean;
  onClose: () => void;
  title?: string;
}

const YouTubeModal = ({ videoId, open, onClose, title = "Video Tễu Tạc" }: YouTubeModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-gutter backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng video"
          className="absolute -top-12 right-0 text-3xl text-secondary transition-colors hover:text-inverse-surface"
        >
          <Icon name="close" />
        </button>
        <div className="ghost-border aspect-video overflow-hidden rounded-lg bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default YouTubeModal;
