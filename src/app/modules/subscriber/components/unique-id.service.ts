// unique-id.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UniqueIdService {
  uniqueIds: string[] = [];

  generateUniqueIds(count: number): void {
    for (let i = 0; i < count; i++) {
      const uniqueId = `product_${i}`;
      this.uniqueIds.push(uniqueId);
    }
  }
}
