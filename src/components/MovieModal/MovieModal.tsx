import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./MovieModal.module.css";

interface MovieModalProps {
  movie: {
    title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    backdrop_path: string;
  };
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = ""; // Restore background scrolling when modal is closed
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
