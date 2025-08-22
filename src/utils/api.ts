import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from '@funkit/api-base'

/** --- Types --- */

export interface Token {
  name: string
  symbol: string
  chainId: string
  address: string
}

export interface RawToken {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
}

export interface TokenInfo {
  address: string
  chain: string
  decimals: number
  name: string
  symbol: string
}

export interface TokenPrice {
  amount: number
  total: number
  unitPrice: number
}

/** --- API Key --- */

const API_KEY = import.meta.env.VITE_FUNKIT_API_KEY || ''

/** --- API Wrappers --- */

export async function fetchTokens(): Promise<RawToken[]> {
  const res = await fetch('https://tokens.coingecko.com/uniswap/all.json')
  if (!res.ok) throw new Error('Failed to fetch tokens')

  const data = await res.json()
  return data.tokens as RawToken[]
}

export async function getTokenInfo(
  chainId: string,
  symbol: string,
): Promise<TokenInfo> {
  return getAssetErc20ByChainAndSymbol({ chainId, symbol, apiKey: API_KEY })
}

export async function getTokenPrice(
  chainId: string,
  tokenAddress: string,
): Promise<TokenPrice> {
  return getAssetPriceInfo({
    chainId,
    assetTokenAddress: tokenAddress,
    apiKey: API_KEY,
  })
}
