import {Image} from './image';
import {Color} from './color';
import {File} from './file';
import {Matiere} from './matiere';

export class Article {
  id: number;
  colors: Color[] = [];
  matieres: Matiere[] = [];
  taille: number;
  stock: number;
  produit_id: number;
  images: Image[];
  avatar: string | any;
}
