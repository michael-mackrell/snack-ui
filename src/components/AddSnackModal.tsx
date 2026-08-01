import { useState, type FormEvent } from 'react';
import type { CreateFoodRequest } from '../api/types';

interface AddSnackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (body: CreateFoodRequest) => Promise<void>;
}

const EMPTY_FORM: CreateFoodRequest = {
  name: '',
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  tasteRating: 3,
};

export function AddSnackModal({ open, onClose, onSubmit }: AddSnackModalProps) {
  const [form, setForm] = useState<CreateFoodRequest>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleClose = () => {
    if (submitting) return;
    setForm(EMPTY_FORM);
    setError(null);
    onClose();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await onSubmit(form);
      setForm(EMPTY_FORM);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add snack');
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
        aria-labelledby="add-snack-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="add-snack-title">Add Snack</h2>
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
            Calories
            <input
              type="number"
              required
              min={0}
              step={1}
              value={form.calories}
              onChange={(event) => setForm({ ...form, calories: Number(event.target.value) })}
            />
          </label>

          <div className="form-row">
            <label>
              Protein (g)
              <input
                type="number"
                required
                min={0}
                step={0.1}
                value={form.protein}
                onChange={(event) => setForm({ ...form, protein: Number(event.target.value) })}
              />
            </label>

            <label>
              Carbs (g)
              <input
                type="number"
                required
                min={0}
                step={0.1}
                value={form.carbs}
                onChange={(event) => setForm({ ...form, carbs: Number(event.target.value) })}
              />
            </label>

            <label>
              Fat (g)
              <input
                type="number"
                required
                min={0}
                step={0.1}
                value={form.fat}
                onChange={(event) => setForm({ ...form, fat: Number(event.target.value) })}
              />
            </label>
          </div>

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
              {submitting ? 'Adding…' : 'Add Snack'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
