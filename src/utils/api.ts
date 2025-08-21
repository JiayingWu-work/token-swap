import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from '@funkit/api-base'

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

const API_KEY = import.meta.env.VITE_FUNKIT_API_KEY || ''

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
