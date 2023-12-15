import { useState, useEffect } from 'react';
import Error from './Error.js';
import Header from './Header.js';
import Tweet from './Tweet.js';
import NewTweet from './NewTweet.js';
import mockTweets from './mockData.js';
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers, BrowserProvider } from 'ethers';

const sortTweets = tweets => 
  tweets.sort((t1, t2) => parseInt(t2.timestamp) - parseInt(t1.timestamp));

function App() {
  const [error, setError] = useState('');
  const [provider, setProvider] = useState(undefined);
  const [disableConnect, setDisableConnect] = useState(false);
  const [tweets, setTweets] = useState([]); 
  const [account, setAccount] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const sortedTweets = sortTweets(mockTweets);
      setTweets(sortedTweets);
      const metamaskProvider = await detectEthereumProvider();
      if(!metamaskProvider) {
        setError('Please install Metamask before using this app');
      } else {
        const provider = new BrowserProvider(metamaskProvider);
        setProvider(provider);
      }
    };
    init();
  }, []);

  // const createTweet = content => {
  //   //HACK
  //   const newTweet = {
  //     author: account,
  //     content, 
  //     timestamp: new Date().getTime(),
  //     id: 10
  //   };
  //   setTweets(tweets => sortTweets([...tweets, newTweet]));
  //   //TODO: send to blockchain
  //   //try {
  //   //  await contract.sendTransaction(tx);
  //   //} catch(e) {
  //   //  setError('The Tweet wasn\'t sent. Try again later')
  //   //}
  // }

  const createTweet = content => {
    //HACK
    const newTweet = {
      author: account,
      content, 
      timestamp: new Date().getTime(),
      id: 10
    };
    contract.createTweet(content)
    setTweets(tweets => sortTweets([...tweets, newTweet]));
    //TODO: send to blockchain
    //try {
    //  await contract.sendTransaction(tx);
    //} catch(e) {
    //  setError('The Tweet wasn\'t sent. Try again later')
    //}
  }

  const sendTip = async author => {
    const signer = await provider.getSigner();
    const tx = {
      from: account,
      to: author, 
      value: ethers.parseEther('0.001')
    };
    try {
      await signer.sendTransaction(tx);
    } catch(e) {
      setError('The tip wasn\'t sent. Try again later')
    }
  }

  const connectWallet = async () => {
    setDisableConnect(true);
    const provider = await detectEthereumProvider()
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0]);
      setDisableConnect(false);
    } catch(_e) {
      setDisableConnect(false);
    }
  }

  return (
    <div className='app'>
      {error ? <Error error={error} /> : null}
      <Header 
        connectWallet={connectWallet} 
        account={account} 
        disableConnect={disableConnect} 
      />
      {account ? <NewTweet createTweet={createTweet} /> : null }
      {tweets.map(tweet => (
        <Tweet 
          {...tweet} 
          account={account} 
          key={tweet.id} 
          sendTip={sendTip} 
        />
       ))}
    </div>
  );
}

export default App;
