import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

const NotePreviewClient = ({ title, content, createdAt, tag }: Note) => {
  return (
    <Modal>
      <div className={css.header}>
        <h2>{title}</h2>
      </div>
      <p className={css.tag}>{tag}</p>
      <p className={css.content}>{content}</p>
      <p className={css.date}>{new Date(createdAt).toLocaleString()}</p>
    </Modal>
  );
};

export default NotePreviewClient;
