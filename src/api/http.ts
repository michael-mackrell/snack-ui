// Shared low-level HTTP client. Every generated API module funnels through
// `request()` so base URL, JSON (de)serialization, and error handling only
// live in one place.

import type { ApiErrorBody } from './types';

// In dev, leave unset so requests use same-origin paths and Vite proxies
// /catalog/* to the backend (see vite.config.ts). Set explicitly for production
// when the API is on another host (that host must allow CORS).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  signal?: AbortSignal;
}

export async function request<T>(
  path: string,
  { method = 'GET', body, signal }: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  // Matches the TypeSpec `NoContent` (204) response.
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : undefined;

  if (!response.ok) {
    const message = (data as ApiErrorBody | undefined)?.message ?? `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}
