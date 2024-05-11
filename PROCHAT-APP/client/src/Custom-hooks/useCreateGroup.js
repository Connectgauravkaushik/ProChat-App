import { useEffect } from "react";
import { useSelector } from "react-redux";

export const UseCreateGroup = async (users, chatname) => {
    const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);
    const createUser = () => {
        try {
            fetch("/api/chat/group",
                {
                    method: "post",
                    body: {
                        name: chatname,
                        users: JSON.stringify(users.map((u) => u._id)),
                    },
                    headers: {
                        Authorization: `Bearer ${usertoken.token}`,
                    }
                }
            ).then((result) => result.json());

        } catch (error) {

        }
    }


    useEffect(() => {
        createUser();
    }, []);

}