import React, {FC, useState} from "react";
import '../styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow, Modal, RowInput} from "../../../components";
import {ethers} from "ethers";
import WETH from '../../../WETH.json'
import {CheckCircle} from "@material-ui/icons";
import {ClipLoader} from "react-spinners";
import {SwapParams, Wallet} from "../../../models";
import {generateSwapData} from "../../../services/1inch";
import {setWallet} from "../../../store/common/actions";
import tokens from '../../../utils/tokens.js'

const etherscan = 'https://sepolia.etherscan.io/'

const Operations: FC = () => {
    const {smallScreen, signer, provider, wallet} = useSelector((state: State) => state.common);
    const [ethToWrap, setEthToWrap] = useState<string>('0')
    const [wethToConvert, setWethToConvert] = useState<string>('0')
    const [processing, setProcessing] = useState<boolean>(false)
    const [lastTransaction, setLastTransaction] = useState<any>(null)
    const dispatch = useDispatch()

    const wrapEth = async () => {
        if (ethToWrap === '0' || !ethToWrap) return alert('Please enter amount larger than 0!')
        setProcessing(true)

        const wethContract = new ethers.Contract(tokens.SEPOLIA_WETH.address, WETH.abi, signer!);

        const transaction = await wethContract.deposit({
            from: wallet!.address,
            value: ethers.utils.parseEther(ethToWrap)
        });

        const res = await transaction.wait();

        dispatch(setWallet({
            ...wallet,
            wethBalance: await provider!.getBalance(tokens.SEPOLIA_WETH.address),
            ethBalance: await signer!.getBalance(),
        } as Wallet))

        setProcessing(false)
        setLastTransaction(res)
    }

    const convert = async () => {
        if (wethToConvert === '0' || !wethToConvert) return alert('Please enter amount larger than 0!')
        setProcessing(true)

        const params: SwapParams = {
            fromTokenAddress: tokens.SEPOLIA_WETH.address,
            toTokenAddress: tokens.SEPOLIA_UNI.address,
            amount: ethers.utils.parseUnits(wethToConvert, "ether") + '',
            fromAddress: wallet!.address,
            slippage: '1'
        }

        const res = await generateSwapData(params);
        setProcessing(false)
    }

    return (
        <div id='wallet' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='Convert your ETH to WETH' noAnimation onGoClicked={wrapEth} loading={processing} value={
                <RowInput value={ethToWrap} onChange={setEthToWrap}
                             balance={ethers.utils.formatEther(wallet!.ethBalance)}
                />
            }/>

            <DashboardRow title='Convert WETH to UNI' noAnimation onGoClicked={convert} loading={processing} value={
                <RowInput value={wethToConvert} balance={ethers.utils.formatEther(wallet!.wethBalance)}
                          onChange={setWethToConvert}
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

export default Operations;