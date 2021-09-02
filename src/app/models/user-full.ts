import { Role } from './role';
export class UserFull {
  id: number;
  name: string;
  email: string;
  password: string;
  address: string;
  city: string;
  region: string;
  telephone: number;
  birthday: Date;
  img_profile: string;
  role: Role;
}
