import React, {FC, ReactNode, useState} from "react";
import './styles.scss';
import {FileCopy} from "@material-ui/icons";

interface Props {
    title: string;
    value: string | ReactNode;
}

const DashboardInputRow: FC<Props> = ({title, value}) => {
    const [copied, setCopied] = useState(false)

    const copyValue = () => {
        if(typeof value !== 'string') return;

        navigator.clipboard.writeText(value);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className='dashboard-input-row' onClick={copyValue}>
            <div>
                <span className='title'>{title}</span>
                <span className='value'>{value}</span>
            </div>
            {typeof value === 'string' && <>{copied ? <span>Copied!</span> : <FileCopy className='copy'/>}</> }
        </div>
    )
}
export default DashboardInputRow;