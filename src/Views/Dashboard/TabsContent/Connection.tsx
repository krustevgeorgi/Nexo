import React, {FC} from "react";
import '../styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardHeader, DashboardRow} from "../../../components";

const Connection: FC = () => {
    const {connection} = useSelector((state: State) => state.common);

    return (
        <>
            <DashboardHeader title='Connection'/>
            <div id='connection' className='data'>
                <DashboardRow title='Status' value={<><span className='green-dot'/> Connected</>}/>
                <DashboardRow title='Network' value={connection?.network}/>
                <DashboardRow title='Chain ID' value={connection?.chainId}/>
            </div>
        </>
    )
}


export default Connection;