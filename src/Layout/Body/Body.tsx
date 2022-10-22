import React, {FC} from "react";
import './styles.scss'
import {Home, Dashboard} from "../../Views";
import {Routes, Route} from "react-router-dom";

const Body: FC = () => {
    return (
        <div id='body'>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default Body;