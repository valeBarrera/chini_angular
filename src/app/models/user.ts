import { Role } from './role';
export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  token: string;
  img_profile: string;
  token_date: string;
  role: Role;
}
