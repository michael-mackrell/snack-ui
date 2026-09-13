// Composable (React hook) wrapping the `CatalogEntries` API. Loads the
// catalog once on mount, then keeps local state in sync as mutations
// succeed, so components never have to manually re-fetch after a write.

import { useCallback, useEffect, useRef, useState } from 'react';
import { catalogEntriesApi } from '../api/catalogEntries';
import type { CreateFoodRequest, Food, UpdateFoodRequest } from '../api/types';

interface UseCatalogEntriesOptions {
  /** Set to `false` to skip the initial fetch and call `refresh()` manually instead. */
  auto?: boolean;
}

export function useCatalogEntries({ auto = true }: UseCatalogEntriesOptions = {}) {
  const [entries, setEntries] = useState<Food[]>([]);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const data = await catalogEntriesApi.getAllEntries({ signal: controller.signal });
      setEntries(data);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auto) refresh();
    return () => controllerRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  const addEntry = useCallback(async (body: CreateFoodRequest) => {
    const created = await catalogEntriesApi.addEntry(body);
    setEntries((current) => [...current, created]);
    return created;
  }, []);

  const updateEntry = useCallback(async (uuid: string, body: UpdateFoodRequest) => {
    const updated = await catalogEntriesApi.updateEntry(uuid, body);
    setEntries((current) => current.map((entry) => (entry.uuid === uuid ? updated : entry)));
    return updated;
  }, []);

  const deleteEntry = useCallback(async (uuid: string) => {
    await catalogEntriesApi.deleteEntry(uuid);
    setEntries((current) => current.filter((entry) => entry.uuid !== uuid));
  }, []);

  const uploadImage = useCallback(async (uuid: string, image: File) => {
    const updated = await catalogEntriesApi.uploadImage(uuid, image);
    setEntries((current) => current.map((entry) => (entry.uuid === uuid ? updated : entry)));
    return updated;
  }, []);

  return { entries, loading, error, refresh, addEntry, updateEntry, deleteEntry, uploadImage };
}
