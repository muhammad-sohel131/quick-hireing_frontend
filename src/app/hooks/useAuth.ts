import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { IUser } from "../types/user";
import { fetchMe } from "../lib/authApi";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user = null, isLoading: loginLoading  } = useQuery<IUser | null>({
    queryKey: ["user"],
    queryFn: fetchMe
  });

  const login = useMutation<IUser, Error, IUser>({
    mutationFn: async (payload) => {
      const res = await axios.post(`${BASE}/api/auth/login`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  
  return {
    user,
    login,
    loginLoading 
  };
};
