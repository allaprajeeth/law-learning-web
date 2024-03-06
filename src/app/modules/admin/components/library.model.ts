// library.model.ts

export interface Library {
    id: number;
    fileName: string;
    contentType: string;
    url: string;
    title: string;
    deleted: boolean;
    createdDate: string;
    updatedDate: string;
  }
  