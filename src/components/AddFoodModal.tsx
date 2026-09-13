import { useState, type FormEvent } from 'react';
import type { CreateFoodRequest } from '../api/types';

interface AddFoodModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: CreateFoodRequest, image?: File) => Promise<void>;
}

const EMPTY_FORM: CreateFoodRequest = {
  name: '',
  category: '',
  tasteRating: 3,
};

export function AddFoodModal({ open, onClose, onSubmit }: AddFoodModalProps) {
  const [form, setForm] = useState<CreateFoodRequest>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | undefined>();

  if (!open) return null;

  const handleClose = () => {
    if (submitting) return;
    setForm(EMPTY_FORM);
    setImage(undefined);
    setError(null);
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(form, image);
      setForm(EMPTY_FORM);
      setImage(undefined);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add food');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-food-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="add-food-title">Add Food</h2>
          <button type="button" className="icon-button" onClick={handleClose} aria-label="Close">
            ×
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
            />
          </label>

          <label>
            Category
            <input
              type="text"
              required
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              placeholder="e.g. Fruit, Chips, Beverage"
            />
          </label>

          <label>
            Image (optional)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0])}
            />
            <span className="field-hint">JPEG, PNG, or WebP. Maximum 5 MB.</span>
          </label>

          <label>
            Taste rating (1–5)
            <input
              type="number"
              required
              min={1}
              max={5}
              step={1}
              value={form.tasteRating}
              onChange={(event) => setForm({ ...form, tasteRating: Number(event.target.value) })}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <footer className="modal-footer">
            <button type="button" className="button secondary" onClick={handleClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="button primary" disabled={submitting}>
              {submitting ? 'Adding…' : 'Add Food'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
