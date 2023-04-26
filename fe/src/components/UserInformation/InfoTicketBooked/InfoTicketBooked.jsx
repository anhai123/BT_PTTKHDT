import { Space, Table, Tag } from 'antd';
import { GlobalState } from '../../../GlobalState';
import { useEffect, useState, useContext } from "react";
import userService from '../../../services/user.service';
import { message } from 'antd';
const InfoTicketBooked = () => 
{ 
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [callback, setCallback] = state.userAPI.callback
  const handleHuyVe = async (ve) => {
    await  userService.deleteBooking(ve.booking_id).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("Hủy vé thành công");
        setCallback(!callback)
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
    console.log(ve)
  }
  const columns = [
    {
      title: 'Mã vé',
      dataIndex: 'booking_id',
      key: 'booking_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Số tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Thời gian đặt',
      dataIndex: 'booking_date',
      key: 'booking_date',
    },
    {
      title: 'Số ghế',
      dataIndex: 'seat_id',
      key: 'seat_id',
    },
    {
      title: 'Mã phòng',
      dataIndex: 'screening_id',
      key: 'screening_id',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" onClick={() => handleHuyVe(record)}>
          <a>Hủy vé</a>
        </Space>
      ),
    },
  ];
  return(
<Table columns={columns} dataSource={history} />
)};

export default InfoTicketBooked;