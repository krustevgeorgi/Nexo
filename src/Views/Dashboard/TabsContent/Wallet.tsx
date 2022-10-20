import React, {FC} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow} from "../../../components";
import {ethers} from "ethers";

const Wallet: FC = () => {
    const {smallScreen, connection} = useSelector((state: State) => state.common);

    return (
        <div id='wallet' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='ETH Balance' value={ethers.utils.formatEther(connection!.ethBalance)}/>
            <DashboardRow title='WETH Balance' value={ethers.utils.formatEther(connection!.wethBalance)}/>
            <DashboardRow title='NEXO Balance' value={ethers.utils.formatEther(connection!.nexoBalance)}/>
            {/*<WrapRow title='Address' value={connection?.address}/>*/}

        </div>
    )
}

export default Wallet;