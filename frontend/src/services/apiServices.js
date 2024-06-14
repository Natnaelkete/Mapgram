import axios from "axios";

const endpoint = "http://localhost:3000/api";

export async function registerUsers(formData) {
  const { data } = await axios.post(`${endpoint}/users/register`, formData, {
    withCredentials: true, // Ensure cookies are sent with the request
  });
  return data;
}

export async function loginUsers(loggedUser) {
  const { data } = await axios.post(`${endpoint}/users/login`, loggedUser, {
    withCredentials: true, // Ensure cookies are sent with the request
  });
  return data;
}

export async function logoutUsers() {
  const { data } = await axios.post(
    `${endpoint}/users/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function getPins() {
  const { data } = await axios.get(`${endpoint}/pins/mine`, {
    withCredentials: true,
  });
  return data;
}

export async function createPins(formData) {
  const { data } = await axios.post(`${endpoint}/pins`, formData, {
    withCredentials: true,
  });
  return data;
}

export async function follow(userId) {
  const { data } = await axios.post(
    `${endpoint}/pins/follow`,
    { userId },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function followersPin() {
  const { data } = await axios.get(`${endpoint}/pins/followers-pins`, {
    withCredentials: true,
  });
  return data;
}

export async function followedPin() {
  const { data } = await axios.get(`${endpoint}/pins/followed-pins`, {
    withCredentials: true,
  });
  return data;
}

export async function searchUsersName(searchQuery) {
  const { data } = await axios.get(
    `${endpoint}/pins/search?username=${searchQuery}`,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function updatePins(values) {
  const { data } = await axios.patch(`${endpoint}/pins`, values, {
    withCredentials: true,
  });
  return data;
}

export async function LikePin(user, id) {
  const { data } = await axios.post(
    `${endpoint}/pins/likes`,
    { user, id },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function GetLikedPin(id) {
  const { data } = await axios.get(`${endpoint}/pins/liked-pin?id=${id}`, {
    withCredentials: true,
  });
  return data;
}

export async function GetLikesPin(user, id) {
  const { data } = await axios.get(
    `${endpoint}/pins/likes-pin?user=${user}&id=${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function getUserByPin(user, id) {
  const { data } = await axios.get(
    `${endpoint}/pins/detail?user=${user}&id=${id}`,
    {
      withCredentials: true,
    }
  );
  return data;
}
