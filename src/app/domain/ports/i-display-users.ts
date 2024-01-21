import { Observable } from 'rxjs';
import { User } from 'src/app/domain/models/user';

export default interface IDisplayUsers {
  users: User[];
  filter: string;

  askUsersList(): Observable<void>;
  askUsersFiltered(filter: string, allowEmpty?: boolean): Observable<void>;
  askUserCreation(userName: string): Observable<void>;
  askUserDeletion(user: User): Observable<void>;
}
