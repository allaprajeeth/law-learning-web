export interface CreatedBy {
  name: string;
  id: number;
}

export interface UpdatedBy {
  name: string;
  id: number;
}

export interface File {
  id: number;
  fileName: string;
  url: string;
  contentType: string;
  createdDate: string;
}

export interface Article {
  approvalStatus: string;
  id: number;
  reviewStatus: string;
  description: string;
  title: string;
  subject: string;
  createdBy: CreatedBy;
  viewCount: number;
  updatedBy: UpdatedBy;
  createdDate: string;
  updatedDate: string;
  files: File[];
  fileContent?: string | undefined;
}
