import { generateAvatarURL } from '@cfx-kit/wallet-avatar';

const Header = ({connectWallet, disableConnect, account}) => {
  const src = account ? generateAvatarURL(account) : undefined;
  return (
    <div className='app-header'>
      DTweet, the Decentralized Twitter
      {account ? ( 
        <div className='account'>
          <div className='account-avatar'>
            <img src={src} className='account-avatar' />
          </div>
          <div className='account-address'>
            <span className='account-address'>{`${account.substring(0, 5)}...`}</span> 
          </div>
        </div>
      ) : (
        <button className='connect-wallet' onClick={connectWallet} disabled={disableConnect}>Connect Wallet</button>
      )}
    </div>
  )
}

export default Header;
