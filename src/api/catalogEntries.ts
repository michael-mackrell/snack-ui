// Thin API bindings for the `CatalogEntries` interface from the Snack
// Service TypeSpec (`@route("/catalog/entries")`). Kept 1:1 with the spec so
// this file stays easy to diff against future TypeSpec changes.

import { request } from './http';
import type { CreateFoodRequest, Food, UpdateFoodRequest } from './types';

const BASE_PATH = '/catalog/entries';

interface RequestOptions {
  signal?: AbortSignal;
}

export const catalogEntriesApi = {
  /** POST /catalog/entries */
  addEntry(body: CreateFoodRequest, options?: RequestOptions): Promise<Food> {
    return request(BASE_PATH, { method: 'POST', body, ...options });
  },

  /** GET /catalog/entries */
  getAllEntries(options?: RequestOptions): Promise<Food[]> {
    return request(BASE_PATH, { method: 'GET', ...options });
  },

  /** PUT /catalog/entries/{uuid} */
  updateEntry(uuid: string, body: UpdateFoodRequest, options?: RequestOptions): Promise<Food> {
    return request(`${BASE_PATH}/${uuid}`, { method: 'PUT', body, ...options });
  },

  /** DELETE /catalog/entries/{uuid} */
  deleteEntry(uuid: string, options?: RequestOptions): Promise<void> {
    return request(`${BASE_PATH}/${uuid}`, { method: 'DELETE', ...options });
  },
};
