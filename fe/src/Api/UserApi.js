import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import moderaterService from "../services/moderator-service";
const UserAPI = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [needAcceptAccounts, setNeedAcceptAccounts] = useState([]);
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          setIsLogged(true);
          user.role.includes("Ban điều hành")
            ? setIsAdmin(true)
            : user.role.includes("Nhân viên")
            ? setIsEmployee(true)
            : setIsAdmin(false);
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
          const response = await moderaterService.getNeedAcceptAccount();
          console.log(response);
          setNeedAcceptAccounts(response);
        } else {
          // const response = await userService.getUserHistory(user.id);
          // setHistory(response);
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
    notAcceptAccount: [needAcceptAccounts, setNeedAcceptAccounts],
  };
};

export default UserAPI;
