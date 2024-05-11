import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserInGroup } from "../utils/userSlice";

export const UseSearchUserData = (Query) => {
    const dispatch = useDispatch();
    const usertoken = useSelector((store) => store.loggedUserSlice.loggedUser);
    const searchUser = () => {
        try {
            fetch(`/api/user/signUp?search=${Query}`, {
                method: "get",
                headers: {
                    Authorization: `Bearer ${usertoken.token}`,
                },
            })
                .then((result) => result.json())
                .then((res) => dispatch(addUserInGroup(res)));
        } catch (error) {
            alert("ERROR WHILE UPLOADING!!");
        }
    };

    useEffect(() => {
        const searchUsers = setTimeout(() => {
            searchUser();
        }, 500);

        return () => {
            clearTimeout(searchUsers);
        };
    }, [Query]);
}

