import React, {FC} from "react";
import './styles.scss'

import logo from '../../assets/brand/logo.png'
import {useSelector} from "react-redux";
import {State} from "../../store";
import {useNavigate} from "react-router-dom";

const HeaderD:FC = () => {
    const {connection} = useSelector((state: State) => state.common)
    const navigate = useNavigate()

    return (
        <div id='header'>
            <div className='content'>
                <div className='left'>
                    <img onClick={() => navigate('/')} alt='brand-logo' src={logo}/>
                </div>
                <div className='right'>
                    {connection && <span onClick={() => navigate('/dashboard')}>Dashboard</span>}
                    <span onClick={() => navigate('/')}>Home</span>
                </div>
            </div>
        </div>
    )
}

export default HeaderD;