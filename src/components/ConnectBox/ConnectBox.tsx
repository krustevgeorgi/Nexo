import React, {FC, useState} from "react";
import './styles.scss';
import {Info, CheckCircle, ChevronRight, LinkOff, ErrorSharp} from "@material-ui/icons";
import {AppButton, Modal} from '../'
import {useDispatch, useSelector} from "react-redux";
import {State} from "../../store";
import {setConnection, setProvider, setSigner, setWallet} from "../../store/common/actions";
import {useNavigate} from "react-router-dom";
import {ethers} from "ethers";
import {Connection as ConnectionType, Wallet} from '../../models'
import tokens from '../../utils/tokens'
import {ClipLoader} from "react-spinners";

const MetaMaskLink = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

const ConnectBox: FC = () => {
    const {connection} = useSelector((state: State) => state.common)
    const [loading, setLoading] = useState(false)
    const [invalidNetwork, setInvalidNetwork] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const connectAccount = async () => {
        setLoading(true)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()

        const network = await provider.getNetwork();

        if(network.chainId !== 1 && network.chainId !== 11155111) {
            setInvalidNetwork(true)
            setLoading(false)
            return
        }

        const connection: ConnectionType = {
            network: network.name,
            chainId: network.chainId,
        }

        const {WETH, UNI, NEXO} = tokens[connection.chainId]

        const wallet: Wallet = {
            address: await signer.getAddress(),
            ethBalance: await signer.getBalance(),
            wethBalance: await provider.getBalance(WETH.address),
            nexoBalance: await provider.getBalance(NEXO.address),
            uniBalance: await provider.getBalance(UNI.address),
        }

        dispatch(setConnection(connection))
        dispatch(setWallet(wallet))
        dispatch(setProvider(provider))
        dispatch(setSigner(signer))

        setLoading(false)
    }

    const disconnectAccount = () => {
        setLoading(true)
        dispatch(setConnection(null))
        dispatch(setWallet(null))
        dispatch(setProvider(null))
        dispatch(setSigner(null))
        setLoading(false)
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
            <AppButton visible={!connection && window.ethereum} loading={loading} onClick={connectAccount}>
                {loading ? <>Connecting &nbsp;<ClipLoader size={12}/></> : <>Connect &nbsp;<ChevronRight/></>}
            </AppButton>

            <AppButton visible={!!connection} loading={loading} onClick={disconnectAccount} style={{backgroundColor: '#d34242'}}>
                {loading ? <>Disconnecting &nbsp;<ClipLoader size={12}/></> : <>Disconnect  &nbsp;<LinkOff/></>}
            </AppButton>

            <Modal title='Invalid Network' text='Our app has been configured to work only with Ehtereum Mainnet and the Sepolia test network. To continue please switch to either network and try again.'
                   icon={<ErrorSharp style={{color: '#f6b149'}}/>} visible={invalidNetwork} onOk={() => setInvalidNetwork(false)}/>
        </div>
    )
}

export default ConnectBox;