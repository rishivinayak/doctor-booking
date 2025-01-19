import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/privateroute';
import AddHospital from './pages/Admin/Hospital/Add';
import AddDepartment from './pages/Admin/Department/Add';
import Login from './pages/Admin/Login';
import ListDepartment from './pages/Admin/Department/List';
import ListHospital from './pages/Admin/Hospital/List';
import AdminLayout from './components/Admin-layout';
import DoctorSignup from './pages/Admin/Doctor';
import './App.css';
import Doctoradd from './pages/Doctor/Doctor-page/Add';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />} />
      <Route path="admin/login" element={<Login />} />
      <Route path="/doctor/page" element={<Doctoradd />} />

      <Route path="/admin" element={<PrivateRoute />}>
        <Route path="/admin/department" element={<ListDepartment />} />
        <Route path="/admin/add-department" element={<AddDepartment />} />
        <Route path="/admin/hospital" element={<ListHospital />} />
        <Route path="/admin/add-hospital" element={<AddHospital />} />
        <Route path="/admin/doctor" element={<DoctorSignup />} />
      </Route>
    </Routes>
  );
};
export default App;
