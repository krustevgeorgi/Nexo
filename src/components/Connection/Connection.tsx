import React, {FC, useState} from "react";
import './styles.scss';
import {ChevronRight, Info, CheckCircle} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {setConnection} from "../../store/common/actions";
import {ClipLoader} from 'react-spinners'
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {Connection as ConnectionType} from '../../models'

const MetaMaskLink = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';
const NexoContractAddress = '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206';

const provider = new ethers.providers.Web3Provider(window.ethereum)
let signer;
interface Props {
}

const Connection: FC<Props> = () => {
    const {connection} = useSelector((state: State) => state.common)
    const [connecting, setConnecting] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const connectAccount = async () => {
        setConnecting(true)


        await provider.send('eth_requestAccounts', [])
        signer = await provider.getSigner()

        const connection: ConnectionType = {
            address: await signer.getAddress(),
            network: (await provider.getNetwork()).name,
            ethBalance: ethers.utils.formatEther((await signer.getBalance())),
            nexoBalance: await provider.getBalance(NexoContractAddress) + ''
        }

        dispatch(setConnection(connection))

        console.log(connection)

        setConnecting(false)
    }

    return (
        <div id='connect-section'>
            <div className='left'>
                <h2>The Easy Way To</h2>
                <h1>Track Your Crypto</h1>
                <div className='call-to-action'>
                    {/* icon */}
                    {!connection ? <Info/> : <CheckCircle className='check'/>}

                    {/* title */}
                    <p className='title'>
                        {
                            !connection
                                ? 'Start by connection your MetaMask wallet'
                                : 'You are connected to your MetaMask wallet'
                        }
                    </p>

                    {/* text */}
                    <p className='instructions'>
                        {
                            !connection
                                ? <>Make sure you have MetaMask installed, you can get the free browser extension <a
                                    rel="noreferrer" target='_blank' href={MetaMaskLink}>here</a>.</>
                                : <>To check your balance and manage your wallet go to the&nbsp;
                                    <span onClick={() => navigate('/dashboard')}>nexo dashboard</span></>
                        }
                    </p>

                    {/* call to action*/}
                    <ConnectButton visible={!connection && window.ethereum} connecting={connecting}
                                   onClick={connectAccount}/>
                </div>
            </div>
            <div className='right'>
                <img alt='hero' src="https://nexo.io/media/pages/home/1dfad7c833-1661869165/nexo-app@2x.png"/>
            </div>
        </div>
    )
}

interface ConnectButtonProps {
    visible: boolean;
    connecting: boolean;
    onClick: () => void;
}

const ConnectButton: FC<ConnectButtonProps> = ({visible, connecting, onClick}) => {
    if (!visible) return null;

    return (
        <button disabled={connecting} onClick={onClick}>
            {
                connecting
                    ? <>Connecting &nbsp;<ClipLoader size={12}/></>
                    : <>Connect <ChevronRight/></>
            }
        </button>
    )
}

export default Connection;