import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

@Injectable()
export class PaginationInterceptor<T> implements NestInterceptor<T, PaginatedResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<PaginatedResponse<T>> {
    const [request] = context.getArgs();
    // Stub: build meta from common PaginatedDto source if needed
    return next.handle().pipe(
      map((data: any) => data || { items: [], meta: { page: 1, pageSize: 20, total: 0, totalPages: 0 } }),
    );
  }
}
