import {Image} from './image';

export class Actualite {
  id: number;
  titre: string;
  sousTitre: string;
  active: boolean;
  image?: Image;
}
