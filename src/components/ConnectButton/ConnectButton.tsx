import React, {FC} from "react";
import './styles.scss'
import {ClipLoader} from "react-spinners";
import {ChevronRight} from "@material-ui/icons";

interface Props {
    visible: boolean;
    connecting: boolean;
    onClick: () => void;
}

const ConnectButton: FC<Props> = ({visible, connecting, onClick}) => {
    if (!visible) return null;

    return (
        <button disabled={connecting} onClick={onClick} id='connect-button'>
            {
                connecting
                    ? <>Connecting &nbsp;<ClipLoader size={12}/></>
                    : <>Connect <ChevronRight/></>
            }
        </button>
    )
}

export default ConnectButton