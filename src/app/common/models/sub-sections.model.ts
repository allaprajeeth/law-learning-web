import { BaseModel } from "./base.model";

export class SubSection extends BaseModel<SubSection> {
  public id!: number;
  public description!: string;
  public title!: string;
  public updatedDate!: string;
  public createdDate!: string;
  constructor(model?: SubSection) {
    super(model);
  }
}
