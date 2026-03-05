import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreateJobApplicationPayload,
  CreateJobPayload,
  Job,
  JobApplication,
} from "../types/jobs";
import { fetchJobs } from "../lib/jobApi";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const useJob = () => {
  const queryClient = useQueryClient();

  const { data: jobs = [], isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const createJob = useMutation<Job, Error, CreateJobPayload>({
    mutationFn: async (payload) => {
      const res = await axios.post(`${BASE}/api/jobs`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  const createJobApplication = useMutation<
    JobApplication,
    Error,
    CreateJobApplicationPayload
  >({
    mutationFn: async (payload) => {
      const res = await axios.post<JobApplication>(
        `${BASE}/api/applications`,
        payload,
        { withCredentials: true },
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobsApplication"],
      });
    },
  });

  const deleteJob = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await axios.delete(`${BASE}/api/jobs/${id}`, { withCredentials: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });

  return {
    jobs,
    jobsLoading,
    createJob,
    deleteJob,
    createJobApplication,
  };
};
