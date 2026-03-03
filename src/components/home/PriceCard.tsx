import {
  Typography,
  Box,
  Skeleton,
  Card,
  CardContent,
  Fade,
} from '@mui/material'
import { formatCurrency } from '@/utils/format'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { type ElementType, useEffect, useState } from 'react'

export type TrendDirection = 'up' | 'down' | null

export const PriceCard = ({
  title,
  price,
  icon: Icon,
  color,
  isLoading,
  trend,
}: {
  title: string
  price: number | undefined
  icon: ElementType
  color: string
  isLoading: boolean
  trend: TrendDirection
}) => {
  // Keep the last non-null trend so the icon stays in the DOM during the fade-out
  const [displayedTrend, setDisplayedTrend] = useState<TrendDirection>(null)
  const show = trend !== null

  useEffect(() => {
    if (trend !== null) {
      setDisplayedTrend(trend)
    }
  }, [trend])

  const handleExited = () => {
    setDisplayedTrend(null)
  }

  const iconToRender = show ? trend : displayedTrend

  return (
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
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              component="div"
              fontWeight="700"
              color="text.primary"
              sx={{ fontSize: { xs: '1.5rem', md: '3rem' } }}
            >
              {price !== undefined ? formatCurrency(price) : '---'}
            </Typography>

            <Fade in={show} timeout={300} onExited={handleExited} unmountOnExit>
              <Box
                sx={{
                  position: 'absolute',
                  right: { xs: -28, md: -36 },
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {iconToRender === 'up' && (
                  <ArrowDropUpIcon
                    sx={{
                      fontSize: { xs: 28, md: 36 },
                      color: '#4caf50',
                      animation: 'bounce 0.5s ease-in-out',
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(-4px)' },
                      },
                    }}
                  />
                )}
                {iconToRender === 'down' && (
                  <ArrowDropDownIcon
                    sx={{
                      fontSize: { xs: 28, md: 36 },
                      color: '#f44336',
                      animation: 'bounce 0.5s ease-in-out',
                      '@keyframes bounce': {
                        '0%, 100%': { transform: 'translateY(0)' },
                        '50%': { transform: 'translateY(4px)' },
                      },
                    }}
                  />
                )}
              </Box>
            </Fade>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
