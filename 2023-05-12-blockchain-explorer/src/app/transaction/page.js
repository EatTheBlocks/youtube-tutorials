'use client';
import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

export default function Transaction() {
  const [txHash, setTxHash] = useState(undefined);
  const [tx, setTx] = useState(undefined);
  const [error, setError] = useState(false);
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_INFURA_URL
  );
  const search = async () => {
    setError(false);
    try {
      const tx = await provider.getTransaction(txHash);
      const receipt = await provider.getTransactionReceipt(txHash);
      tx.status = receipt.status;
      tx.txFee = BigInt(receipt.gasUsed) * BigInt(receipt.gasPrice);
      setTx(tx);
    } catch {
      setError(true);
    }
  }
  return (
    <div className='app-outer'>
      <div className='app-inner'>
        <div className='mt-4 p-4 bg-secondary text-white rounded'>
          <h1>EatTheBlocksScan</h1>
          <p>A Blockchain explorer for Ethereum. Made by <a style={{color: 'white'}} target='_blank' href='https://eattheblocks.com'>EatTheBlocks.</a></p>
        </div>
        <div className='input-group address-input mt-4'>
          <input 
            type='text' 
            className='form-control' 
            placeholder='0xH78oL4U...' 
            onChange={e => setTxHash(e.target.value)}
          />
          <button type='button' className='btn btn-primary' onClick={() => search()}>
            <i className='bi bi-search'></i>
          </button>
        </div>
        {error ? (
          <div  className='alert alert-warning mt-4'>
            We couldn't find the latest transaction you searched. Are you sure the tx hash is correct?
          </div>
        ) : null}
        {tx ? (
          <div className='mt-4'>
            <h2>Details of transaction</h2>
            <span className='fw-bold'>{tx.hash}</span>
            <ul className='list-group mt-3'>
              <li className='list-group-item'>
                <span className='fw-bold'>Status:</span> {tx.status === 1 ? (
                  <span className='badge bg-success'>Success</span>
                  ) : (
                  <span className='badge bg-danger'>Failed</span>
                  )}
              </li>
              <li className='list-group-item'>
                <span className='fw-bold'>From:</span> {tx.from}
              </li>
              <li className='list-group-item'>
                <span className='fw-bold'>To:</span> {tx.to}
              </li>
              <li className='list-group-item'>
                <span className='fw-bold'>Value:</span> {ethers.formatEther(BigInt(tx.value))} ETH
              </li>
              <li className='list-group-item'>
                <span className='fw-bold'>Tx fee:</span> {ethers.formatEther(tx.txFee)} ETH
              </li>
              <li className='list-group-item'>
                <span className='fw-bold'>Gas price:</span> {ethers.formatUnits(BigInt(tx.gasPrice), 'gwei')} gwei
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
