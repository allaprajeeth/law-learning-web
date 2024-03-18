import { BaseModel } from "./base.model";

export class FileInfo extends BaseModel<FileInfo> {
  public id!: number;
  public fileName!: string;
  public resourceType!: string;
  public contentType!: string;
  public url!: string;
  constructor(model?: FileInfo) {
    super(model);
  }
}
