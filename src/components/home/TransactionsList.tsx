import {
  Typography,
  Card,
  CardContent,
  Box,
  Skeleton,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { useTransactions } from '@/hooks/useTransactions'
import { useCryptoPrices } from '@/hooks/useCryptoPrices'
import { formatCurrency, formatNumber } from '@/utils/format'
import { useMemo, useState } from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import { EthereumIcon } from '@/components/icons/EthereumIcon'
import ErrorIcon from '@mui/icons-material/Error'

export function TransactionsList() {
  const { data: transactions, isLoading: isTxLoading, isError: isTxError, error: txError } = useTransactions()
  const { data: prices, isLoading: isPricesLoading, isError: isPricesError } = useCryptoPrices()

  const isLoading = isTxLoading || isPricesLoading

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [assetFilter, setAssetFilter] = useState<string>('all')

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const uniqueTypes = useMemo(() => {
    if (!transactions) return []
    return Array.from(new Set(transactions.map(tx => tx.type)))
  }, [transactions])

  const uniqueAssets = useMemo(() => {
    if (!transactions) return []
    return Array.from(new Set(transactions.map(tx => tx.asset.toLowerCase())))
  }, [transactions])

  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 140,
      renderCell: (params) => {
        const isCopied = copiedId === params.value
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
            <Typography variant="body2">{params.value}</Typography>
            <Tooltip title={isCopied ? "Copied!" : "Copy ID"}>
              <IconButton 
                size="small" 
                onClick={() => handleCopy(params.value as string)}
                sx={{ color: isCopied ? 'success.main' : 'text.secondary' }}
              >
                {isCopied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    },
    { 
      field: 'player', 
      headerName: 'Player', 
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
          <Typography variant="body2">{params.value}</Typography>
          <IconButton size="small" component="a" href='#' sx={{ color: 'text.secondary' }}>
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 130,
      renderCell: (params) => {
        const isDeposit = params.value === 'Deposit'
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Chip 
              label={params.value} 
              size="small" 
              color={isDeposit ? 'success' : 'error'} 
              variant="outlined"
              sx={{ fontWeight: 500 }}
            />
          </Box>
        )
      }
    },
    { 
      field: 'asset', 
      headerName: 'Asset', 
      width: 160, 
      renderCell: (params) => {
        const assetStr = String(params.value).toLowerCase()
        let Icon = AttachMoneyIcon
        let color = '#26A17B'
        
        if (assetStr === 'bitcoin' || assetStr === 'btc') {
          Icon = CurrencyBitcoinIcon
          color = '#F7931A'
        } else if (assetStr === 'ethereum' || assetStr === 'eth') {
          Icon = EthereumIcon
          color = '#627EEA'
        }

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', gap: 1 }}>
            <Box sx={{ display: 'flex', p: 0.5, borderRadius: '50%', bgcolor: `${color}15`, color }}>
              <Icon sx={{ fontSize: 16 }} />
            </Box>
            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
              {params.value}
            </Typography>
          </Box>
        )
      }
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      width: 130,
      renderCell: (params) => {
        return (
          <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', height: '100%' }}>
            {formatNumber(params.value)}
          </Typography>
        )
      }
    },
    {
      field: 'usdValue',
      headerName: 'USD Value',
      width: 150,
      renderCell: (params) => {
        return (
          <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center', height: '100%' }}>
            {formatCurrency(params.row.usdValue)}
            {isPricesError && (
              <Tooltip title="Error fetching crypto prices. Please try again later.">
                <IconButton size="small" sx={{ color: 'error.main' }}>
                  <ErrorIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
        )
      },
    },
  ]

  const rows = useMemo(() => {
    let filtered = transactions || []
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter)
    }
    
    if (assetFilter !== 'all') {
      filtered = filtered.filter(tx => tx.asset.toLowerCase() === assetFilter.toLowerCase())
    }

    return filtered.map((tx) => {
      let usdValue = 0
      if (prices && (prices as Record<string, any>)[tx.asset]) {
        usdValue = tx.amount * (prices as Record<string, any>)[tx.asset].usd
      }
      return {
        ...tx,
        usdValue,
      }
    })
  }, [transactions, prices, typeFilter, assetFilter])

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 3,
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" component="h2" fontWeight="700">
            Recent Transactions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: 120,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                }
              }}
            >
              <InputLabel id="type-filter-label">Type</InputLabel>
              <Select
                labelId="type-filter-label"
                value={typeFilter}
                label="Type"
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                {uniqueTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl 
              size="small" 
              sx={{ 
                minWidth: 120,
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'black',
                }
              }}
            >
              <InputLabel id="asset-filter-label">Asset</InputLabel>
              <Select
                labelId="asset-filter-label"
                value={assetFilter}
                label="Asset"
                onChange={(e) => setAssetFilter(e.target.value)}
                sx={{textTransform: 'capitalize'}}
              >
                <MenuItem value="all">All</MenuItem>
                {uniqueAssets.map(asset => (
                  <MenuItem key={asset} value={asset} sx={{ textTransform: 'capitalize' }}>
                    {asset}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {isTxError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error fetching transactions: {txError?.message || 'Something went wrong'}
          </Alert>
        )}

        <Box sx={{ height: 400, width: '100%', mt: 2 }}>
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ borderRadius: 2 }} />
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              disableRowSelectionOnClick
              getRowClassName={(params) => {
                return params.row.usdValue > 10000 ? 'high-value-row' : ''
              }}
              sx={{
                border: 0,
                '& .high-value-row': {
                  bgcolor: 'rgba(255, 193, 7, 0.1)', // Light yellow background
                  '&:hover': {
                    bgcolor: 'rgba(255, 193, 7, 0.2)',
                  },
                },
                '& .MuiDataGrid-cell': {
                  borderColor: 'divider',
                },
                '& .MuiDataGrid-columnHeaders': {
                  borderColor: 'divider',
                  borderBottom: 1
                },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
