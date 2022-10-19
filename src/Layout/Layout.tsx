import React, {FC} from "react";
import "./styles.scss";
import HeaderD from './Header/HeaderD';
import HeaderM from './Header/HeaderM';
import Body from './Body';
import {useSelector} from "react-redux";
import {State} from "../store";

const Layout: FC = () => {
    const {smallScreen} = useSelector((state: State) => state.common)

    return (
        <div id='layout' className={`${smallScreen ? 'm' : ''}`}>
            {smallScreen ? <HeaderM/> : <HeaderD/>}
            <Body/>
            {/*<Footer/>*/}
        </div>
    )
}

export default Layout