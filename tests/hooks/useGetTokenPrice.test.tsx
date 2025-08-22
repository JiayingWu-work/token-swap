import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import * as api from '../../src/utils/api'
import { useGetTokenPrice } from '../../src/hooks/useGetTokenPrice'

const fakeToken = {
  name: 'USD Coin',
  symbol: 'USDC',
  chainId: '1',
  address: '0x1',
}

const fakeTokenInfo = {
  name: 'USD Coin',
  symbol: 'USDC',
  chain: '1',
  address: '0x1',
  decimals: 6,
}

const fakeTokenPrice = {
  amount: 100,
  total: 100,
  unitPrice: 1,
}

vi.spyOn(api, 'getTokenInfo').mockResolvedValue(fakeTokenInfo)
vi.spyOn(api, 'getTokenPrice').mockResolvedValue(fakeTokenPrice)

describe('useGetTokenPrice', () => {
  it('fetches token info and price', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetTokenPrice(fakeToken), {
      wrapper,
    })

    await waitFor(() => {
      expect(result.current.priceInfo).toBeDefined()
    })

    expect(result.current.tokenInfo).toEqual(fakeTokenInfo)
    expect(result.current.priceInfo).toEqual(fakeTokenPrice)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })

  it('does not fetch when token is undefined', () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result } = renderHook(() => useGetTokenPrice(undefined), {
      wrapper,
    })

    expect(result.current.tokenInfo).toBeUndefined()
    expect(result.current.priceInfo).toBeUndefined()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })
})
