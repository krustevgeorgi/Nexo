import React, {FC, useState} from "react";
import './styles.scss'

import logo from '../../assets/brand/logo.png'
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {useNavigate} from "react-router-dom";

const Header:FC = () => {
    const [menu, setMenu] = useState<boolean>(false)
    return (
        <div id='header' className='m'>
            <div className='content'>
                <a href='/'><img alt='brand-logo' src={logo}/></a>
                <span className='toggle' onClick={() => setMenu(!menu)}><Menu /></span>
                <HeaderMenu visible={menu} onClose={() => setMenu(false)}/>
            </div>
        </div>
    )
}


interface HeaderMenuProps {
    visible: boolean;
    onClose: () => void;
}

const HeaderMenu:FC<HeaderMenuProps> = ({visible, onClose}) => {
    const {connection} = useSelector((state: State) => state.common)
    const navigate = useNavigate()

    if(!visible) return null

    return (
        <div id='headerMenu' className={`${visible ? 'visible' : ''}`}>
            <div className='mask' onClick={onClose}/>
            <div className={`body ${visible ? 'visible' : ''}`}>
                <span onClick={() => navigate('/')}>Home</span>
                {connection &&  <span onClick={() => navigate('/dashboard')}>Dashboard</span>}
            </div>
        </div>
    )
}

export default Header;