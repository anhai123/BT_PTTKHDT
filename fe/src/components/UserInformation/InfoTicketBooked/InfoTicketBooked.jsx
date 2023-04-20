import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Mã vé',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Tên phim',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Thời gian đặt',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Số ghế',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        
        <a>Hủy vé</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const InfoTicketBooked = () => <Table columns={columns} dataSource={data} />;
export default InfoTicketBooked;