import { InputGroup, Select } from '../styles'

interface Token {
  name: string
  symbol: string
  chainId: string
}

interface TokenSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  tokenList: Token[]
}

export default function TokenSelect({
  label,
  value,
  onChange,
  tokenList,
}: TokenSelectProps) {
  return (
    <InputGroup>
      <label>
        {label}:
        <Select value={value} onChange={(e) => onChange(e.target.value)}>
          {tokenList.map((t) => (
            <option key={t.symbol} value={t.symbol}>
              {t.name}
            </option>
          ))}
        </Select>
      </label>
    </InputGroup>
  )
}
