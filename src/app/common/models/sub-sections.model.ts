import { BaseModel } from "./base.model";
import { FileInfo } from "./fileInfo.model";

export class SubSection extends BaseModel<SubSection> {
  public id!: number;
  public description!: string;
  public title!: string;
  public institution!: number;
  public updatedDate!: string;
  public createdDate!: string;
  
  public files!: FileInfo[];
  public file!: FileInfo;
  videoFile?: string; 
  documentFile?: string;
  // documentFile?: File;
  public duration!:number; 
  public reviewStatus!: string;
  showCommentBox?: boolean;
  rejectionComment?: string;
  showResumbitCommentBox?: boolean;
  reSubmissionComment?: string;
  constructor(model?: SubSection) {
    super(model);
  }
}
