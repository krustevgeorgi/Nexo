import React, {FC} from "react";
import './styles.scss'
import {Home, Dashboard} from "../../Views";
import {useSelector} from "react-redux";
import {State} from "../../store";
import {Routes, Route} from "react-router-dom";

const Body: FC = () => {
    const {smallScreen} = useSelector((state: State) => state.common)

    return (
        <div id='body' className={smallScreen ? 'm' : ''}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Routes>
        </div>
    )
}

export default Body;