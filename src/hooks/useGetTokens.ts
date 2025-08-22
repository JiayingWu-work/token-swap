import { useQuery } from '@tanstack/react-query';
import { fetchTokens, type Token } from '../utils/api';

export function useGetTokens() {
  return useQuery<Token[], Error>({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
