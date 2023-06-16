import React,{ useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Images
import logo from '../../assets/logo.png';
import user from '../../assets/user.png';
import create from '../../assets/create.png';


// icons
import { BsXCircle } from "react-icons/bs";
import { BsGrid } from "react-icons/bs";


import { Model, Error } from '../index';

// internal import
import Style from './Navbar.module.css';
import { MessengerContext } from '../../context/MessengerContext';
import { images } from '@/next.config';

const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/",
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

  const [active, setactive] = useState(2);
  const [open, setopen] = useState(false);
  const [openModel, setopenModel] = useState(false);

  const { account, userName, connectWallet, createAccount, error } = useContext(MessengerContext)

  return (
    <div className={Style.Navbar}>
      <div className={Style.Navbar_box}>
        <div className={Style.Navbar_box_left}>
        <Image src={logo} alt='logo' width={50} height={50}/>
        </div>
        <div className={Style.Navbar_box_right}>
          <div className={Style.Navbar_box_right_menu}>
          {menuItems.map((el, i)=> (
            <div onClick={() => setactive(i + 1)} key={i + 1} className={`${Style.Navbar_box_right_menu_items} ${active == i+1 ? Style.active_btn : ""}`}>
              <Link className={Style.Navbar_box_right_menu_items_link} href={el.link}>
                {el.menu}
              </Link>
            </div>
          ))}
          </div>
          {/* mobile */}
          {open && (
            <div className={Style.Mobile_menu}>
            {menuItems.map((el, i)=> (
              <div onClick={() => setactive(i + 1)} key={1 + 1} className={`${Style.Mobile_menu_items} ${active == i+1 ? Style.active_btn : ""}`}>
                <Link className={Style.Mobile_menu_items_link} href={el.link}>
                  {el.menu}
                </Link>
              </div>
            ))}
            <p className={Style.Mobile_menu_btn}>
              <BsXCircle className={Style.icon} width={50} height={50} onClick={() => setopen(false)}/>
            </p>
            </div>
          )}

          {/* connect wallet */}
          <div className={Style.Navbar_box_right_connect}>
            {account == '' ? (
              <button onClick={() => connectWallet}>
                {""}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setopenModel(true)}>
                {""}
                {userName ? 
              <Image src={user} 
                  alt='Account image'
                  width={20}
                  height={20}
                />
                : <BsXCircle className={Style.icon}/>}
                {''}
                <small>{userName || 'Create Account'}</small>
              </button>
            )}
          </div>
          <div className={Style.Navbar_box_right_open} onClick={()=> setopen(true)}>
              <BsGrid />
          </div>
        </div>
      </div>

      {/* model component */}

      {openModel && (
        <div className={Style.modelBox}>
          <Model openModel={setopenModel}
            title='WELCOME TO'
            head='CHAT BUDDY'
            info='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam tempora consectetur eum excepturi debitis? Voluptatem neque itaque nisi distinctio impedit. At quod nostrum amet aspernatur. A iste ab laborum vero.'
            smallInfo = 'Kindley seclet your name.....'
            // images = {hero}
            functionName = {createAccount}
          />
        </div>
      )}
      {error == "" ? "" : <Error error={error}/>}
    </div>
  );
};

export default Navbar;
