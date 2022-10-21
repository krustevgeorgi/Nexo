import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import {ethers} from 'ethers';
import tokens from './tokens.js';
import univ3prices from '@thanpolas/univ3prices'

const {WETH, USDC} = tokens;
const INFURA_TEST_NET_MAINNET = 'https://mainnet.infura.io/v3/f670a22158f34d708c6737aa8eda1835';

const provider = new ethers.providers.JsonRpcProvider(INFURA_TEST_NET_MAINNET)

const poolAddress = '0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8'
const poolContract = new ethers.Contract(poolAddress, IUniswapV3PoolABI.abi, provider)

export const getWethPrice = async () => {
    const slot0 = await poolContract.slot0()
    const sqrtPriceX96 = slot0[0];

    return univ3prices([USDC.decimals, WETH.decimals], sqrtPriceX96).toAuto()
}