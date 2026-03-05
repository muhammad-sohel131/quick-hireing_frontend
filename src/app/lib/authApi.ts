"use client"
import axios from "axios";
import { ApiResponse} from "../types/jobs";
import { IUser } from "../types/user";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const fetchMe = async (): Promise<IUser> => {
  const res = await axios.get<ApiResponse<IUser>>(`${BASE}/api/user/me`, {
    withCredentials: true,
  });
  return res.data.data;
};

