import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import moderaterService from "../../../services/moderator-service";
import EditMovieModal from "../EditMovieModal/EditMovieModal";
import AddMovieModal from "../AddMovieModal/AddMovieModal";
import moment from "moment";
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
const originData = [];
for (let i = 0; i < 6; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber />
    ) : inputType === "date" ? (
      <DatePicker
        format="YYYY-MM-DD"
        onChange={(date, dateStringg) => {
          console.log(date + "dasd" + dateStringg);
        }}
      />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : dataIndex === "poster_ulr" ? (
        <img
          style={{ height: "100px", width: "100px" }}
          src={record.poster_ulr}
          alt="Girl in a jacket"
        ></img>
      ) : (
        children
      )}
    </td>
  );
};
const MovieManagement = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useContext(GlobalState);
  const [callback, setCallback] = state.filmsAPI.callback;
  const [film, setfilm] = state.filmsAPI.film;

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const hasSelected = selectedRowKeys.length > 0;
  console.log(film);

  const getDataFunction = () => {
    const _data = film;

    var __data = [];
    for (let i = 0; i < _data.length; i++) {
      _data[i]["key"] = _data[i].movie_id;
      __data.push(_data[i]);
    }
    setData(__data);
  };

  useEffect(() => {
    getDataFunction();
  }, [film]);
  const start = () => {
    setLoading(true);
    console.log(selectedRowKeys);
    moderaterService.deleteFilm(selectedRowKeys).then(
      (response) => {
        message.success("Xóa phim thành công");
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
        message.error(_content);
      }
    );
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
    getDataFunction();
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",

      ...record,
      release_date: moment(record.release_date),
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const handleAdd = () => {
    const count = data.length;
    const newData = {
      key: count + 1,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setData([...data, newData]);
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      console.log(row.release_date);
      if (index > -1) {
        console.log("index >1");
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData);
        await moderaterService.updateFilmInfor(row).then(
          (response) => {
            // setUserInfo(response);
            // setIslog(true);
            // state.userAPI.isLogged.setIsLogged(true);

            message.success("Cập nhật film thành công");

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
            message.error(_content);
          }
        );
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Mã phim",
      dataIndex: "movie_id",
      width: "5%",
      editable: true,
    },

    {
      title: "Ảnh bìa",
      dataIndex: "poster_ulr",
      width: "10%",
      editable: true,
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      width: "10%",
      editable: true,
    },
    {
      title: "Tên phim",
      dataIndex: "title",
      width: "10%",
      editable: true,
    },

    {
      title: "Trailer",
      dataIndex: "trailer",
      width: "15%",
      editable: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: "30%",
      editable: true,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "release_date",
      width: "18%",
      editable: true,
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      width: "10%",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      width: "10%",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              type="warning"
            >
              Sửa phim
            </Typography.Link>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "age"
            ? "number"
            : col.dataIndex === "release_date"
            ? "date"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} danger>
          Delete
        </Button>
        <AddMovieModal />
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Form form={form} component={false}>
        {data[0] && (
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={film}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
            rowSelection={rowSelection}
          />
        )}
      </Form>
    </>
  );
};
export default MovieManagement;
