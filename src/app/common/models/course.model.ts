import { BaseModel } from "./base.model";
import { Section } from "./section.model";
import { SubSection } from './sub-sections.model';

// interface Section {
//   id?: number; 
//   duration: {
//     minutes: number;
//     seconds: number;
//   };
//   name: string;
//   title: string;
//   description: string;
//   subSections: SubSection[];
//   submitted: boolean;
//   status: string;
//   isNameEntered: boolean;
//   isSaveEnabled: boolean;
//   isSubmitEnabled: boolean;
//   buttonColor: string;
//   showAddSubSectionInput?: boolean; 
//   newSubSectionTitle?: string; 
// }

// interface SubSection {
//   title: string;
//   videoFile?: File;
//   videoDuration: {
//     minutes: number;
//     seconds: number;
//   };
//   videoFileName: string;
//   file?: File;
//   description: string;
//   submitted: boolean;
//   status: string;
//   duration: {
//     minutes: number;
//     seconds: number;
//   };
//   isSubSectionNameEntered: boolean;
//   isVideoSelected: boolean;
//   isSaveEnabled: boolean;
//   isSubmitEnabled: boolean;
//   buttonColor: string;
//   expanded: boolean;
//   isFormSubmitted: boolean;
// }


export class Course extends BaseModel<Course> {
  public id!: number;
  public type!: string;
  public description!: string;
  public title!: string;
  public institution!: {
    id: 2,
    name: string
};
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
  public SubSections!:SubSection[]

  constructor(model?: Course) {
    super(model);
  }
}
