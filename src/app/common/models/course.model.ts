import { BaseModel } from "./base.model";

interface Section {
  id?: number; // Add an identifier for the section
  duration: {
    minutes: number;
    seconds: number;
  };
  name: string;
  title: string;
  description: string;
  subSections: SubSection[];
  submitted: boolean;
  status: string;
  isNameEntered: boolean;
  isSaveEnabled: boolean;
  isSubmitEnabled: boolean;
  buttonColor: string;
  showAddSubSectionInput?: boolean; // Add this property
  newSubSectionTitle?: string; // Add this property
}

interface SubSection {
  title: string;
  videoFile?: File;
  videoDuration: {
    minutes: number;
    seconds: number;
  };
  videoFileName: string;
  file?: File;
  description: string;
  submitted: boolean;
  status: string;
  duration: {
    minutes: number;
    seconds: number;
  };
  isSubSectionNameEntered: boolean;
  isVideoSelected: boolean;
  isSaveEnabled: boolean;
  isSubmitEnabled: boolean;
  buttonColor: string;
  expanded: boolean;
  isFormSubmitted: boolean;
}
// import { BaseModel } from "./base.model";

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
  public sections?: any[]; // Add this property for sections

  constructor(model?: Course) {
    super(model);
  }
}
