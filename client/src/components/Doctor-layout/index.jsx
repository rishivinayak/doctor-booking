import { NavLink, useNavigate } from 'react-router-dom';
import './doctor-layout.css';

const DoctorLayout = ({ children, heading }) => {
  const onLogout = () => {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ID');
    localStorage.removeItem('ROLE');
    navigate('/doctor/login');
  };
  const navigate = useNavigate();
  return (
    <div className="doctor-layout">
      <div className="sidebar">
        <img className="img" src="/hospital-logo.jpg" alt="" />
        <div className="logo">
          <p>EasyDoc - Doctor</p>
        </div>

        <div className="menu">
          <p className="menu-head1">Pages</p>
          <div className="menu-container1">
            <NavLink className="menu-item" to="/doctor/dashboard">
              <i className="fa-solid fa-house"></i>
              Dashboard
            </NavLink>
            <NavLink className="menu-item" to="/doctor/schedule">
              <i className="fa-solid fa-calendar"></i>
              Schedule
            </NavLink>
            <NavLink className="menu-item" to="/doctor/patients">
              <i className="fa-solid fa-users"></i>
              Patients
            </NavLink>
            <NavLink className="menu-item" to="/doctor/profile">
              <i className="fa-solid fa-user"></i>
              Profile
            </NavLink>

            <p className="menu-head2">Others</p>
            <div className="menu-container2">
              <NavLink className="menu-item" to="/doctor/settings">
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

export default DoctorLayout;
