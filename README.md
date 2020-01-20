<p align="center">
  <img src="./src/assets/switch-logo.svg" width="220">
</p>
<h3 align="center">💸&ensp;Swap BTC, ETH, DAI and XRP in seconds. Keep your private keys private. 🔒</h3>

![Switch swap screen cropped](./docs/screenshots/swap-eth-btc-cropped.png)

<div align="center">

[![GitHub release](https://img.shields.io/github/release/Kava-Labs/switch.svg)](https://github.com/Kava-Labs/switch/releases/latest)
[![GitHub All Releases](https://img.shields.io/github/downloads/kava-labs/switch/total.svg)](https://github.com/Kava-Labs/switch/releases)
[![GitHub](https://img.shields.io/github/license/Kava-Labs/switch.svg)](https://github.com/Kava-Labs/switch/blob/master/LICENSE)
[![Discourse users](https://img.shields.io/discourse/https/forum.interledger.org/users.svg)](https://forum.interledger.org)
[![Twitter Follow](https://img.shields.io/twitter/follow/kava_labs.svg?label=Follow&style=social)](https://twitter.com/kava_labs)

</div>

Switch is an Interledger wallet enabling lightning-fast crypto swaps and complete self-custody of assets.

Load funds onto "cards," swap between them, and withdraw at your leisure. Only you have access to these funds, even while trading!

## Get Started

### 1. Download Switch

#### &raquo; [Mac](https://github.com/Kava-Labs/switch/releases/download/v0.2.2/Switch-mac-v0.2.2.dmg) | [Windows](https://github.com/Kava-Labs/switch/releases/download/v0.2.2/Switch-win-v0.2.2.exe) | [Linux](https://github.com/Kava-Labs/switch/releases/download/v0.2.2/Switch-linux-v0.2.2.AppImage) &laquo;

Switch will prompt you whether you want to use testnet mode or mainnet mode. To get started, we suggest selecting testnet (you can always switch to mainnet mode later).

### 2. Add cards

Add and deposit to a minimum of two cards to enable swapping. To get started on testnet, ETH, DAI or XRP are the simplest.

- **ETH**, **DAI**: Add an Ethereum card using a private key. You can generate a private key and address [here](https://vanity-eth.tk). Then, load the address with testnet ether from [the Kovan testnet faucet](https://faucet.kovan.network/).
- **XRP**: Add an XRP card using a XRP secret. If you don't have a testnet account, generate a prefunded account and secret from [the XRP testnet faucet](https://developers.ripple.com/xrp-test-net-faucet.html).
- **BTC**: To add a Lightning card, follow these [instructions](docs/lightning-setup.md).

Switch will prompt you to securely deposit funds onto your cards as you add them. Only you have access to these funds.

### 3. Swap!

Select a card to send, then click "Swap" and choose a card to receive. Enter the desired amount, and exchange crypto in seconds!

![Demo of XRP to ETH swap](./docs/screenshots/swap-xrp-eth.gif)

## How It Works

### Fast, non-custodial trading

When trading between assets, Switch will first send a very small amount of the source asset, the equivalent of \$0.10, to the exchange party known as the connector. Then, the connector sends some amount of the destination asset. If the connector upholds its side of the bargain and the exchange rate it provides is decent, we repeat the process. And again. And again; many times per second.

This is the model of streaming micropayments: moving value bit-by-bit until the entire payment or trade is complete.

If at any point the connector stops sending or sends us too little of the destination asset, we halt the exchange. This enables non-custodial trading, since the counterparty risk is merely a few cents, and comparable to that of atomic swaps.

[Payment channels](docs/faqs.md#what-is-layer-2-and-payment-channels) enable these payments to be cheap and very fast.

For this beta release, Switch uses a connector operated by Kava. But coming soon, we'll roll out support for user-defined connectors, and all the tools, infrastructure, and docs necessary to operate one yourself.

### [FAQs](docs/faqs.md)

### [How to setup swaps on Lightning](docs/lightning-setup.md)

### [What is layer 2? What are payment channels?](docs/faqs.md#what-is-layer-2-and-payment-channels)

### [What is Interledger?](docs/faqs.md#what-is-interledger)

## Developer Installation

```shell
> git clone https://github.com/kava-labs/switch
> cd switch
> npm install
> npm run serve
```

## Roadmap

- [x] Integration of the top three cryptocurrencies
- [x] Mainnet
- [x] Cards for ERC-20 tokens, such as DAI
- [ ] Custom connectors
- [ ] Peer-to-peer payments

## License

Copyright © Kava Labs, Inc. All rights reserved.

Licensed under the [Apache v2 License](LICENSE).
