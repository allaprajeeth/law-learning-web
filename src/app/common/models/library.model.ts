import { BaseModel } from "./base.model";

export class Library extends BaseModel<Library> {
  public id!: number;
  public title!: string;
  public fileName!: string;
  public contentType!: string;
  public url!: string;
  public deleted!: boolean;

    constructor(model?: Library) {
      super(model);
    }
  }