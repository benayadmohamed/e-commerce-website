export class Color {
  id: number;
  name?: string;

  constructor(val: Color) {
    this.id = val.id;
    this.name = val.name;
  }
}
