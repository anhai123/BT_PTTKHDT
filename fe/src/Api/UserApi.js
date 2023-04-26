import React, { useEffect, useState } from "react";
import userService from "../services/user.service";
import moderaterService from "../services/moderator-service";
const user = JSON.parse(localStorage.getItem("user"));
const UserAPI = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [needAcceptAccounts, setNeedAcceptAccounts] = useState([]);
  const [AcceptAccounts, setAcceptAccounts] = useState([]);
  useEffect(() => {
    console.log("dong 15 userApi");
    if (user) {
      const getUser = async () => {
        try {
          setIsLogged(true);
          setUserInfo(user);
          user.role.includes("Ban điều hành")
            ? setIsAdmin(true)
            : user.role.includes("Nhân viên")
            ? setIsEmployee(true)
            : setIsCustomer(true);
        } catch (error) {
          alert(error);
        }
      };
      getUser();
    }
  }, [user, callback]);

  useEffect(() => {
    if (user) {
      const getHistory = async () => {
        if (isAdmin) {
          //   const response = await paymentService.getPayment();
          //   setHistory(response);
          const response = await moderaterService
            .getNeedAcceptAccount()
            .catch((er) => {
              console.log(er);
            });
          console.log(response);
          if (response == undefined) {
            setNeedAcceptAccounts([]);
          } else {
            setNeedAcceptAccounts(response);
          }

          const acceptedAccount =
            await moderaterService.searchEmployeeAccount();
          console.log(acceptedAccount);
          const _data = acceptedAccount;
          var __data = [];
          for (let i = 0; i < _data.length; i++) {
            _data[i]["key"] = _data[i].user_id;
            __data.push(_data[i]);
          }
          setAcceptAccounts(__data);
          // console.log(acceptedAccount);
          // setAcceptAccounts(acceptedAccount);
        } else {
          const response = await userService.getBookingTicket();
          setHistory(response);
        }
      };
      getHistory();
    }
  }, [user, isAdmin, callback]);

  return {
    userInfo: [userInfo, setUserInfo],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isEmployee: [isEmployee, setIsEmployee],
    isCustomer: [isCustomer, setIsCustomer],
    callback: [callback, setCallback],
    history: [history, setHistory],
    notAcceptAccount: [needAcceptAccounts, setNeedAcceptAccounts],
    acceptedAccount: [AcceptAccounts, setAcceptAccounts],
  };
};

export default UserAPI;
