import coingeckoApi from '@/lib/coingecko';

export interface CryptoPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  tether: { usd: number };
}

export const fetchCryptoPrices = async (): Promise<CryptoPrices> => {
  const response = await coingeckoApi.get<CryptoPrices>('/simple/price', {
    params: {
      ids: 'bitcoin,ethereum,tether',
      vs_currencies: 'usd',
    },
  });
  return response.data;
};
