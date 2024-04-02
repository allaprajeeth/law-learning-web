export interface InstructorProfile {
    id: number;
    name: string;
    course_count: number;
    subscriber_count: number;
    rating: number;
    ratings_count: number;
    reviews_count: number;
    jobTitle:string;
    about:string;
  }
  
export interface AdvisorProfile{
  id:number;
  name:string;
  about:string;
  jobTitle:string;
}