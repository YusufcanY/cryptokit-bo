import api from '@/lib/axios'

export interface Transaction {
  id: string
  player: string
  asset: string
  amount: number
  type: string
}

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>('/transactions')
  return response.data
}
