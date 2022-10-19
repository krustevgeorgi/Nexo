import React, {FC} from 'react';
import './App.scss';
import {Provider} from "react-redux";
import Layout from "./Layout";
import {BrowserRouter} from "react-router-dom";

interface Props {
    store: any
}

const App: FC<Props> = ({store}) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <div id="app">
                    <Layout/>
                </div>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
