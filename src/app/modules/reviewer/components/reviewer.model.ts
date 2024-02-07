// admin.model.ts

export interface Article {
    id: number;
    data: any;
    title: string;
    description: string;
    createdBy: {
      name: string;
      id: number;
    };
    createdDate: string;
    subject: string;
    files: {
      id: number;
      fileName: string;
      url: string;
      contentType: string;
      createdDate: string;
    }[];
    // Add more properties as needed
  }
  
  export interface ArticleApiResponse {
    data: any;
    content: never[];
    articles: Article[];
  }
  
  
  
  
  