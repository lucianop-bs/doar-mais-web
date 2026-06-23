import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem(key: string, value: string, days = 1): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
  }

  getItem(key: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + key + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  removeItem(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  clear(): void {
    document.cookie.split(';').forEach((c) => this.removeItem(c.split('=')[0].trim()));
  }
}
