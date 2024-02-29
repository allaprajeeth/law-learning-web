import { BaseModel } from "./base.model";
import { SubSection } from "./sub-sections.model";

export class Section extends BaseModel<Section> {
  public id!: number;
  public description!: string;
  public title!: string;
  public updatedDate!: string;
  public createdDate!: string;
  public subSections!: SubSection[];
  constructor(model?: Section) {
    super(model);
  }
}
