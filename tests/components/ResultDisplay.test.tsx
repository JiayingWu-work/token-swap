import { render, screen } from '@testing-library/react'
import ResultDisplay from '../../src/components/ResultDisplay'

describe('ResultDisplay', () => {
  it('renders loading state', () => {
    render(
      <ResultDisplay
        usd={100}
        sourceAmount={1}
        sourceToken="ETH"
        targetAmount={2}
        targetToken="USDC"
        loading={true}
        error={false}
      />,
    )

    expect(screen.getByText(/loading prices/i)).toBeInTheDocument()
  })

  it('renders error state', () => {
    render(
      <ResultDisplay
        usd={100}
        sourceAmount={1}
        sourceToken="ETH"
        targetAmount={2}
        targetToken="USDC"
        loading={false}
        error={true}
      />,
    )

    expect(screen.getByText(/failed to fetch price info/i)).toBeInTheDocument()
  })

  it('renders result correctly when usd > 0', () => {
    render(
      <ResultDisplay
        usd={100}
        sourceAmount={0.5}
        sourceToken="ETH"
        targetAmount={80}
        targetToken="USDC"
        loading={false}
        error={false}
      />,
    )

    expect(
      screen.getByText(/0.500000 ETH = 100.00 USD = 80.000000 USDC/i),
    ).toBeInTheDocument()
  })

  it('renders prompt when usd is 0', () => {
    render(
      <ResultDisplay
        usd={0}
        sourceAmount={0}
        sourceToken="ETH"
        targetAmount={0}
        targetToken="USDC"
        loading={false}
        error={false}
      />,
    )

    expect(
      screen.getByText(/Enter an amount in USD to see conversion/i),
    ).toBeInTheDocument()
  })

  it('renders error when usd < 0', () => {
    render(
      <ResultDisplay
        usd={-50}
        sourceAmount={0}
        sourceToken="ETH"
        targetAmount={0}
        targetToken="USDC"
        loading={false}
        error={false}
      />,
    )

    expect(
      screen.getByText(/Please enter a positive numeric amount/i),
    ).toBeInTheDocument()
  })
})
