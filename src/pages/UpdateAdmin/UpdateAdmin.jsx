import React, { useEffect, useRef, useState } from "react";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { db } from "../../firebase";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import Navbar from '../../components/Navbar'
import Pic from "../../imgs/pic.svg"
import './index.scss';

function UpdateAdmin() {

  const adminCollection = collection(db, "Admin_User");
  const numberOfAdmins = useRef(0);
  const [querySnapshot, setQuerySnapshot] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {

    const fetchAdminData = async () => {

      const snapshot = await getCountFromServer(adminCollection);
      numberOfAdmins.current = snapshot.data().count;
      
      const querySnapshot = await getDocs(adminCollection);
      setQuerySnapshot(querySnapshot);

    };
    fetchAdminData();
  },[adminCollection] );

  const handleClose = () => {
    setAnchorEl(null);
};

const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

  const adminRenderer =  () => {

    if(querySnapshot && querySnapshot.docs){

      return ( 
        <div className="admincontainer">
          {querySnapshot.docs.map((doc) => (
            <div className='eachadmin' key={ doc.id }>
            <img src={ doc.data().Pic } alt='adminq'/>
            <h3>{doc.data().Name}</h3>
            <BiDotsVerticalRounded size={ 35 }className='BiDotsVerticalRounded'/>
          </div>
          ))}
        </div>
      );
    } 
    return (
      <div className="admincontainer">
        <div className='eachadmin' key="unde">
          <img src={ Pic } alt='adminq'/>
          <h3>Loading...</h3>
          <BiDotsVerticalRounded size={ 35 } onClick={handleClick} className='BiDotsVerticalRounded' aria-controls="simple-menu"
                aria-haspopup="true"/>
        </div>
      </div>
    );
  }

  return (
    <div>
        <Navbar/>
        <div className='adminlist'>
          {adminRenderer()}
        </div>
        <Menu
                keepMounted
                anchorEl={anchorEl}
                onClose={handleClose}
                open={Boolean(anchorEl)}
            >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
    </div>
  )
}

export default UpdateAdmin