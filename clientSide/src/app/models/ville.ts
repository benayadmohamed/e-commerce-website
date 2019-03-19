export class Ville {
  id: number;
  name: string;
  api_token: string;

  constructor(val: Ville) {
    this.id = val.id;
    this.name = val.name;
  }
}
