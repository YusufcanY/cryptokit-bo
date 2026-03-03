import { useQuery } from '@tanstack/react-query'
import { fetchPortfolio, type PortfolioAsset } from '@/services/api/portfolio'

export const usePortfolio = () => {
  return useQuery<PortfolioAsset[], Error>({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
    refetchInterval: false,
    retry: false,
  })
}
