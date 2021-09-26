import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '95f981dca3mshbba30facd0eb582p1d03cfjsn3ba2f18ba36a'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => {
                console.log(coinId + ">>>>>>" + timeperiod)
                return createRequest(`/coin/${coinId}/history/${timeperiod}`)
            }
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery
} = cryptoApi