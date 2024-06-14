export interface InstructorProfile {
  id: number;
  name: string;
  course_count: number;
  subscriber_count: number;
  rating: number;
  ratings_count: number;
  reviews_count: number;
  jobTitle: string;
  about: string;
  imageURL: string;
}

export interface AdvisorProfile {
  id: number;
  name: string;
  about: string;
  jobTitle: string;
  imageURL: string;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  phoneVerified: string;
  mailVerified: string;
}
