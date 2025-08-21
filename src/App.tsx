import { useState } from 'react'
import TokenSelect from './components/TokenSelect'
import ResultDisplay from './components/ResultDisplay'
import { Container, InputGroup, Input } from './styles'

// TODO: replace hard coded tokens later
const tokens = [
  { name: 'USDC', chainId: '1', symbol: 'USDC' },
  { name: 'USDT', chainId: '137', symbol: 'USDT' },
  { name: 'ETH', chainId: '8453', symbol: 'ETH' },
  { name: 'WBTC', chainId: '1', symbol: 'WBTC' },
]

// TODO: replace this later
const mockPrices: Record<string, number> = {
  USDC: 1,
  USDT: 1,
  ETH: 1800,
  WBTC: 65000,
}

export default function App() {
  const [usdAmount, setUsdAmount] = useState('')
  const [sourceToken, setSourceToken] = useState(tokens[0].symbol)
  const [targetToken, setTargetToken] = useState(tokens[1].symbol)

  const usd = parseFloat(usdAmount) || 0

  // calculate amounts
  const sourceAmount = usd / (mockPrices[sourceToken] || 1)
  const targetAmount = usd / (mockPrices[targetToken] || 1)

  return (
    <Container>
      <h1>Token Price Explorer</h1>

      <InputGroup>
        <label>
          USD Amount:
          <Input
            type="number"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
          />
        </label>
      </InputGroup>

      <TokenSelect
        label="Source Token"
        value={sourceToken}
        onChange={setSourceToken}
        tokenList={tokens}
      />

      <TokenSelect
        label="Target Token"
        value={targetToken}
        onChange={setTargetToken}
        tokenList={tokens}
      />

      <ResultDisplay
        usd={usd}
        sourceAmount={sourceAmount}
        sourceToken={sourceToken}
        targetAmount={targetAmount}
        targetToken={targetToken}
      />
    </Container>
  )
}
