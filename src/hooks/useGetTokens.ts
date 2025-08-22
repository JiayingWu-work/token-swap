import { useQuery } from '@tanstack/react-query';
import { fetchTokens, type RawToken, type Token } from '../utils/api';
import { POPULAR_SYMBOLS } from '../constants/tokens';

export function useGetTokens() {
  return useQuery<Token[], Error>({
    queryKey: ['tokens'],
    queryFn: async () => {
      const allTokens: RawToken[] = await fetchTokens();

      return allTokens
        .filter((t) => POPULAR_SYMBOLS.includes(t.symbol))
        .map((t) => ({
          name: t.name,
          symbol: t.symbol,
          chainId: t.chainId.toString(),
          address: t.address,
        }));
      },
    
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });
}
