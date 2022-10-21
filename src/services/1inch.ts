import {SwapParams} from "../models";

const _1inch_url = 'https://api.1inch.io/v4.0/1'

export const generateSwapData = async (swapParams: SwapParams) => {
    try{
        const res = await fetch(`${_1inch_url}/swap?` + new URLSearchParams(getQueryString(swapParams)))
        if(res.status === 200) return await res.text();
    } catch(e) {
        console.log(e)
    }
}

const getQueryString = (params: any) => Object.keys(params).map(key => key + '=' + params[key]).join('&');