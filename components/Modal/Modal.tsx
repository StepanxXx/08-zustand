'use client';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import css from './Modal.module.css';

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const router = useRouter();
  const handleClose = (
    event:
      React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event.target === event.currentTarget) {
      if (onClose) {
        onClose();
        return;
      }
      router.back();
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) {
          onClose();
          return;
        }
        router.back();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, router]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        {children}
        {!onClose && (
          <button
            className={css.closeButton}
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
