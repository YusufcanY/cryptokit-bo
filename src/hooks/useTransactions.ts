import { useQuery } from '@tanstack/react-query'
import {
  fetchTransactions,
  type Transaction,
} from '@/services/api/transactions'

export const useTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    refetchInterval: false,
    retry: false,
  })
}
