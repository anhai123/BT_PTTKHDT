import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
const user = JSON.parse(localStorage.getItem("user"));
const UserAPI = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const response = await userService.getUser(user.id);

          setUserInfo(user);
          setIsLogged(true);
          user.roles.includes("ROLE_ADMIN")
            ? setIsAdmin(true)
            : setIsAdmin(false);
        
          console.log(response);
        } catch (error) {
          alert(error);
        }
      };
      getUser();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const getHistory = async () => {
        if (isAdmin) {
        //   const response = await paymentService.getPayment();
        //   setHistory(response);
        } else {
        //   const response = await userService.getUserHistory(user.id);
        //   setHistory(response);
        }
      };
      getHistory();
    }
  }, [user, isAdmin, callback]);


  return {
    userInfo: [userInfo, setUserInfo],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    callback: [callback, setCallback],
    history: [history, setHistory],
  };
};

export default UserAPI;