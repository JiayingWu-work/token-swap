import { useQuery } from '@tanstack/react-query'
import {
  getTokenInfo,
  getTokenPrice,
  type TokenInfo,
  type TokenPrice,
} from '../utils/api'

export function useGetTokenPrice(symbol: string, chainId: string) {

  const infoQuery = useQuery<TokenInfo, Error>({
    queryKey: ['tokenInfo', symbol],
    queryFn: () => getTokenInfo(chainId, symbol),
  })

  const priceQuery = useQuery<TokenPrice, Error>({
    queryKey: ['tokenPrice', symbol],
    queryFn: () => getTokenPrice(chainId, infoQuery.data!.address),
    enabled: !!infoQuery.data,
  })

  return {
    tokenInfo: infoQuery.data,
    priceInfo: priceQuery.data,
    isLoading: infoQuery.isLoading || priceQuery.isLoading,
    isError: infoQuery.isError || priceQuery.isError,
  }
}
