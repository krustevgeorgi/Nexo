import React, {FC, useState} from "react";
import './styles.scss';
import {Info, CheckCircle} from "@material-ui/icons";
import {ConnectButton} from '../'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {setConnection, setProvider, setSigner, setWallet} from "../../store/common/actions";
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {Connection as ConnectionType, Wallet} from '../../models'
import tokens from '../../utils/tokens.js'

const MetaMaskLink = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

const ConnectBox: FC = () => {
    const {connection} = useSelector((state: State) => state.common)
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
            wethBalance: await provider.getBalance(tokens.SEPOLIA_WETH.address),
            nexoBalance: await provider.getBalance(tokens.SEPOLIA_NEXO.address),
            uniBalance: await provider.getBalance(tokens.SEPOLIA_UNI.address),
        }
debugger
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

export default ConnectBox;