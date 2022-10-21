import React, {FC} from "react";
import './styles.scss'

interface Props {
    onChange: (val: string) => void;
    value: string;
    balance?: any;
}

const RowInput: FC<Props> = ({onChange, value, balance}) => {
    return (
        <div className='row-input'>
            {balance && <span className='balance' onClick={() => onChange(balance)}>Available {balance}</span>}
            <input placeholder='0.0' value={value} type='number'
                   onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default RowInput;