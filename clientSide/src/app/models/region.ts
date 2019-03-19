export class Region {
  id: number;
  name: string;
  api_token: string;

  constructor(val: Region) {
    this.id = val.id;
    this.name = val.name;
  }
}
