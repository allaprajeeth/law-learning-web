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
  approvalStatus?: string;
  id: number;
  description: string;
  title: string;

  fileContent?: string | undefined;
  
  data: any;
 

  createdBy: {
    name: string;
    id: number;
  };
  reviewStatus: string;
  updatedBy: {
    name: string;
    id: number;
  };
  viewCount: number;
  updatedDate: string;
  createdDate: string;
  subject: string;
  files: {
    id: number;
    fileName: string;
    url: string;
    contentType: string;
    createdDate: string;
  }[];
}
