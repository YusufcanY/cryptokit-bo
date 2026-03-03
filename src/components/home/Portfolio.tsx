import {
  Typography,
  Box,
  Skeleton,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import { useCryptoPrices } from '@/hooks/useCryptoPrices'
import { usePortfolio } from '@/hooks/usePortfolio'
import { PieChart } from '@mui/x-charts/PieChart'
import { formatCurrency } from '@/utils/format'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

export function Portfolio() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { data: prices, isLoading: isPricesLoading } = useCryptoPrices()
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    isError: isPortfolioError,
    error: portfolioError,
  } = usePortfolio()

  const portfolioData =
    portfolio?.map((asset) => {
      let priceItem = 0
      if (asset.id === 'bitcoin') priceItem = prices?.bitcoin.usd || 0
      else if (asset.id === 'ethereum') priceItem = prices?.ethereum.usd || 0
      else if (asset.id === 'tether') priceItem = prices?.tether.usd || 0

      return {
        id: asset.id,
        value: asset.balance * priceItem,
        label: asset.symbol.toUpperCase(),
      }
    }) || []

  const colorMap: Record<string, string> = {
    bitcoin: '#F7931A',
    ethereum: '#627EEA',
    tether: '#26A17B',
  }

  const pieChartData = portfolioData.map((item) => ({
    ...item,
    color: colorMap[item.id] || '#ccc',
  }))

  const totalPortfolioValue = portfolioData.reduce(
    (acc, item) => acc + item.value,
    0,
  )

  return (
    <Box sx={{ mt: 6, mb: 0 }}>
      <Typography variant="h4" component="h2" fontWeight="700" gutterBottom>
        Portfolio
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your current asset distribution and total balance.
      </Typography>

      {isPortfolioError && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          Error fetching portfolio:{' '}
          {portfolioError?.message || 'Something went wrong'}
        </Alert>
      )}

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          p: { xs: 2, md: 3 },
        }}
      >
        <CardContent sx={{ p: '0 !important' }}>
          {isPortfolioLoading || isPricesLoading ? (
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight="500"
                  gutterBottom
                >
                  Total Balance
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  fontWeight="700"
                  color="text.primary"
                  sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
                >
                  {formatCurrency(totalPortfolioValue)}
                </Typography>
              </Box>
              <Box sx={{ height: 300, flex: 1, width: '100%' }}>
                {pieChartData.length > 0 && totalPortfolioValue > 0 ? (
                  <PieChart
                    series={[
                      {
                        data: pieChartData,
                        highlightScope: {
                          fade: 'global',
                          highlight: 'item',
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: 'gray',
                        },
                        innerRadius: isMobile ? 40 : 60,
                        paddingAngle: 2,
                        cornerRadius: 4,
                      },
                    ]}
                    height={isMobile ? 350 : 300}
                    margin={{
                      left: isMobile ? 20 : 0,
                      right: isMobile ? 20 : 0,
                    }}
                    slotProps={{
                      legend: {
                        direction: (isMobile ? 'horizontal' : 'vertical'),
                        position: {
                          vertical: (isMobile ? 'bottom' : 'middle'),
                          horizontal: (isMobile ? 'center' : 'end'),
                        },
                      },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography color="text.secondary">
                      No portfolio data available.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}
