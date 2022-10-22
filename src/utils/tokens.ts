import {Token} from "../models";

const tokens = {
    // MAIN NET
    '1':{
        WETH: {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            decimals: 18,
            address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
        } as Token,

        NEXO: {
            name: 'NEXO',
            symbol: 'NEXO',
            decimals: 18,
            address: '0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206'
        } as Token,

        UNI: {
            name: 'Uniswap',
            symbol: 'UNI',
            decimals: 18,
            address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
        } as Token,

        USDC: {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
        } as Token,
    },

    // SEPOLIA TEST NET
    '11155111': {
        WETH: {
            name: 'Wrapped Ether',
            symbol: 'WETH',
            decimals: 18,
            address: '0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa'
        } as Token,

        NEXO: {
            name: 'NEXO',
            symbol: 'NEXO',
            decimals: 18,
            address: '0xAf492c65f91f8245ddD47C5214742089B8Bf79a2'
        } as Token,

        UNI: {
            name: 'Uniswap',
            symbol: 'UNI',
            decimals: 18,
            address: '0x896836132D48fdB712C299640df863901825768a'
        } as Token,

        USDC: {
            name: 'USD Coin',
            symbol: 'USDC',
            decimals: 6,
            address: '0x51fCe89b9f6D4c530698f181167043e1bB4abf89'
        } as Token,
    },
} as any

export default tokens