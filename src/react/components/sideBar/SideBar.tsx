import * as React from 'react';
import { ProSidebarProvider, Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  const navigate = useNavigate();
  const createBattleClick = () => {
    navigate('/create');
  };

  return (
  <ProSidebarProvider>
    <div style={({ height: "100vh", display: "flex" })}>
      <Sidebar style={{ height: "100vh" }}>
      <Menu>
        <MenuItem>
          <h2>PhotoWars</h2>
        </MenuItem>
  
        <MenuItem icon={<ExploreOutlinedIcon />}>Explore</MenuItem>
        <MenuItem icon={<PeopleOutlinedIcon />}>Open Competitions</MenuItem>
        <MenuItem icon={<EmojiEventsOutlinedIcon />}>Winners</MenuItem>
        <MenuItem icon={<NotificationsOutlinedIcon />}>Notifications</MenuItem>
        <MenuItem icon={<SearchOutlinedIcon />}>Search</MenuItem>
        <MenuItem icon={<AccountCircleOutlinedIcon />}>Profile</MenuItem>
        <MenuItem icon={<AddCircleOutlineIcon/>} onClick={createBattleClick}>Create Battle</MenuItem>
      </Menu>
      </Sidebar>
      <main>
      <h1 style={{ color: "white", marginLeft: "5rem" }}>
        React-Pro-Sidebar
      </h1>
      </main>
    </div>
  </ProSidebarProvider>
  );
}

export { SideBar };