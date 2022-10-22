import React, {CSSProperties, FC, ReactNode} from "react";
import './styles.scss'

interface Props {
    visible: boolean;
    loading: boolean;
    onClick: () => void;
    style?: CSSProperties;
    children: ReactNode;
}

const AppButton: FC<Props> = ({visible, loading, onClick, style, children}) => {
    if (!visible) return null;

    return (
        <button disabled={loading} onClick={onClick} id='app-button' style={style && style}>
            {children}
        </button>
    )
}

export default AppButton