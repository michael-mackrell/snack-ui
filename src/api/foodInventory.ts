import { request } from './http';
import type { InventoryFood } from './types';

const BASE_PATH = '/inventory/foods';

interface RequestOptions {
  signal?: AbortSignal;
}

export const foodInventoryApi = {
  /** GET /inventory/foods */
  getAllFoods(options?: RequestOptions): Promise<InventoryFood[]> {
    return request(BASE_PATH, { method: 'GET', ...options });
  },

  /** GET /inventory/foods/{uuid} */
  getFood(uuid: string, options?: RequestOptions): Promise<InventoryFood> {
    return request(`${BASE_PATH}/${uuid}`, { method: 'GET', ...options });
  },

  /** POST /inventory/foods/{uuid} */
  addFood(uuid: string, options?: RequestOptions): Promise<InventoryFood> {
    return request(`${BASE_PATH}/${uuid}`, { method: 'POST', ...options });
  },

  /** DELETE /inventory/foods/{uuid} */
  removeFood(uuid: string, options?: RequestOptions): Promise<void> {
    return request(`${BASE_PATH}/${uuid}`, { method: 'DELETE', ...options });
  },
};
