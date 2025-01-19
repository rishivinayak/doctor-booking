import AdminLayout from '../../../../components/Admin-layout';
import axios from '../../../../utils/axios';
import { Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './list.css';

const Listhospital = () => {
  const [hospitals, setHospitals] = useState([]);

  const navigate = useNavigate();

  const getHospital = async () => {
    const response = await axios.get('/hospital');
    setHospitals(response.data);
  };

  const goToAddHospital = () => {
    navigate('/admin/add-hospital');
  };

  useEffect(() => {
    getHospital();
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
      render: image => <img className="table-image" src={image} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Departments',
      dataIndex: 'department',
      key: 'department',
      render: departments => {
        return (
          <div className="department-list">
            {departments.map(item => (
              <p>{item.name}</p>
            ))}
          </div>
        );
      },
    },

    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phonenumber',
      key: 'phonenumber',
    },

    {
      title: 'About',
      dataIndex: 'about',
      key: 'about',
    },
  ];

  return (
    <AdminLayout heading="Hospital">
      <div className="hospital-container">
        <div className="hospital-btn-container">
          <Button onClick={goToAddHospital}>Add Hospital</Button>
        </div>
        <Table dataSource={hospitals} columns={columns} />
      </div>
    </AdminLayout>
  );
};
export default Listhospital;
