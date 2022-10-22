import React, {FC, useState} from "react";
import '../styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardHeader, DashboardRow, Modal, RowInput} from "../../../components";
import {ethers} from "ethers";
import weth from '../../../WETH.json'
import {CheckCircle} from "@material-ui/icons";
import {ClipLoader} from "react-spinners";
import {Wallet} from "../../../models";
import {setWallet} from "../../../store/common/actions";
import tokens from '../../../utils/tokens'
import axios from "axios";

const etherscan = 'https://sepolia.etherscan.io/'

const Operations: FC = () => {
    const {signer, provider, wallet, connection} = useSelector((state: State) => state.common);
    const [ethToWrap, setEthToWrap] = useState<string>('0')
    const [wethToConvert, setWethToConvert] = useState<string>('0')
    const [processing, setProcessing] = useState<boolean>(false)
    const [lastTransaction, setLastTransaction] = useState<any>(null)
    const dispatch = useDispatch()
    const {WETH, UNI, NEXO} = tokens[connection!.chainId]

    const wrapEth = async () => {
        if (ethToWrap === '0' || !ethToWrap) return alert('Please enter amount larger than 0!')
        setProcessing(true)

        const wethContract = new ethers.Contract(WETH.address, weth.abi, signer!);

        const transaction = await wethContract.deposit({
            from: wallet!.address,
            value: ethers.utils.parseEther(ethToWrap)
        });

        const res = await transaction.wait();

        dispatch(setWallet({
            ...wallet,
            wethBalance: await provider!.getBalance(WETH.address),
            ethBalance: await signer!.getBalance(),
        } as Wallet))

        setProcessing(false)
        setLastTransaction(res)
    }

    const approve = async () => {
        try {
            const response = await axios.get(`https://api.1inch.exchange/v3.0/${connection!.chainId}/approve/calldata?tokenAddress=${WETH.address}&amount=${wethToConvert}`)
            if (response.data) {
                let data = response.data
                data.gas = 1000000
                data.from = wallet!.address
                const tx = await signer!.sendTransaction(data)
                if (!tx) {
                    console.log("Approval failed")
                    console.log(tx)
                }
            }
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
    }

    const swap = async () => {
        setProcessing(true)
        try {
            await approve()

            const response = await axios.get(`https://api.1inch.exchange/v3.0/${connection!.chainId}/swap?fromTokenAddress=${WETH.address}&toTokenAddress=${NEXO.address}&amount=${wethToConvert}&fromAddress=${wallet!.address}&slippage=1&disableEstimate=true`)
            if (response.data) {
                let data = response.data
                data.tx.gas = 1000000
                const tx = await signer!.sendTransaction(data.tx)
                if (tx) {
                    console.log("Swap Successfull! :)")
                }
            }
        } catch (err) {
            console.log(err)
            setProcessing(false)
        }
        setProcessing(false)
    }

    return (
        <>
            <DashboardHeader title='Operations'/>
            <div id='wallet' className='data'>
                <DashboardRow title='Convert your ETH to WETH' noAnimation onGoClicked={wrapEth}
                              loading={processing}
                              value={
                                  <RowInput value={ethToWrap} onChange={setEthToWrap}
                                            balance={ethers.utils.formatEther(wallet!.ethBalance)}
                                  />
                              }/>

                <DashboardRow title='Convert WETH to NEXO' noAnimation onGoClicked={swap} loading={processing}
                              value={
                                  <RowInput value={wethToConvert}
                                            balance={ethers.utils.formatEther(wallet!.wethBalance)}
                                            onChange={setWethToConvert}
                                  />
                              }/>

                <Modal title='Processing' text='Please wait while we process your transaction.'
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
        </>
    )
}

export default Operations;