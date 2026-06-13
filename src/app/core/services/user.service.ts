import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private api = inject(ApiService);

  list(): Observable<User[]> {
    return this.api.get<User[]>('/users');
  }

  getById(id: number): Observable<User> {
    return this.api.get<User>(`/users/${id}`);
  }

  create(user: Partial<User>): Observable<User> {
    return this.api.post<User>('/users', user);
  }

  update(id: number, user: Partial<User>): Observable<User> {
    return this.api.put<User>(`/users/${id}`, user);
  }

  postsByUser(userId: number): Observable<Post[]> {
    return this.api.get<Post[]>(`/posts?userId=${userId}`);
  }
}
