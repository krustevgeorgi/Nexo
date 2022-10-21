import { AlphaRouter } from '@uniswap/smart-order-router';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { ethers, BigNumber } from 'ethers';
import JSBI from 'jsbi';
import ERC20ABI from './abi.json';
import tokens from './tokens.js';
const {WETH, NEXO, USDC} = tokens;

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
const INFURA_TEST_NET_MAINNET = 'https://mainnet.infura.io/v3/f670a22158f34d708c6737aa8eda1835';

const chainId = 1

const web3Provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_NET_MAINNET)
const router = new AlphaRouter({ chainId: chainId, provider: web3Provider })

const WETH_TOKEN = new Token(chainId, WETH.address, WETH.decimals, WETH.symbol, WETH.name);
const NEXO_TOKEN = new Token(chainId, NEXO.address, NEXO.decimals, NEXO.symbol, NEXO.name);
const USDC_TOKEN = new Token(chainId, USDC.address, USDC.decimals, USDC.symbol, USDC.name);


export const getPrice = async (inputAmount, slippageAmount, deadline, walletAddress) => {
    const percentSlippage = new Percent(slippageAmount, 100)
    const wei = ethers.utils.parseUnits(inputAmount.toString(), WETH.decimals)
    const currencyAmount = CurrencyAmount.fromRawAmount(WETH_TOKEN, JSBI.BigInt(wei))

    const route = await router.route(
        currencyAmount,
        USDC_TOKEN,
        TradeType.EXACT_INPUT,
        {
            recipient: walletAddress,
            slippageTolerance: percentSlippage,
            deadline: deadline,
        }
    )


    const quoteAmountOut = route.quote.toFixed(6)
    const ratio = (inputAmount / quoteAmountOut).toFixed(3)

    return [
        quoteAmountOut,
        ratio
    ]
}
