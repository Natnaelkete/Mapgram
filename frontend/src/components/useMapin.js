import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createPins,
  getPins,
  loginUsers,
  logoutUsers,
  registerUsers,
} from "../services/apiServices";
import { useAuth } from "./AuthProvider";

function useMapin() {
  const { setCredential, removeCredential } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: register, isLoading: isRegistering } = useMutation({
    mutationFn: (newUser) => registerUsers(newUser),
    onSuccess: (data) => {
      toast.success("Welcome");
      queryClient.setQueryData(["register"], data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });

  const { mutate: login, isLoading: isLogging } = useMutation({
    mutationFn: (loggedUser) => loginUsers(loggedUser),
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      queryClient.setQueryData(["login"], data);
      setCredential(data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const { mutate: logout } = useMutation({
    mutationFn: logoutUsers,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged out successfully");
      removeCredential();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout failed");
    },
  });

  const { data: pins, isLoading } = useQuery({
    queryKey: ["pins"],
    queryFn: getPins,
    onError: (err) => toast.error(err.response.data.message),
  });

  const { mutate: createPin, isLoading: isCreating } = useMutation({
    mutationFn: (newPin) => createPins(newPin),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["pins"], data);
      toast.success("pin created successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create a pin");
    },
  });

  return {
    register,
    isRegistering,
    login,
    isLogging,
    logout,
    pins,
    isLoading,
    createPin,
    isCreating,
  };
}

export default useMapin;
