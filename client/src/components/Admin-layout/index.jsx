import { NavLink, useNavigate } from 'react-router-dom';
import './admin-layout.css';

const AdminLayout = ({ children, heading }) => {
  const onLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ID');
    localStorage.removeItem('ROLE');
    navigate('/admin/login');
  };
  const navigate = useNavigate();
  return (
    <div className="admin-layout">
      <div className="sidebar">
        <img className="img" src="/hospital-logo.jpg" alt="" />
        <div className="logo">
          <p>EasyDoc</p>
        </div>

        <div className="menu">
          <p className="menu-head1">Pages</p>
          <div className="menu-container1">
            <NavLink className="menu-item" to="/admin/home">
              <i className="fa-solid fa-house"></i>
              Home
            </NavLink>
            <NavLink className="menu-item" to="/admin/department">
              <i className="fa-solid fa-building"></i>
              Department
            </NavLink>
            <NavLink className="menu-item" to="/admin/hospital">
              <i className="fa-solid fa-hospital"></i>
              Hospital
            </NavLink>
            <NavLink className="menu-item" to="/admin/doctor">
              <i className="fa-solid fa-user-doctor"></i>
              Doctor
            </NavLink>
            <NavLink className="menu-item" to="/admin/profile">
              <i className="fa-solid fa-user"></i>
              Profile
            </NavLink>

            <p className="menu-head2">Others</p>
            <div className="menu-container2">
              <NavLink className="menu-item" to="/admin/settings">
                <i className="fa-solid fa-gear"></i>
                Settings
              </NavLink>
              <p onClick={onLogout} className="menu-item">
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="contentInner">
          <h1 className="heading">{heading}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};
export default AdminLayout;
