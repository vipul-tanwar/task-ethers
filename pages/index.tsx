import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const utils = ethers.utils;

const contractABI = [{
  inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
  name: 'tokenURI',
  outputs: [{ internalType: 'string', name: '', type: 'string' }],
  stateMutability: 'view',
  type: 'function',
}]


type Filter = {
  to: string,
  from: string,
  logs: string[]
}


export default function Home() {
  const network: string = "homestead";
  // const txsHash ="0xb5d06bf5fcc1087822c18c806a64132951e07b38881cd4a2c153f3b01c3de21f"
  const [txHash, setTxhash] = useState<string>("")
  const [recept, setRecept] = useState<Filter>()
  const [print, setPrint] = useState(false)
  const [address, setAddress] = useState({});

  const provider = new ethers.providers.AlchemyProvider(network, "iDF4TNmHPF9tk6IExx9ZSAS3BUAwWEes");
  const eventTransfer = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'


  async function callRecept() {
    let recept: object = await provider.getTransactionReceipt(txHash);
    setRecept(recept as Filter);
  }

  function getData(val: any) {
    const value: string = val.target.value;
    setTxhash(value);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ethers Js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='w-[820px]' >
          <h1 className='text-center text-2xl		'>NFT Transfer ( ERC-721 )</h1>
          <hr className='my-4' />
          <label htmlFor="">Enter Transaction Hash</label>
          <br />
          <input className='w-[100%] h-[40px] rounded my-3 p-2' type="text" onChange={getData} /><br />
          <button className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-1 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-2 ' onClick={() => { setPrint(true); callRecept(); }} >Get</button>
          {
            print ?
              <div>
                <h4 className='my-1' >From: {recept?.from}</h4>
                <h4 className='mb-4'> To: {recept?.to}</h4>
                {
                  recept?.logs.map((log: any, i: number) => {
                    console.log(log);
                    if (log.topics[0] === eventTransfer) {
                      let sendAddress = utils.defaultAbiCoder.decode(['uint256'], log.topics[1])[0]._hex;
                      let receverAddress = utils.defaultAbiCoder.decode(['uint256'], log.topics[2])[0]._hex;
                      let tokenNo = utils.defaultAbiCoder.decode(['uint256'], log.topics[3])[0]._hex;
                      let parseToken = parseInt(tokenNo, 16)
                      return (
                        <div key={i} className=" border p-2">
                          <h3>From : {sendAddress}  |  To: {receverAddress}</h3>
                          <h3>For ERC-721 Token ID [{parseToken}]</h3>
                        </div>
                      )
                
                    }
                  })
                }
              </div> : null
          }

        </div>

      </main>


    </div>
  )
}
