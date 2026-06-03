export class ApiResponseDto<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: { page: number; pageSize: number; total: number; totalPages: number };
}
