import {Adresse} from './adresse';

export class Profile {
  id: number;
  sexe: string;
  dateN: Date = new Date();
  src: string;
  type: string;
  adresses: Adresse[];
}
