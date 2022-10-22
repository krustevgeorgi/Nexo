import React, {FC, useEffect, useState} from "react";
import './styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow, DashboardHeader} from "../../../components";
import {ethers} from "ethers";
import {getWethPrice} from "../../../utils";

// import
const Wallet: FC = () => {
    const {wallet, connection} = useSelector((state: State) => state.common);
    const [wethPrice, setWethPrice] = useState(0)

    useEffect(() => {
        const onLoad = async () => {
            const wethPrice = await getWethPrice(connection!.chainId)
            setWethPrice(wethPrice)
        }
        onLoad()
    }, [connection])


    return (
        <>
            <DashboardHeader title='Wallet' subTitle={wallet!.address}/>
            <div id='wallet' className='data'>
                <DashboardRow title='ETH Balance' value={ethers.utils.formatEther(wallet!.ethBalance)}/>
                <DashboardRow title='WETH Balance' value={ethers.utils.formatEther(wallet!.wethBalance)}/>
                <DashboardRow title='WETH/USDC Price' value={wethPrice}/>
                <DashboardRow title='NEXO Balance' value={ethers.utils.formatEther(wallet!.nexoBalance)}/>
                <DashboardRow title='UNI Balance' value={ethers.utils.formatEther(wallet!.uniBalance)}/>
            </div>
        </>
    )
}


export default Wallet;