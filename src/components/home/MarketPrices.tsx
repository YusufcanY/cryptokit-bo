import {
  Typography,
  Box,
  Skeleton,
  Alert,
  Card,
  CardContent,
} from '@mui/material'
import { useCryptoPrices } from '@/hooks/useCryptoPrices'
import { formatCurrency } from '@/utils/format'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { EthereumIcon } from '@/components/icons/EthereumIcon'

export function MarketPrices() {
  const { data: prices, isLoading, isError, error } = useCryptoPrices()

  const PriceCard = ({
    title,
    price,
    icon: Icon,
    color,
  }: {
    title: string
    price: number | undefined
    icon: any
    color: string
  }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 3,
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        },
      }}
    >
      <CardContent
        sx={{ p: 3, textAlign: 'center', '&:last-child': { pb: 3 } }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            p: 1.25,
            borderRadius: '50%',
            bgcolor: `${color}15`,
            mb: 1.5,
          }}
        >
          <Icon sx={{ fontSize: 28, color: color }} />
        </Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          fontWeight="500"
          gutterBottom
        >
          {title}
        </Typography>

        {isLoading ? (
          <Skeleton
            variant="text"
            width="60%"
            height={40}
            sx={{ mx: 'auto' }}
          />
        ) : (
          <Typography
            variant="h4"
            component="div"
            fontWeight="700"
            color="text.primary"
            sx={{ fontSize: { xs: '1.5rem', md: '3rem' } }}
          >
            {price !== undefined ? formatCurrency(price) : '---'}
          </Typography>
        )}
      </CardContent>
    </Card>
  )

  return (
    <>
      <Typography variant="h4" component="h1" fontWeight="700" gutterBottom>
        Market Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Live cryptocurrency prices updated in real-time.
      </Typography>

      {isError && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          Error fetching crypto prices: {error?.message || 'Something went wrong'}
        </Alert>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <PriceCard
            title="Bitcoin (BTC)"
            price={prices?.bitcoin.usd}
            icon={CurrencyBitcoinIcon}
            color="#F7931A"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PriceCard
            title="Ethereum (ETH)"
            price={prices?.ethereum.usd}
            icon={EthereumIcon}
            color="#627EEA"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PriceCard
            title="Tether (USDT)"
            price={prices?.tether.usd}
            icon={AttachMoneyIcon}
            color="#26A17B"
          />
        </Box>
      </Box>
    </>
  )
}
