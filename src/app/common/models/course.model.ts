// course.model.ts
export interface Course {
    id: number;
    type: string;
    description: string;
    title: string;
    reviewStatus: string;
    thumbnail: string;
    createdBy: {
      name: string;
      id: number;
    };
    updatedDate: string;
    createdDate: string;
    difficultyLevel: string;
    skillLevel: string; // Add this line
    courseType: string; // Add this line
  }
  