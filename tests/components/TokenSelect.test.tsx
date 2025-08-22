import { render, screen, fireEvent } from '@testing-library/react'
import TokenSelect from '../../src/components/TokenSelect'

const tokens = [
  { name: 'USD Coin', symbol: 'USDC', chainId: '1', address: '0x1' },
  { name: 'Ethereum', symbol: 'ETH', chainId: '1', address: '0x2' },
]

describe('TokenSelect', () => {
  it('renders all options', () => {
    render(
      <TokenSelect
        label="Source Token"
        value="USDC"
        onChange={() => {}}
        tokenList={tokens}
      />,
    )

    expect(screen.getByText('USD Coin')).toBeInTheDocument()
    expect(screen.getByText('Ethereum')).toBeInTheDocument()
  })

  it('calls onChange when selecting a new token', () => {
    const onChange = vi.fn()
    render(
      <TokenSelect
        label="Source Token"
        value="USDC"
        onChange={onChange}
        tokenList={tokens}
      />,
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ETH' } })
    expect(onChange).toHaveBeenCalledWith('ETH')
  })
})
