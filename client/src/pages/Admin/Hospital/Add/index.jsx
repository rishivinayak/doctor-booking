import AdminLayout from '../../../../components/Admin-layout';
import { Button, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './add.css';

const { TextArea } = Input;

const AddHospital = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState({
    name: '',
    department: [],
    location: '',
    phonenumber: '',
    image: '',
    about: '',
  });

  const [departments, setDepartments] = useState([]);

  const getDepartment = async () => {
    const response = await axios.get('/department');
    const convertedData = response.data.map(item => {
      return { value: item._id, label: item.name };
    });
    setDepartments(convertedData);
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const onChange = (e, key) => {
    if (key == 'department') {
      setHospital({ ...hospital, department: e });
    } else setHospital({ ...hospital, [key]: e.target.value });
  };

  const onUploadImage = async e => {
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append('avatar', e.target.files[0]);
    try {
      const response = await axios.post('/upload', formData);
      setHospital({ ...hospital, image: response.data.url });
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const onAddHospital = async () => {
    try {
      await axios.post('/hospital', hospital);
      navigate('/admin/hospital');
    } catch (error) {
      toast.error(error.message || 'Failed to add hospital');
    }
  };

  return (
    <AdminLayout heading="Add Hospital">
      <ToastContainer />
      <div className="add-hospital-form">
        <div className="input-container">
          <label>Name</label>
          <input onChange={e => onChange(e, 'name')} />
        </div>

        <div className="input-container">
          <label>Departments</label>
          <Select
            mode="multiple"
            options={departments}
            onChange={e => onChange(e, 'department')}
          />
        </div>

        <div className="input-container">
          <label>Loaction</label>
          <input onChange={e => onChange(e, 'location')} />
        </div>

        <div className="input-container">
          <label>phoneNumber</label>
          <input onChange={e => onChange(e, 'phonenumber')} />
        </div>

        <div className="input-container">
          <label>Image</label>
          <input type="file" onChange={onUploadImage} />
        </div>

        <div className="input-container">
          <label>About</label>
          <TextArea rows={7} onChange={e => onChange(e, 'about')} />
        </div>
      </div>

      <div className="add-btn-container">
        <Button onClick={onAddHospital}>Add</Button>
      </div>
    </AdminLayout>
  );
};

export default AddHospital;
