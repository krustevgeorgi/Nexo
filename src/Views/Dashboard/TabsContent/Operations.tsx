import React, {FC, useState} from "react";
import '../styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow, Modal} from "../../../components";
import {BigNumber, ethers} from "ethers";
import {XRP_ADDRESS, WETH_ADDRESS} from "../../../constants";
import WETH from '../../../WETH.json'
import {CheckCircle} from "@material-ui/icons";
import {ClipLoader} from "react-spinners";
import {SwapParams} from "../../../models";
import {generateSwapData} from "../../../services/1inch";

const etherscan = 'https://sepolia.etherscan.io/'

const Operations: FC = () => {
    const {smallScreen, connection, provider, wallet} = useSelector((state: State) => state.common);
    const [ethToWrap, setEthToWrap] = useState<string>('0')
    const [wethToConvert, setWethToConvert] = useState<string>('0')
    const [processing, setProcessing] = useState<boolean>(false)
    const [lastTransaction, setLastTransaction] = useState<any>(null)

    const wrapEth = async () => {
        if (ethToWrap === '0' || !ethToWrap) return alert('Please enter amount larger than 0!')
        setProcessing(true)
        const signer = await provider!.getSigner()
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH.abi, signer);
        try {
            const transaction = await wethContract.deposit({
                from: wallet!.address,
                value: ethers.utils.parseEther(ethToWrap),
            });

            const res = await transaction.wait();
            setProcessing(false)
            setLastTransaction(res)
        } catch (err) {
            debugger
            console.log(err);
        }
    }

    const convert = async () => {
        if (wethToConvert === '0' || !wethToConvert) return alert('Please enter amount larger than 0!')
        setProcessing(true)

        const params: SwapParams = {
            fromTokenAddress: WETH_ADDRESS,
            toTokenAddress: XRP_ADDRESS,
            amount: ethers.utils.parseUnits(wethToConvert, "ether") + '',
            fromAddress: wallet!.address,
            slippage: '1'
        }

        const res = await generateSwapData(params);
        debugger
        console.log(res)

        setProcessing(false)
    }

    return (
        <div id='wallet' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='Convert your ETH to WETH' noAnimation onGoClicked={wrapEth} loading={processing} value={
                <CustomInput value={ethToWrap} onChange={setEthToWrap}
                             balance={ethers.utils.formatEther(wallet!.ethBalance)}
                />
            }/>
            <DashboardRow title='Convert WETH to XRP' noAnimation onGoClicked={convert} loading={processing} value={
                <CustomInput value={wethToConvert} onChange={setWethToConvert}
                             balance={ethers.utils.formatEther(wallet!.wethBalance)}
                />
            }/>

            <Modal title='Converting' text='We are processing your transaction, please wait.'
                   icon={<ClipLoader size='18'/>} visible={processing}/>


            <Modal visible={lastTransaction} icon={<CheckCircle/>} title='Transaction sent'
                   onOk={() => setLastTransaction(null)}
                   text={<>
                       You can see your transaction in the&nbsp;
                       <a href={`${etherscan}/tx/${lastTransaction && lastTransaction.transactionHash}`}
                          target='_blank'>
                           block explorer
                       </a>
                   </>}
            />
        </div>
    )
}

interface CustomInputProps {
    onChange: (val: string) => void;
    value: string;
    balance?: any;
}

const CustomInput: FC<CustomInputProps> = ({onChange, value, balance}) => {
    return (
        <div className='row-input'>
            {balance && <span className='balance' onClick={() => onChange(balance)}>Total {balance}</span>}
            <input placeholder='0.0' value={value} type='number'
                   onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Operations;