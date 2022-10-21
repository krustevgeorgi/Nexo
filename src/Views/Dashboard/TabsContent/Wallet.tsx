import React, {FC, useEffect, useState} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow} from "../../../components";
import {ethers} from "ethers";
import {getWethPrice} from "../../../RouterService.js";

// import
const Wallet: FC = () => {
    const {smallScreen, connection, wallet} = useSelector((state: State) => state.common);
    const [wethPrice, setWethPrice] = useState(0)

    useEffect(() => {
        const onLoad = async () => {
            const wethPrice = await getWethPrice()
            setWethPrice(wethPrice)
        }
        onLoad()
    }, [])



    return (
        <div id='wallet' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='ETH Balance' value={ethers.utils.formatEther(wallet!.ethBalance)}/>
            <DashboardRow title='WETH Balance' value={ethers.utils.formatEther(wallet!.wethBalance)}/>
            <DashboardRow title='WETH/USDC Price' value={wethPrice}/>
            <DashboardRow title='NEXO Balance' value={ethers.utils.formatEther(wallet!.nexoBalance)}/>
            {/*<WrapRow title='Address' value={connection?.address}/>*/}

        </div>
    )
}



export default Wallet;