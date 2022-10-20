import React, {FC, ReactNode} from "react";
import './styles.scss';

interface Props {
    title: string;
    text: string | ReactNode;
    icon: ReactNode;
    onOk: () => void;
    visible: boolean;
}

const Modal: FC<Props> = ({title, text, icon, onOk, visible}) => {
    if(!visible) return null;

    return (
        <div id='modal'>
            <div className='mask'/>
            <div className='content'>
                {icon}
                <span className='title'>{title}</span>
                <span className='text'>{text}</span>
                <button onClick={onOk}>Ok</button>
            </div>
        </div>
    )
}

export default Modal;