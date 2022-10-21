import React, {FC, ReactNode, useState} from "react";
import './styles.scss';
import {FileCopy} from "@material-ui/icons";
import {ArrowForward} from "@material-ui/icons";
import {ClipLoader} from 'react-spinners'

interface Props {
    title: string;
    value: string | ReactNode;
    noAnimation?: boolean;
    onGoClicked?: () => void;
    loading?: boolean;
}

const DashboardRow: FC<Props> = ({title, value, noAnimation, onGoClicked, loading}) => {
    const [copied, setCopied] = useState(false)

    const copyValue = () => {
        if (typeof value !== 'string') return;

        navigator.clipboard.writeText(value);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={`dashboard-row ${noAnimation ? '' : 'animate'}`} onClick={copyValue}>
            <div style={{flex: 1}}>
                <span className='title'>{title}</span>
                <span className='value'>{value}</span>
            </div>
            {
                (typeof value === 'string' && !onGoClicked)
                && <>{copied ? <span>Copied!</span> : <FileCopy className='copy'/>}</>
            }
            {
                onGoClicked &&
                <button disabled={loading} className='goBtn' onClick={onGoClicked}>
                    {loading ? <ClipLoader size={12}/> : <ArrowForward/>}
                </button>
            }
        </div>
    )
}
export default DashboardRow;