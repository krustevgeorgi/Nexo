import React, {FC, ReactNode, useState} from "react";
import './styles.scss';
import {CheckOutlined, FileCopy} from "@material-ui/icons";

interface Props {
    title: string;
    subTitle?: string;
}

const DashboardHeader: FC<Props> = ({title, subTitle}) => {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        if(typeof subTitle !== 'string') return;
        navigator.clipboard.writeText(subTitle as string);
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div id='dashboard-header'>
            <span className='title'>{title}</span>
            {
                subTitle && <span className='additional' onClick={copy}>
                    {subTitle} {copied ? <CheckOutlined /> : <FileCopy />}
                </span>
            }
        </div>
    )
}
export default DashboardHeader;