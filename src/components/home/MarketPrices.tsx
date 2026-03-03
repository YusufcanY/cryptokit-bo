import { Typography, Box, Alert } from '@mui/material'
import { useCryptoPrices } from '@/hooks/useCryptoPrices'
import { usePriceTrends } from '@/hooks/usePriceTrends'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { EthereumIcon } from '@/components/icons/EthereumIcon'
import { PriceCard } from './PriceCard'

export function MarketPrices() {
  const { data: prices, isLoading, isError, error } = useCryptoPrices()
  const trends = usePriceTrends(prices, isLoading)

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
          Error fetching crypto prices:{' '}
          {error?.message || 'Something went wrong'}
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
            isLoading={isLoading}
            trend={trends.bitcoin}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PriceCard
            title="Ethereum (ETH)"
            price={prices?.ethereum.usd}
            icon={EthereumIcon}
            color="#627EEA"
            isLoading={isLoading}
            trend={trends.ethereum}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PriceCard
            title="Tether (USDT)"
            price={prices?.tether.usd}
            icon={AttachMoneyIcon}
            color="#26A17B"
            isLoading={isLoading}
            trend={trends.tether}
          />
        </Box>
      </Box>
    </>
  )
}
