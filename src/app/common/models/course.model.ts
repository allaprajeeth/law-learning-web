import { BaseModel } from "./base.model";

interface Section {
  id?: number; 
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
  showAddSubSectionInput?: boolean; 
  newSubSectionTitle?: string; 
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
  public sections?: any[];
  public duration!: number;
  public price!: number;
  public viewCount!: number;
  constructor(model?: Course) {
    super(model);
  }
}
