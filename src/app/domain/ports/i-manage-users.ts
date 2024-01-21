import { Observable } from 'rxjs';
import { User } from '../models/user';

export default interface IManageUsers {
  getUsers(): Observable<User[]>;
  searchUsers(term: string): Observable<User[]>;
  getUser(id: number): Observable<User>;
  addUser(User: User): Observable<User>;
  updateUser(User: User): Observable<User>;
  deleteUser(id: number): Observable<number>;
}
