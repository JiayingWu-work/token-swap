import { useQuery } from '@tanstack/react-query'
import { getTokenInfo, getTokenPrice, type TokenPrice, type TokenInfo, type Token } from '../utils/api'

export function useGetTokenPrice(token?: Token) {
  const infoQuery = useQuery<TokenInfo, Error>({
    queryKey: ['tokenInfo', token?.symbol],
    queryFn: () => getTokenInfo(token!.chainId, token!.symbol),
    enabled: !!token,
  })

  const priceQuery = useQuery<TokenPrice, Error>({
    queryKey: ['tokenPrice', token?.symbol],
    queryFn: () => getTokenPrice(token!.chainId, infoQuery.data!.address),
    enabled: !!infoQuery.data,
  })

  return {
    tokenInfo: infoQuery.data,
    priceInfo: priceQuery.data,
    isLoading: infoQuery.isLoading || priceQuery.isLoading,
    isError: infoQuery.isError || priceQuery.isError,
  }
}
