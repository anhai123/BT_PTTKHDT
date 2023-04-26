import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Space,
  message,
  DatePicker,
} from "antd";
import "./TicketFiltering.scss";
// import SpinnerLoading from "../SpinnerLoading/SpinnerLoading";
// import MovieItem from "../MovieItem/MovieItem";
import employeeService from "../../services/employee.service";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    username: "John Brown",
    email: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];
export default function TicketFiltering() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const [dataRender, setDataRender]= useState([
    {
      key: "1",
      username: "John Brown",
      email: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
  ])
  const renderVe = () => {
    // return danhSachPhimSearch.map((phim, index) => {
    //   return <MovieItem phimItem={phim} key={index} />;
    // });
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [VeSearch, setVeSearch] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const submit = async (e) => {
    e.preventDefault();
    await employeeService.searchTicket(searchTerm).then(
      (response) => {
                     console.log("thanh cong r")
                     console.log(response)
                     var data = [{
                      ...response.booking,
                      ...response.user

                     }]
                     setDataRender(data)
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
  }
  const clickConfirm = async (record) => {
    console.log(record)
    await employeeService.confirmTicket(record.booking_id).then(
      (response) => {
        // setUserInfo(response);
        // setIslog(true);
        // state.userAPI.isLogged.setIsLogged(true);

        message.success("Xác nhận vé thành công");
        setDataRender([])

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

  }

  //table
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

    //for search column
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
  
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? "#1890ff" : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: "#ffc069",
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    });
    const columns = [
      {
        title: "Mã booking",
        dataIndex: "booking_id",
      },
      {
        title: "Username",
        dataIndex: "user_name",
        key: "ten_nguoi_dung",
        ...getColumnSearchProps("ten_nguoi_dung"),
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Ngày đặt",
        dataIndex: "booking_date",
      },
      {
        title: "Tiền",
        dataIndex: "price",
      },
      
      {
        title: "Thao tác",
        dataIndex: "operation",
        render: (_, record) => (
          <Space size="middle">
            <a onClick={() => clickConfirm(record)}>Confirm</a>
          </Space>
        ),
      },
    ];
  return (
    <div className="container all-movie">
      <div className="search">
        <div id="wrap">
          <form autoComplete="on" onSubmit={submit}>
            <input
              id="search"
              name="search"
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Nhập id booking cần tìm"
            />
            <input id="search_submit" defaultValue="Rechercher" type="submit" />
          </form>
        </div>
      </div>
      <div className="row movielist-content">
        
      <Table
        locale={{ emptyText: "Không có vé được tìm" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataRender}
      />
      </div>
    </div>
  );
}
