import { QueryClient, QueryClientProvider, type UseQueryResult } from '@tanstack/react-query'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../src/App'
import * as hooks from '../src/hooks/useGetTokens'
import * as priceHook from '../src/hooks/useGetTokenPrice'

import type { Token } from '../src/utils/api'

const fakeTokens = [
  { name: 'USD Coin', symbol: 'USDC', chainId: '1', address: '0x1' },
  { name: 'Ethereum', symbol: 'ETH', chainId: '8453', address: '0x2' },
]

const fakeTokenInfo = {
  name: 'USD Coin',
  symbol: 'USDC',
  address: '0x1',
  chain: '1',
  decimals: 6,
}

const fakePrice = { amount: 100, total: 100, unitPrice: 1 }

vi.spyOn(hooks, 'useGetTokens').mockReturnValue(({
  data: fakeTokens,
  error: null,
  isError: false,
  isLoading: false,
  isFetching: false,
  isSuccess: true,
  isIdle: false,
  refetch: vi.fn(),
  status: 'success',
} as unknown) as UseQueryResult<Token[], Error>)

vi.spyOn(priceHook, 'useGetTokenPrice').mockImplementation(() => ({
  tokenInfo: fakeTokenInfo,     
  priceInfo: fakePrice,
  isLoading: false,
  isError: false,
}))

describe('App', () => {
  it('renders and calculates token amounts', async () => {
    const queryClient = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    render(<App />, { wrapper })

    const input = screen.getByPlaceholderText(/Enter USD amount/i)
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: '50' } })

    const sourceSelect = screen.getByLabelText(/Source Token/i)
    const targetSelect = screen.getByLabelText(/Target Token/i)
    expect(sourceSelect).toBeInTheDocument()
    expect(targetSelect).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/50.00 USD/i)).toBeInTheDocument()
    })

    expect(screen.getByText(/50.000000 USDC/i)).toBeInTheDocument()
    expect(screen.getByText(/50.000000 ETH/i)).toBeInTheDocument()
  })
})
