import { Component } from 'react'
import './index.css'

class Menu extends Component {
    render() {
        return (
            <div>
                <div className='divel'>
                    <div className='left'></div>
                    <b className='menuitem'>Shop</b>
                    <b className='menuitem'>Skills</b>
                    <b className='menuitem'>Stories</b>
                    <b className='menuitem'>About</b>
                    <b className='menuitem'>Contact Us</b>
                </div>
                <div className="hero" >
                    <h1 >Discover Your Products</h1>
                    <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                </div>
            </div>
        )
    }
}

export default Menu