import { useCallback, useEffect, useRef, useState } from 'react';
import { snackInventoryApi } from '../api/snackInventory';
import type { InventoryFood } from '../api/types';

interface UseSnackInventoryOptions {
  /** Set to `false` to skip the initial fetch and call `refresh()` manually. */
  auto?: boolean;
}

export function useSnackInventory({ auto = true }: UseSnackInventoryOptions = {}) {
  const [foods, setFoods] = useState<InventoryFood[]>([]);
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
      setFoods(await snackInventoryApi.getAllFoods({ signal: controller.signal }));
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') setError(err);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auto) void refresh();
    return () => controllerRef.current?.abort();
  }, [auto, refresh]);

  const getFood = useCallback((uuid: string) => snackInventoryApi.getFood(uuid), []);

  const addFood = useCallback(async (uuid: string) => {
    const updated = await snackInventoryApi.addFood(uuid);
    setFoods((current) => {
      const exists = current.some((food) => food.uuid === uuid);
      return exists
        ? current.map((food) => (food.uuid === uuid ? updated : food))
        : [...current, updated];
    });
    return updated;
  }, []);

  const removeFood = useCallback(async (uuid: string) => {
    await snackInventoryApi.removeFood(uuid);
    setFoods((current) =>
      current.flatMap((food) => {
        if (food.uuid !== uuid) return [food];
        return food.quantity > 1 ? [{ ...food, quantity: food.quantity - 1 }] : [];
      }),
    );
  }, []);

  return { foods, loading, error, refresh, getFood, addFood, removeFood };
}
