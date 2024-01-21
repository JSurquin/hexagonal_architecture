import { Observable } from 'rxjs';
import { User } from 'src/app/domain/models/user';

export default interface IDisplayHeroDetail {
  user: User | undefined;

  askUserDetail(id: number): Observable<void>;
  askUserNameChange(newHeroName: string): Observable<void>;
}
