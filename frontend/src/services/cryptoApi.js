import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '8c216131femsh2d6e367814a3e77p1cb4f2jsnfddc0660c506',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins'),
        }),
        getCrypto: builder.query({
            query: (data) => createRequest(`/coin/${data[0].uuid}`),
        }),
    }),
});

export const { useGetCryptosQuery, useGetCryptoQuery } = cryptoApi;
