import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createPins,
  follow,
  followersPin,
  followedPin,
  getPins,
  loginUsers,
  logoutUsers,
  registerUsers,
  searchUsersName,
  updatePins,
  LikePin,
  getUserByPin,
  GetLikedPin,
  GetLikesPin,
} from "../services/apiServices";
import { useAuth } from "./AuthProvider";
import { useSearchParams } from "react-router-dom";

function useMapin(searchQuery) {
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user");
  const id = searchParams.get("id");

  const { setCredential, removeCredential } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: (formData) => registerUsers(formData),
    onSuccess: (data) => {
      toast.success("Welcome");
      queryClient.setQueryData(["register"], data);
      setCredential(data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Registration failed");
    },
  });

  const { mutate: login, isPending: isLogging } = useMutation({
    mutationFn: (loggedUser) => loginUsers(loggedUser),
    onSuccess: (data) => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries(["login"], data);
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
    refetchOnWindowFocus: false,
  });

  const { mutate: createPin, isPending: isCreating } = useMutation({
    mutationFn: (formData) => createPins(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["pins"], data);
      toast.success("pin created successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create a pin");
    },
  });

  const { data: search, isLoading: isSearching } = useQuery({
    queryKey: ["searchUser", searchQuery],
    queryFn: () => searchUsersName(searchQuery),
    onError: (err) => toast.error(err.response.data.message),
    enabled: !!searchQuery,
  });

  const { mutate: followUser, isPending: isFollowing } = useMutation({
    mutationFn: (userId) => follow(userId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["pins"], data);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed");
    },
  });

  const { data: followersUserPin, isLoading: isGettingPin } = useQuery({
    queryKey: ["followerPins"],
    queryFn: followersPin,
    onError: (err) => toast.error(err.response.data.message),
  });

  const { data: followedUserPin, isLoading: isGettingFollowedPin } = useQuery({
    queryKey: ["followedPins"],
    queryFn: followedPin,
    onError: (err) => toast.error(err.response.data.message),
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: (values) => updatePins(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["pins"], data);
      toast.success("Pin updated successfully");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  const { mutate: Like } = useMutation({
    mutationFn: ({ users, ids }) => LikePin(users, ids),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["likes"], data);
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  const { data: likedPin, isLoading: gettingLikedPin } = useQuery({
    queryKey: ["likedPins", id],
    queryFn: () => GetLikedPin(id),
    onError: (err) => toast.error(err.response.data.message),
    enabled: !!id,
  });

  const { data: likesPin, isLoading: gettingLikesPin } = useQuery({
    queryKey: ["likesPins", user, id],
    queryFn: () => GetLikesPin(user, id),
    onError: (err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
    enabled: !!id && !!user,
  });

  const { data: pinDetail, isLoading: isGettingPinDetail } = useQuery({
    queryKey: ["pinsDetail", id, user],
    queryFn: () => getUserByPin(user, id),
    onError: (err) => {
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
    enabled: !!id && !!user,
  });

  return {
    register,
    isRegistering,
    login,
    isLogging,
    logout,
    followUser,
    update,
    isUpdating,
    followersUserPin,
    followedUserPin,
    isGettingPin,
    isGettingFollowedPin,
    isFollowing,
    pins,
    pinDetail,
    isGettingPinDetail,
    search,
    isSearching,
    isLoading,
    createPin,
    isCreating,
    Like,
    likedPin,
    gettingLikedPin,
    likesPin,
    gettingLikesPin,
  };
}

export default useMapin;
