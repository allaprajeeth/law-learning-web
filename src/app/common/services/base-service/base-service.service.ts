import { Injectable } from '@angular/core';
import { BaseModel } from '../../models/base.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends BaseModel<T>> {

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string
  ) {}

  public get(): Observable<T[]> {
    return this.httpClient
      .get<T>(`${this.apiUrl}`)
      .pipe(map((result) => {
        console.log(result)
        if(result && result.status === 200) {
          const data = result.data?.content;
          if(data)
            return data.map((i) => new this.tConstructor(i))
        }
        return [];
      }));
  }
}
