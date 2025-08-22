import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import * as api from '../../src/utils/api'
import { useGetTokens } from '../../src/hooks/useGetTokens'

const fakeTokens = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    chainId: 1,
    address: '0x1',
    decimals: 8,
  },
]

const expectedTokens = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    chainId: '1',
    address: '0x1',
  },
]

vi.spyOn(api, 'fetchTokens').mockResolvedValue(fakeTokens)

describe('useGetTokens', () => {
  it('fetches a token list', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useGetTokens(), { wrapper })

    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })

    expect(result.current.data).toEqual(expectedTokens)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBe(false)
  })
})
