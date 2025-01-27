import { Component } from "react";
import { IoLogoReact } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoBagRemoveOutline } from "react-icons/io5";

import './index.css'

class Header extends Component {
    render() {
        return (
            <div className='maindiv'>
                <div className="menu">
                    <IoLogoReact />
                </div>
                <div className="main">
                    <h2>LOGO</h2>
                </div>
                <div className="right">
                    <CiSearch />
                    <CiHeart />
                    <IoBagRemoveOutline />
                </div>
            </div>
        )
    }
}

export default Header