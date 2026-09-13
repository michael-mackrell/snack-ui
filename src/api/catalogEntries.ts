// Thin API bindings for the `CatalogEntries` interface from the Food
// Service TypeSpec (`@route("/catalog/entries")`). Kept 1:1 with the spec so
// this file stays easy to diff against future TypeSpec changes.

import { apiUrl, request } from './http';
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

  /** PUT /catalog/entries/{uuid}/image */
  uploadImage(uuid: string, image: File, options?: RequestOptions): Promise<Food> {
    const body = new FormData();
    body.append('image', image);
    return request(`${BASE_PATH}/${uuid}/image`, { method: 'PUT', body, ...options });
  },

  /** DELETE /catalog/entries/{uuid}/image */
  deleteImage(uuid: string, options?: RequestOptions): Promise<void> {
    return request(`${BASE_PATH}/${uuid}/image`, { method: 'DELETE', ...options });
  },

  imageUrl(uuid: string, imageId: string): string {
    return apiUrl(`${BASE_PATH}/${uuid}/image?v=${encodeURIComponent(imageId)}`);
  },
};
