import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import type { NoteTag, NewNote } from '../../types/note';
import * as Yup from 'yup';
import { useId } from 'react';
import { useNoteCreate } from '../../hooks/useNotesMutations';
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

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNote = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

  const createMutation = useNoteCreate();

  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        onClose();
      },
      onSettled: () => {
        actions.setSubmitting(false);
      },
    });
  };
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            {tagArray.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
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
      </Form>
    </Formik>
  );
}
