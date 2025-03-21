import { baseUrl } from "./APi";
import { handleResponse } from "./APi";

function handleToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      localStorage.setItem("jwt", data.token);
      return data;
    });
}

function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(handleResponse)
    .then((data) => {
      if (data) {
        return signIn({ email, password });
      } else {
        throw new Error("The process to sign up has failed, please try again");
      }
    });
}

function getUserInfo(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

function editUserInfo({ name, avatar }, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}

export { getUserInfo, editUserInfo, signIn, signUp, handleToken };
