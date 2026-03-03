import { useCallback, useEffect, useRef, useState } from 'react'
import type { CryptoPrices } from '@/services/api/crypto'
import type { TrendDirection } from '@/components/home/PriceCard'

const TREND_DISPLAY_DURATION = 5000
const COINS = ['bitcoin', 'ethereum', 'tether'] as const

export function usePriceTrends(
  prices: CryptoPrices | undefined,
  isLoading: boolean,
) {
  const prevPricesRef = useRef<CryptoPrices | null>(null)
  const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const [trends, setTrends] = useState<Record<string, TrendDirection>>({
    bitcoin: null,
    ethereum: null,
    tether: null,
  })

  const clearTrend = useCallback((coin: string) => {
    setTrends((prev) => ({ ...prev, [coin]: null }))
  }, [])

  useEffect(() => {
    if (!prices || isLoading) return

    const prev = prevPricesRef.current
    if (prev) {
      COINS.forEach((coin) => {
        const current = prices[coin].usd
        const previous = prev[coin].usd

        if (current === previous) return

        setTrends((t) => ({
          ...t,
          [coin]: current > previous ? 'up' : 'down',
        }))

        if (timersRef.current[coin]) clearTimeout(timersRef.current[coin])
        timersRef.current[coin] = setTimeout(
          () => clearTrend(coin),
          TREND_DISPLAY_DURATION,
        )
      })
    }

    prevPricesRef.current = prices
  }, [prices, isLoading, clearTrend])

  useEffect(() => {
    const timers = timersRef.current
    return () => Object.values(timers).forEach(clearTimeout)
  }, [])

  return trends
}
