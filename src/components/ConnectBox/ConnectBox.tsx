import React, {FC, useState} from "react";
import './styles.scss';
import {ChevronRight, Info, CheckCircle} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {setConnection, setProvider, setSigner, setWallet} from "../../store/common/actions";
import {ClipLoader} from 'react-spinners'
import {useNavigate} from "react-router-dom";
import {ethers, BigNumber} from "ethers";
import {Connection as ConnectionType, Wallet} from '../../models'
import {WETH_ADDRESS, XRP_ADDRESS} from "../../constants";

const MetaMaskLink = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';



interface Props {

}

const ConnectBox: FC<Props> = () => {
    const {connection, wallet} = useSelector((state: State) => state.common)
    const [connecting, setConnecting] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const connectAccount = async () => {
        setConnecting(true)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork();

        const connection: ConnectionType = {
            network: network.name,
            chainId: network.chainId,
        }

        const wallet: Wallet = {
            address: await signer.getAddress(),
            ethBalance: await signer.getBalance(),
            wethBalance: await provider.getBalance(WETH_ADDRESS),
            nexoBalance: await provider.getBalance(XRP_ADDRESS),
        }

        console.log(typeof provider)

        dispatch(setConnection(connection))
        dispatch(setWallet(wallet))
        dispatch(setProvider(provider))
        dispatch(setSigner(signer))

        setConnecting(false)

    }

    return (
        <div id='call-to-action'>
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

export default ConnectBox;