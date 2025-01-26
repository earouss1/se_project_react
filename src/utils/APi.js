const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const handleRequest = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

function getItems() {
  const url = `${baseUrl}/items`;
  return handleRequest(url);
}

function addNewItems({ name, imageUrl, weather }, token) {
  const url = `${baseUrl}/items`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  };
  return handleRequest(url, options);
}

function deleteItems(_id, token) {
  const url = `${baseUrl}/items/${_id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return handleRequest(url, options);
}

function likeItems(id, token) {
  const url = `${baseUrl}/items/${id}/likes`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return handleRequest(url, options);
}

function dislikeItems(id, token) {
  const url = `${baseUrl}/items/${id}/likes`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  return handleRequest(url, options);
}

export {
  getItems,
  deleteItems,
  addNewItems,
  baseUrl,
  dislikeItems,
  likeItems,
  handleResponse,
};
