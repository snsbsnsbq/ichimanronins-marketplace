import logo from '../imgs/logo.svg'
import discord from '../imgs/discord-brands.svg'
import twitter from '../imgs/twitter-brands.svg'
import instagram from '../imgs/instagram-brands.svg'
import opensea from '../imgs/opensea-brands.svg'
import { useEffect } from 'react'

function Header({ scrollY }) {

   return (
      <header style={scrollY !== 0 ? { top: 0 } : { top: '0.1rem' }}>
         <div className="header__logo">
            <a href="#"><img src={logo} alt="logo" /></a>
         </div>
         <ul className="header__menu">
            <a href="#about"><li className="header__menu__item">About</li></a>
            <a href="#roadmap"><li className="header__menu__item">Roadmap</li></a>
            <a href="#faq"><li className="header__menu__item">Faq</li></a>
            <a href="#team"><li className="header__menu__item">Team</li></a>
         </ul>
         <div className="header__socials">
            <a href="#" target="_blank"><img src={discord} className="fab fa-discord"></img></a>
            <a href="https://twitter.com/IchimanR" target="_blank"><img src={twitter} className="fab fa-twitter"></img></a>
            <a href="https://opensea.io/" target="_blank"><img src={opensea} className="fab fa-opensea"></img></a>
            <a href="https://instagram.com/ichimanronins?utm_medium=copy_link" target="_blank"><img src={instagram} className="fab fa-instagram"></img></a>
            {/* <a href="#"><i className="icon-opensea"><span className="path1"></span><span className="path2"></span><span className="path3"></span></i></a> */}
         </div>
      </header>
   );
}

export default Header;
