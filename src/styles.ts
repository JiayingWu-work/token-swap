import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  font-family: system-ui, sans-serif;
`

export const Card = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 420px;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #4d535cff;
  }
`

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000ff;
  text-align: center;
  margin-bottom: 24px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`

export const Input = styled.input`
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  color: #111827;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`

export const Select = styled.select`
  margin-left: 10px;
  padding: 8px 14px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  font-size: 1rem;
  color: #111827;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`

export const Result = styled.div`
  margin-top: 24px;
  text-align: center;
  padding: 4px;
  background: #f3f4f6;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
`

export const ErrorText = styled.div`
  margin-top: 24px;
  text-align: center;
  padding: 4px;
  background: #fee2e2;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  color: #dc2626;
`
