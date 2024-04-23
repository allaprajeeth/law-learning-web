interface CourseId {
    id: number;
    type: string;
    description: string;
    title: string;
  
    institution: {
      id: number,
      name: string
  };
  reviewStatus: string;
     createdBy: {
      name: string;
      id: number;
    };
   thumbnail: string;
   updatedDate: string;
    createdDate: string;
     difficultyLevel: string;
     skillLevel: string;
     courseType: string;
    duration: number;
     price: number;
     viewCount: number;
  
    sections: {
      id: number;
      title: string;
      description: string;
      subSections: {
        id: number;
        title: string;
        description: string;
        duration: number;
        reviewStatus: string;
        createdDate: string;
        updatedDate: string;
        file?: {
          id: number;
          fileName: string;
          contentType: string;
          url: string;
        };
      }[];
    }[];
  }
  