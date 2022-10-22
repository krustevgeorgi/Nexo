import React, {FC} from "react";
import "./styles.scss";
import Header from './Header';
import Body from './Body';

const Layout: FC = () => {
    return (
        <div id='layout'>
            <Header/>
            <Body/>
        </div>
    )
}

export default Layout