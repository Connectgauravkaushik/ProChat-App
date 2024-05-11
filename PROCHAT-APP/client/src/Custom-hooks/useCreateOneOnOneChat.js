import { useEffect } from "react";
import { useSelector } from "react-redux";

export const UserOneOnOneChat = async (userId) => {
    console.log(userId);
  const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);

  const CreateChat = () => {
    try {
      fetch("/api/chat/chats", {
        method: "post",
        body: { userId: userId },
        headers: {
          Authorization: `Bearer ${usertoken.token}`,
        },
      })
        .then((result) => result.json())
        .then((data) => console.log(data));
    } catch (error) {}
  };
  useEffect(() => {
    CreateChat();
  }, []);
};
