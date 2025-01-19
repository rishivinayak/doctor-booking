import './add.css';
import AdminLayout from '../../../../components/Admin-layout';
import { Button, Input } from 'antd';
const { TextArea } = Input;
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../utils/axios';
const Add = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: '',
    image: '',
    about: '',
  });
  const onChange = (e, key) => {
    setDepartment({ ...department, [key]: e.target.value });
  };
  const onUploadImage = async e => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append('avatar', e.target.files[0]);
    try {
      const response = await axios.post('/upload/', formData);
      console.log(response);
      setDepartment({ ...department, image: response.data.url });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
  const onAddDepartment = async () => {
    try {
      const response = await axios.post('/department', department);
      console.log(response);
      navigate('/admin/department');
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <AdminLayout heading="Add Department">
      <ToastContainer />
      <div className="add-departmen-form">
        <div className="input-container">
          <label>Name</label>
          <Input onChange={e => onChange(e, 'name')} />
        </div>
        <div className="input-container">
          <label>About</label>
          <TextArea rows={5} onChange={e => onChange(e, 'about')} />
        </div>
        <div className="input-container">
          <label>Image</label>
          <Input onChange={onUploadImage} type="file" />
        </div>
        <Button onClick={onAddDepartment}>Add</Button>
      </div>
    </AdminLayout>
  );
};
export default Add;
