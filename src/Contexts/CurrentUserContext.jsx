import React from "react";

const CurrentUserContext = React.createContext({
  user: {
    name: "",
    email: "",
    avatar: "",
    _id: "",
  },
});

export default CurrentUserContext;
