import { Observable } from 'rxjs';
import { User } from '../models/user';

export default interface IManageAuthentication {
  login: () => Observable<any>;
  logout: () => void;
  register: () => void;
  checkLogin: () => boolean;
  isLoggedIn: boolean;
}
