import React, { useState, useRef } from "react";
import { Button, Table, message, Input, Space, Typography } from "antd";
import { useEffect } from "react";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import CreateShowTime from "../CreateShowTime/CreateShowTime";
const data = [
  {
    key: "1",
    username: "John Brown",
    email: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
];
const ShowtimeManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const getDataFunction = () => {
    // ModeratorService.getWaitingAccountList().then(
    //   (response) => {
    //     const _data = [];
    //     console.log(response.data);
    //     for (let i = 0; i < response.data.length; i++) {
    //       _data.push({
    //         key: response.data[i].id,
    //         username: response.data[i].tai_khoan,
    //         email: response.data[i].email,
    //         address: response.data[i].cua,
    //       });
    //     }
    //     setData(_data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //     console.log(_content);
    //   }
    // );
  };
  //   useEffect(() => {
  //     getDataFunction();
  //   }, [loading]);
  const start = () => {
    setLoading(true);
    // ModeratorService.acceptWaitingAccount(selectedRowKeys).then(
    //   (response) => {
    //     console.log(response);
    //     setTimeout(() => {
    //       message.success({
    //         content: `Chấp nhận tài khoản`,
    //         key: "message",
    //         duration: 2,
    //       });
    //     }, 1000);
    //     getDataFunction();
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     console.log(_content);
    //   }
    // );

    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false);
    // }, 1000);
  };

  const startReject = () => {
    setLoading(true);
    // ModeratorService.rejectWaitingAccount(selectedRowKeys).then(
    //   (response) => {
    //     console.log(response);
    //     getDataFunction();
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     console.log(_content);
    //   }
    // );

    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false);
    // }, 1000);
  };
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
      title: "Mã lịch chiếu",
      dataIndex: "username",
    },
    {
      title: "Ngày chiếu",
      dataIndex: "email",
    },
    {
      title: "Giờ chiếu",
      dataIndex: "address",
    },
    {
      title: "Giá vé",
      dataIndex: "ticket_price",
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <CreateShowTime />
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        locale={{ emptyText: "Không có lịch phim nào được thêm" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default ShowtimeManagement;
