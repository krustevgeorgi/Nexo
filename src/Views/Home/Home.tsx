import React, {FC} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../store";
import {ConnectBox} from '../../components'

const Home: FC = () => {
    const {smallScreen} = useSelector((state: State) => state.common)

    return (
        <div id='home' className={smallScreen ? 'm' : ''}>
            <div id='hero'>
                <div id='connect-section'>
                    <div className='left'>
                        <h2>The Easy Way To</h2>
                        <h1>Track Your Crypto</h1>

                        <ConnectBox/>
                    </div>
                    <div className='right'>
                        <img alt='hero' src="https://nexo.io/media/pages/home/1dfad7c833-1661869165/nexo-app@2x.png"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;