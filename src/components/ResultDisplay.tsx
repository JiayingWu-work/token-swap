import { Result, ErrorText } from '../styles'

interface ResultDisplayProps {
  usd: number
  sourceAmount: number
  sourceToken: string
  targetAmount: number
  targetToken: string
  loading?: boolean
  error?: boolean
}

export default function ResultDisplay({
  usd,
  sourceAmount,
  sourceToken,
  targetAmount,
  targetToken,
  loading = false,
  error = false,
}: ResultDisplayProps) {
  if (loading) {
    return (
      <Result>
        <p>Loading prices...</p>
      </Result>
    )
  }

  if (error) {
    return (
      <ErrorText>
        <p>Failed to fetch price info.</p>
      </ErrorText>
    )
  }

  return (
    <>
      {usd < 0 ? (
        <ErrorText>
          <p>Please enter a positive numeric amount</p>
        </ErrorText>
      ) : (
        <Result>
          {usd > 0 ? (
            <p>
              {sourceAmount.toFixed(6)} {sourceToken} = {usd.toFixed(2)} USD ={' '}
              {targetAmount.toFixed(6)} {targetToken}
            </p>
          ) : (
            <p>Enter an amount in USD to see conversion</p>
          )}
        </Result>
      )}
    </>
  )
}
