import { BaseModel } from "./base.model";

export class Library extends BaseModel<Library> {
  public id!: number;
  public title!: string;
  public fileName!: string;
  public contentType!: string;
  public url!: string;
  public deleted!: boolean;
  public showFileContent: boolean = false;  // Initialize with false
  public fileContent: string = '';  // Initialize with an empty string
  name: any;
  createdDate: string | undefined;

  constructor(model?: Library) {
    super(model);
  }
}
