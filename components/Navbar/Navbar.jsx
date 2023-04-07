import React,{ useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Model, Error } from '../index';

// internal import
import Style from './Navbar.module.css';
import { MessengerContext } from '../../context/MessengerContext';
import image from '../../assets';

const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Setting",
      link: "/",
    },
    {
      menu: "FAQs",
      link: "/",
    },
  ];

  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(MessengerContext)
  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
          <Image src={image}/>
        </div>
        <div className={Style.Navbar_box_right}>
          {menuItems.map((el, i)=> (
            <div onClick={() => setActive(i + 1)} key={1 + 1} className={`${Style.Navbar_box_right_menu_items}`}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar;
