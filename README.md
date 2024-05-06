# VDA Token Supply

A basic server that returns the number of VDA tokens:

## `/api/v1/circulating`

Total tokens currently circulating. Pulls the number of tokens released from the Magna smart contract and consolidates with other known token 

## `/api/v1/total`

Total token supply.

Always returns `1,000,000,000`.