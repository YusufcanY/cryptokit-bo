import api from '@/lib/axios'

export interface PortfolioAsset {
  id: string
  symbol: string
  balance: number
}

export const fetchPortfolio = async (): Promise<PortfolioAsset[]> => {
  const response = await api.get<PortfolioAsset[]>('/portfolio')
  return response.data
}
