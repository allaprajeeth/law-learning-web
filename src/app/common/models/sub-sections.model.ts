import { BaseModel } from "./base.model";
import { FileInfo } from "./fileInfo.model";

export class SubSection extends BaseModel<SubSection> {
  public id!: number;
  public description!: string;
  public title!: string;
  public institution!: number;
  public updatedDate!: string;
  public createdDate!: string;
  public file!: FileInfo;
  public duration!:number; 
  public reviewStatus!: string;
  constructor(model?: SubSection) {
    super(model);
  }
}
