export class AppEvent {
  category: any;
  constructor(
    public type: string,
    public amount: number,
    public categoryId: string,
    public date: string,
    public description: string,
    public id?: string,
    public catName?: string
  ) { }
}
