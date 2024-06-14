import { useState } from "react";
import FollowButton from "../Ui/FollowButton";
import useMapin from "./useMapin";
import { Tabs } from "antd";

function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchQuery(formData.get("search"));
  }

  return (
    <div className="flex flex-col items-center p-4">
      <form className="w-full max-w-md" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search by username"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      <Tabs
        defaultActiveKey="1"
        className="w-full"
        centered
        items={[
          {
            label: "Search result",
            key: "1",
            children: <SearchResut searchQuery={searchQuery} />,
          },
          {
            label: "Followed",
            key: "2",
            children: <FollowedPin />,
          },
          {
            label: "Liked",
            key: "3",
            children: <LikedPin />,
          },
        ]}
      />
    </div>
  );
}

function LikedPin() {
  const { likedPin } = useMapin();

  return (
    <ul className="w-full max-w-md mt-4">
      {likedPin.map((user) => (
        <li
          key={user._id}
          className="flex justify-between items-center p-2 border-b"
        >
          <div className="flex gap-3">
            <img
              src={user.user.image}
              className="h-10 w-10 rounded-full bg-cover"
            />
            <span className="content-center font-bold">{user.username}</span>
          </div>
          <FollowButton userId={user.user._id} />
        </li>
      ))}
    </ul>
  );
}

function FollowedPin() {
  const { followedUserPin } = useMapin();
  return (
    <ul className="w-full max-w-md mt-4">
      {followedUserPin.map((user) => (
        <li
          key={user._id}
          className="flex justify-between items-center p-2 border-b"
        >
          <div className="flex gap-3">
            <img
              src={user.user.image}
              className="h-10 w-10 rounded-full bg-cover"
            />
            <span className="content-center font-bold">{user.username}</span>
          </div>
          <FollowButton userId={user.user._id} />
        </li>
      ))}
    </ul>
  );
}

function SearchResut({ searchQuery }) {
  const { search, isSearching } = useMapin(searchQuery);

  return (
    <div>
      {isSearching ? (
        <p>Loading..</p>
      ) : (
        <ul className="w-full max-w-md mt-4">
          {search?.map((user) => (
            <li
              key={user._id}
              className="flex justify-between items-center p-2 border-b"
            >
              <div className="flex gap-3">
                <img
                  src={user.user.image}
                  className="h-10 w-10 rounded-full bg-cover"
                />
                <span className="content-center font-bold">
                  {user.username}
                </span>
              </div>
              <FollowButton userId={user.user._id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchUsers;
