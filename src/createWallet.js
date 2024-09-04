const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

const testNetwork = bitcoin.networks.testnet;

//wallets fork HD
const path = `m/49'/1'/0'/0`;

//mnemonic
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//create wallet root HD
let root = bip32.fromSeed(seed, testNetwork);




//create account
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: testNetwork
}).address;

console.log(`Wallet address: ${btcAddress}`);
console.log(`Private Key: ${node.toWIF()}`);
console.log(`Seed: ${mnemonic}`);