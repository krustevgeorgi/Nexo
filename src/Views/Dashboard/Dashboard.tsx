import React, {FC, useState} from "react";
import './styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {ArrowForward, LinkOff} from "@material-ui/icons";
import {Navigate} from "react-router-dom";
import {Connection, Wallet, Operations} from "./TabsContent";
import {setConnection, setProvider, setSigner, setWallet} from "../../store/common/actions";
import {Modal} from "../../components";
import {ClipLoader} from "react-spinners";

const TABS = {
    CONNECTION: 'Connection',
    WALLET: 'Wallet',
    OPERATIONS: 'Operations'
}

const Dashboard: FC = () => {
    const {CONNECTION, WALLET, OPERATIONS} = TABS;
    const {connection} = useSelector((state: State) => state.common);
    const [selectedTab, setSelectedTab] = useState<string>(CONNECTION)
    const [disconnecting, setDisconnecting] = useState<boolean>(false)
    const dispatch = useDispatch()

    if (!connection) {
        return <Navigate to='/'/>
    }

    const disconnectAccount = () => {
        setDisconnecting(true)

        setTimeout(() => {
            dispatch(setConnection(null))
            dispatch(setWallet(null))
            dispatch(setProvider(null))
            dispatch(setSigner(null))
            setDisconnecting(false)
        }, 4000)
    }

    return (
        <div id='dashboard'>
            <div className='wrapper'>
                <h3>Welcome to our</h3>
                <h2>Dashboard</h2>

                <div id='panel'>
                    <div className='body'>
                        <div className='menu'>
                            <div className='primary-actions'>
                                <button onClick={() => setSelectedTab(CONNECTION)}
                                        className={selectedTab === CONNECTION ? 's' : ''}>
                                    Connection <ArrowForward/>
                                </button>

                                <button onClick={() => setSelectedTab(WALLET)}
                                        className={selectedTab === WALLET ? 's' : ''}>
                                    Wallet <ArrowForward/>
                                </button>

                                <button onClick={() => setSelectedTab(OPERATIONS)}
                                        className={selectedTab === OPERATIONS ? 's' : ''}>
                                    Operations <ArrowForward/>
                                </button>
                            </div>

                            <button onClick={disconnectAccount} className='disconnect'>
                                Disconnect <LinkOff/>
                            </button>
                        </div>
                        <div className='panel-content'>
                            {/*<div className='disconnect' onClick={disconnectAccount}><LinkOff /></div>*/}

                            {selectedTab === CONNECTION && <Connection/>}
                            {selectedTab === WALLET && <Wallet/>}
                            {selectedTab === OPERATIONS && <Operations/>}
                        </div>
                    </div>
                </div>
            </div>

            <Modal title='Disconnecting' text='Please wait while we disconnect you from the Ethereum network.'
                   icon={<ClipLoader size={28}/>} visible={disconnecting}/>
        </div>
    )
}

export default Dashboard;