import { useState, useEffect } from 'react'
import TokenSelect from './components/TokenSelect'
import ResultDisplay from './components/ResultDisplay'
import { Container, Card, Title, InputGroup, Input } from './styles'
import { useGetTokens } from './hooks/useGetTokens'
import { useGetTokenPrice } from './hooks/useGetTokenPrice'
import type { Token } from './utils/api'
import Loading from './components/Loading'

export default function App() {
  const [usdAmount, setUsdAmount] = useState('')
  const { data: tokens = [], isLoading: isTokensLoading } = useGetTokens()
  const [sourceToken, setSourceToken] = useState<Token | undefined>()
  const [targetToken, setTargetToken] = useState<Token | undefined>()

  useEffect(() => {
    if (tokens.length > 0 && !sourceToken && !targetToken) {
      setSourceToken(tokens[0])
      setTargetToken(tokens[1])
    }
  }, [tokens, sourceToken, targetToken])

  const usd = parseFloat(usdAmount) || 0

  const sourceData = useGetTokenPrice(sourceToken)
  const targetData = useGetTokenPrice(targetToken)

  const sourceAmount = usd / (sourceData.priceInfo?.unitPrice || 1)
  const targetAmount = usd / (targetData.priceInfo?.unitPrice || 1)

  if (isTokensLoading || !sourceToken || !targetToken) return <Loading />

  return (
    <Container>
      <Card>
        <Title>Token Price Explorer</Title>
        <InputGroup>
          <label>USD Amount</label>
          <Input
            type="number"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            placeholder="Enter USD amount"
          />
        </InputGroup>
        <TokenSelect
          label="Source Token"
          value={sourceToken.symbol}
          onChange={(symbol) =>
            setSourceToken(tokens.find((t) => t.symbol === symbol))
          }
          tokenList={tokens}
        />
        <TokenSelect
          label="Target Token"
          value={targetToken.symbol}
          onChange={(symbol) =>
            setTargetToken(tokens.find((t) => t.symbol === symbol))
          }
          tokenList={tokens}
        />
        <ResultDisplay
          usd={usd}
          sourceAmount={sourceAmount}
          sourceToken={sourceToken.symbol}
          targetAmount={targetAmount}
          targetToken={targetToken.symbol}
          loading={sourceData.isLoading || targetData.isLoading}
          error={sourceData.isError || targetData.isError}
        />
      </Card>
    </Container>
  )
}
