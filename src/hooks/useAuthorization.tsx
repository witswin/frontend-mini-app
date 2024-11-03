import { AuthDispatch, AuthState } from "@/context/auth";
import { useContext } from "react";

export const useAuth = () => useContext(AuthState);
export const useAuthDispatch = () => useContext(AuthDispatch);
