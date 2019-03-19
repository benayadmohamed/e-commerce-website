import {Profile} from './profile';

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
  profile: Profile = new Profile();
  captcha: string;

  constructor() {
    this.name = null;
    this.email = null;
    this.password = null;
    this.password_confirmation = null;
  }
}
