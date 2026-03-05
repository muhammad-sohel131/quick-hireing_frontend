export interface ApiResponse<T> {
  data: T;
}

export interface JobApplication {
  _id: string;
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at: string;
}

export interface CreateJobApplicationPayload {
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
}
export type JobCategory =
  | "Design"
  | "Marketing"
  | "Business"
  | "Technology"
  | "Engineering"
  | "Finance"
  | "Human Resource";

export interface Job {
  _id: string;
  title: string;
  company: string;
  companyImageUrl: string;
  location: string;
  category: JobCategory[];
  description: string;
  isFeatured: boolean;
  createdAt: string;
}

export type CreateJobPayload = Omit<Job, "_id" | "createdAt">;