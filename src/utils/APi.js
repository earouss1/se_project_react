const baseUrl = "http://localhost:3001";

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const handleRequest = (url, options) => {
  return fetch(url, options).then(handleResponse);
};

function getItems() {
  const url = `${baseUrl}/items`;
  return handleRequest(url);
}

function addNewItems({ name, imageUrl, weather }) {
  const url = `${baseUrl}/items`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  };
  return handleRequest(url, options);
}

function deleteItems(_id) {
  const url = `${baseUrl}/items/${_id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return handleRequest(url, options);
}

export { getItems, deleteItems, addNewItems };

// export default class APi {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   _checkResponse(res) {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   }

//   _request(url, options) {
//     return fetch(url, options).then(this._checkResponse);
//   }

//   getItems() {
//     const url = `${this._baseUrl}/items`;
//     const options = { headers: this._headers };
//     return this._request(url, options);
//   }

//   addNewItems({ name, imageUrl, weather }) {
//     const url = `${this._baseUrl}/items`;
//     const options = {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name,
//         imageUrl,
//         weather,
//       }),
//     };
//     return this._request(url, options);
//   }

//   deleteItems(itemId) {
//     const url = `${this._baseUrl}/items/${itemId}`;
//     const options = { method: "DELETE", headers: this._headers };
//     return this._request(url, options);
//   }
// }
