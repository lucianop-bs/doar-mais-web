import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Passando pelo Interceptor: ', req.url);
  const storageService = inject(StorageService);
  const token = storageService.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
