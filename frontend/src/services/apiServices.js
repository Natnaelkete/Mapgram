import axios from "axios";

const endpoint = "http://localhost:3000/api";

export async function registerUsers(newUser) {
  const { data } = await axios.post(`${endpoint}/users/register`, newUser, {
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
  const { data } = await axios.get(`${endpoint}/pins`);
  return data;
}

export async function createPins(newPin) {
  const { data } = await axios.post(`${endpoint}/pins`, newPin, {
    withCredentials: true,
  });
  return data;
}
