import React, {FC} from "react";
import '../styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow} from "../../../components";

const Connection: FC = () => {
    const {smallScreen, connection, wallet} = useSelector((state: State) => state.common);

    return (
        <div id='connection' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='Status' value={<><span className='green-dot'/> Connected</>}/>
            <DashboardRow title='Network' value={connection?.network}/>
            <DashboardRow title='Address' value={wallet?.address}/>
        </div>
    )
}


export default Connection;