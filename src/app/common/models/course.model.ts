import { BaseModel } from "./base.model";
import { Section } from "./section.model";

export class Course extends BaseModel<Course> {
  public id!: number;
  public type!: string;
  public description!: string;
  public title!: string;
  public reviewStatus!: string;
  public createdBy!: {
    name: string;
    id: number;
  };
  public thumbnail!: string;
  public updatedDate!: string;
  public createdDate!: string;
  public difficultyLevel!: string;
  public skillLevel!: string;
  public courseType!: string;
  public duration!: number;
  public price!: number;
  public viewCount!: number;
  public sections!: Section[];
  constructor(model?: Course) {
    super(model);
  }
}
