import {Ville} from './ville';
import {Region} from './region';

export class Adresse {
  id: number;
  LName: string;
  FName: string;
  phone: string;
  address: string;
  info: string;
  type: string;
  profile_id: number;
  ville_id: number;
  region_id: number;
  ville: Ville;
  region: Region;


  static getAdressePro(adresses: Adresse[]) {
    return adresses.find(value1 => value1.type === 'pro');
  }
}
