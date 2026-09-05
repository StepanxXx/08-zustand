'use client';

import { useRouter } from 'next/navigation';
import type { NoteTag, NewNote } from '../../types/note';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import { useNoteCreate } from '../../hooks/useNotesMutations';
import { useNoteDraftStore } from '@/lib/stores/noteStore';
import css from './NoteForm.module.css';

const tagArray: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as NoteTag[];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().min(0).max(500, 'Content is too long'),
  tag: Yup.string().oneOf(tagArray).required('Tag is required'),
});

export default function NoteForm() {
  const router = useRouter();
  const fieldId = useId();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const draft = useNoteDraftStore(state => state.draft);
  const setDraft = useNoteDraftStore(state => state.setDraft);
  const clearDraft = useNoteDraftStore(state => state.clearDraft);

  const createMutation = useNoteCreate(() => {
    clearDraft();
    setErrors({});
    router.back();
  });

  const handleSubmit = async (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    try {
      setErrors({});
      await validationSchema.validate(values, { abortEarly: false });
      createMutation.mutate(values);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach(error => {
          if (error.path && !validationErrors[error.path]) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
    console.log(values, errors, errors.title);
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setDraft({
      ...draft,
      [name]: value,
    });
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          value={draft?.title ?? ''}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.title}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          value={draft?.content ?? ''}
          onChange={handleChange}
        />
        <span className={css.error}>{errors.content}</span>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          value={draft?.tag}
          onChange={handleChange}
        >
          {tagArray.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <span className={css.error}>{errors.tag}</span>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={createMutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
