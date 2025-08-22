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
    return <Result>Loading prices...</Result>
  }

  if (error) {
    return <ErrorText>Failed to fetch price info.</ErrorText>
  }

  return (
    <>
      {usd < 0 || !Number(usd) ? (
        <ErrorText>Please enter a positive numeric amount</ErrorText>
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
