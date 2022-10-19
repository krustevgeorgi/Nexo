import React, {FC} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../store";
import {Connection} from '../../components'

const Home: FC = () => {
    const {smallScreen} = useSelector((state: State) => state.common)

    return (
        <div id='home' className={smallScreen ? 'm' : ''}>
            <div id='hero'>
                <Connection/>
            </div>
        </div>
    )
}

export default Home;