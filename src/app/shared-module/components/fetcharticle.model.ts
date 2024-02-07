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
  // Add more properties as needed based on your API response
}

 
  export interface ArticleApiResponse {
    data: any;
    content: Article[];
    articles: Article[];
  }
  
  
  
  
  