import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Table, message, Input, Space } from "antd";
import { GlobalState } from "../../../GlobalState";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import moderaterService from "../../../services/moderator-service";

// const data = [
//   {
//     key: "1",
//     username: "John Brown",
//     email: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
// ];
const AccountChecking = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const state = useContext(GlobalState);
  const notAcceptAccount = state.userAPI.notAcceptAccount[0];
  const [callback, setCallback] = state.userAPI.callback;
  const [data, setData] = useState([]);
  console.log(notAcceptAccount);
  const getDataFunction = () => {
    const _data = [];
    for (let i = 0; i < notAcceptAccount.length; i++) {
      _data.push({
        key: notAcceptAccount[i].user_id,
        username: notAcceptAccount[i].user_name,
        email: notAcceptAccount[i].email,
        address: notAcceptAccount[i].address,
        birthday: notAcceptAccount[i].brithday,
        phone: notAcceptAccount[i].phone,
        full_name: notAcceptAccount[i].full_name,
        role_id: notAcceptAccount[i].role_id,
      });
    }
    setData(_data);
  };

  useEffect(() => {
    getDataFunction();
  }, [notAcceptAccount]);

  const start = () => {
    setLoading(true);
    moderaterService.acceptAccount(selectedRowKeys).then(
      (response) => {
        console.log(response);
        setTimeout(() => {
          message.success({
            content: `Chấp nhận tài khoản`,
            key: "message",
            duration: 2,
          });
        }, 1000);
        setCallback(!callback);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      }
    );

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const startReject = () => {
    setLoading(true);
    moderaterService.rejectWaitingAccount(selectedRowKeys).then(
      (response) => {
        console.log(response);
        setCallback(!callback);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
      }
    );

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
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
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role_id",
    },
    {
      title: "Tên thật",
      dataIndex: "full_name",
    },
  ];
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Except
        </Button>
        <Button
          type="primary"
          onClick={startReject}
          disabled={!hasSelected}
          danger
        >
          Reject
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        locale={{ emptyText: "Không có tài khoản nào cần duyệt" }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};
export default AccountChecking;
