/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * api
 * OpenAPI spec version: v1
 */
import type { UserResponseDTO } from './userResponseDTO';

export interface UserListResponseDTO {
  /** @nullable */
  items?: UserResponseDTO[] | null;
  page?: number;
  pageSize?: number;
  totalCount?: number;
  totalPages?: number;
}
