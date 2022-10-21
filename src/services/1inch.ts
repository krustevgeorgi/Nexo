import {SwapParams} from "../models";

const _1inch_url = 'https://api.1inch.io/v4.0/1'

export const generateSwapData = async (swapParams: SwapParams) => {
    const res = await fetch(`${_1inch_url}/swap?` + new URLSearchParams(getQueryString(swapParams)))
    if(res.status === 200) return await res.text();

    console.log(res)
}

const getQueryString = (params: any) => Object.keys(params).map(key => key + '=' + params[key]).join('&');