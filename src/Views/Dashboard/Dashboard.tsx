import React, {FC, ReactNode, useState} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../store";
import {ArrowForward} from "@material-ui/icons";
import {Navigate} from "react-router-dom";

const TABS = {
    CONNECTION: 'Connection',
    WALLET: 'Wallet',
    OPERATIONS: 'Operations'
}

const Dashboard: FC = () => {
    const {CONNECTION, WALLET, OPERATIONS} = TABS;
    const {smallScreen, connection} = useSelector((state: State) => state.common);
    const [selectedTab, setSelectedTab] = useState<string>(CONNECTION)

    if(!connection){
        return <Navigate to='/'/>
    }

    return (
        <div id='dashboard' className={smallScreen ? 'm' : ''}>
            <div className='wrapper'>
                <h3>Welcome to our</h3>
                <h2>Dashboard</h2>

                <div id='panel'>
                    <div className='body'>
                        <div className='menu'>
                            <button onClick={() => setSelectedTab(CONNECTION)} className={selectedTab === CONNECTION ? 's' : ''}>
                                Connection <ArrowForward />
                            </button>

                            <button onClick={() => setSelectedTab(WALLET)} className={selectedTab === WALLET ? 's' : ''}>
                                Wallet <ArrowForward />
                            </button>

                            <button onClick={() => setSelectedTab(OPERATIONS)} className={selectedTab === OPERATIONS ? 's' : ''}>
                                Operations <ArrowForward />
                            </button>
                        </div>
                        <div className='content'>
                            <div className='header'><span>{selectedTab}</span></div>

                            <div className='data'>
                                <Row title='Status' value={<><span className='green-dot'/> Connected</>} />
                                <Row title='Network' value={connection?.network} />
                                <Row title='Address' value={connection?.address} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>s
        </div>
    )
}

interface RowProps {
    title: string;
    value: string | ReactNode;
}

const Row:FC<RowProps> = ({title, value}) => {
    return (
        <div className='row'>
            <span className='title'>{title}</span>
            <span className='value'>{value}</span>
        </div>
    )
}

export default Dashboard;