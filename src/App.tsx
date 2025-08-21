import { useState } from 'react'
import TokenSelect from './components/TokenSelect'
import ResultDisplay from './components/ResultDisplay'
import { Container, InputGroup, Input } from './styles'
import { useGetTokenPrice } from './hooks/useGetTokenPrice'

const tokens = [
  { name: 'USDC', chainId: '1', symbol: 'USDC' },
  { name: 'USDT', chainId: '137', symbol: 'USDT' },
  { name: 'ETH', chainId: '8453', symbol: 'ETH' },
  { name: 'WBTC', chainId: '1', symbol: 'WBTC' },
]

export default function App() {
  const [usdAmount, setUsdAmount] = useState('')
  const [sourceToken, setSourceToken] = useState(tokens[0].symbol)
  const [targetToken, setTargetToken] = useState(tokens[1].symbol)

  const usd = parseFloat(usdAmount) || 0

  const sourceChainId =
    tokens.find((t) => t.symbol === sourceToken)?.chainId || '1'
  const targetChainId =
    tokens.find((t) => t.symbol === targetToken)?.chainId || '1'

  const sourceData = useGetTokenPrice(sourceToken, sourceChainId)
  const targetData = useGetTokenPrice(targetToken, targetChainId)

  const sourceAmount = usd / (sourceData.priceInfo?.unitPrice || 1)
  const targetAmount = usd / (targetData.priceInfo?.unitPrice || 1)

  // TODO: delete me
  console.log('sourceData: ', sourceData)
  console.log('targetData', targetData)

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
        loading={sourceData.isLoading || targetData.isLoading}
        error={sourceData.isError || targetData.isError}
      />
    </Container>
  )
}
