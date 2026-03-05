import axios from "axios";
import { ApiResponse, Job } from "../types/jobs";

export const BASE = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const fetchJobs = async (): Promise<Job[]> => {
  const res = await axios.get<ApiResponse<Job[]>>(`${BASE}/api/jobs`, {
    withCredentials: true,
  });
  return res.data.data;
};

export const fetchSingleJobById = async (id: string): Promise<Job> => {
  const res = await axios.get<ApiResponse<Job>>(`${BASE}/api/jobs/${id}`, {
    withCredentials: true,
  });
  return res.data.data;
};
