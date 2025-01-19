import AdminLayout from '../../../../components/Admin-layout';
import axios from '../../../../utils/axios';
import { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import './list.css';

const List = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const getDepartment = async () => {
    try {
      const response = await axios.get('/department');
      setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    navigate('/admin/Add-department');
  };

  useEffect(() => {
    getDepartment();
  }, []);
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'name',
      render: id => <a>{id}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img className="table-img" src={image} alt="" />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
  ];

  return (
    <AdminLayout heading=" Department">
      <div className="department-container">
        <div className="department-btn-container">
          <Button onClick={onAdd}> Add Department</Button>
        </div>

        <Table dataSource={departments} columns={columns} />
      </div>
    </AdminLayout>
  );
};

export default List;
