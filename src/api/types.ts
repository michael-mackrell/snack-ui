// Types mirroring the models defined in the Food Service TypeSpec.

export interface Food {
  uuid: string;
  imageId: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** 1 (worst) to 5 (best) */
  tasteRating: number;
}

export interface InventoryFood extends Food {
  /** Number of units currently in inventory. */
  quantity: number;
}

export interface CreateFoodRequest {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** 1 (worst) to 5 (best) */
  tasteRating: number;
  /** Optional. Server generates one when omitted. */
  imageId?: string;
}

export interface UpdateFoodRequest {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  /** 1 (worst) to 5 (best) */
  tasteRating: number;
  /** Optional. Existing imageId is kept when omitted. */
  imageId?: string;
}

export interface ApiErrorBody {
  message: string;
}
