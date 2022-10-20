import React, {FC, useState} from "react";
import '../styles.scss';
import {useSelector} from "react-redux";
import {State} from "../../../store";
import {DashboardRow, Modal} from "../../../components";
import {ethers} from "ethers";
import {WETH_ADDRESS} from "../../../constants";
import WETH from '../../../WETH.json'
import {CheckCircle, CheckOutlined} from "@material-ui/icons";

const etherscan = 'https://sepolia.etherscan.io/'

const Operations: FC = () => {
    const {smallScreen, connection, provider, signer} = useSelector((state: State) => state.common);
    const [ethToConvert, setEthToConvert] = useState<string>('0')
    const [swapping, setSwapping] = useState<boolean>(false)
    const [lastTransaction, setLastTransaction] = useState<any>(null)

    const swap = async () => {
        if (ethToConvert === '0' || !ethToConvert) return alert('Please enter amount larger than 0!')
        setSwapping(true)
        const signer = await provider!.getSigner()
        const wethContract = new ethers.Contract(WETH_ADDRESS, WETH.abi, signer);
        try {
            const transaction = await wethContract.deposit({
                from: connection!.address,
                value: ethers.utils.parseEther(ethToConvert)
            });
            const res = await transaction.wait();
            console.log(res);
            setSwapping(false)
            setLastTransaction(res)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id='wallet' className={smallScreen ? 'm' : ''}>
            <DashboardRow title='Convert your ETH to WETH' noAnimation onGoClicked={swap} loading={swapping} value={
                <CustomInput value={ethToConvert} onChange={setEthToConvert}
                             balance={ethers.utils.formatEther(connection!.ethBalance)}
                />
            }/>
            <DashboardRow title='NEXO Balance' value={ethers.utils.formatEther(connection!.nexoBalance)}/>
            <Modal
                visible={true}
                icon={<CheckCircle/>}
                title='Transaction sent'
                onOk={() => setLastTransaction(null)}
                text={<>
                        You can see your transaction in the
                        <a href={`${etherscan}/tx/`}>block explorer</a>
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
            <input
                placeholder='0.0'
                value={value}
                type='number'
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Operations;