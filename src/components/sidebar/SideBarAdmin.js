import "./SideBar.css";
import SideBarButton from "./SideBarButton";
import { IoHome } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import { BiSolidMusic } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function SideBarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('adminAuthToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/adminlogin');
    window.location.reload();
  };
  
  return (
    <div className="sidebar-container">
      <img src="samaalogo.svg" alt="logo" className="logo-img" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="profilelogo.png" alt="profile" className="profile-img" />
        <div>
          <div>Hello!</div>
          <div>ADMIN</div>
        </div>
      </div>

      <div>
        <SideBarButton title="Home" to="/adminhome" icon={<IoHome />} />
        <SideBarButton title="Analytics" to="/analytics" icon={<TbBrandGoogleAnalytics />} />
        <SideBarButton title="Users Data" to="/userdata" icon={<FaUsersLine />} />
        <SideBarButton title="Songs Data" to="/songsdata" icon={<BiSolidMusic />} />
      </div>
      <div>
        <SideBarButton title="Log Out" onClick={handleLogout} icon={<PiSignOutBold />} />
      </div>
    </div>
  );
}
