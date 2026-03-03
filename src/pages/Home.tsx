import { Box } from '@mui/material'
import { MarketPrices } from '@/components/home/MarketPrices'
import { Portfolio } from '@/components/home/Portfolio'
import { TransactionsList } from '@/components/home/TransactionsList'

export default function Home() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, pt: '0!important' }}>
      <Box sx={{ my: 0 }}>
        <MarketPrices />
        <Portfolio />
        <TransactionsList />
      </Box>
    </Box>
  )
}
