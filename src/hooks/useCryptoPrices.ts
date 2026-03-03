import { useQuery } from '@tanstack/react-query'
import { fetchCryptoPrices, type CryptoPrices } from '@/services/api/crypto'

export const useCryptoPrices = () => {
  return useQuery<CryptoPrices, Error>({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60000,
    retry: false,
  })
}
