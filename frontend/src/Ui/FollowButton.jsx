// import { useState } from "react";
import useMapin from "../components/useMapin";

function FollowButton({ userId }) {
  // const [isFollowingUser, setIsFollowing] = useState(false);
  const { followUser, isFollowing, followedUserPin } = useMapin();
  const exists = followedUserPin.some((user) => user.user._id === userId);

  const handleFollow = async () => {
    followUser(userId);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isFollowing}
      className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
        exists
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      {exists ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;
