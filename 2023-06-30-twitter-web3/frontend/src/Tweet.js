import { generateAvatarURL } from '@cfx-kit/wallet-avatar';
import moment from 'moment';

const Tweet = ({content, author, timestamp, account, sendTip}) => {
  const src = generateAvatarURL(author);
  return (
    <div className='tweet'>
      <div className='tweet-left'>
        <img src={src} className='tweet-avatar' />
      </div>
      <div className='tweet-right'>
        <div className='tweet-header'>
          <span className='tweet-username'>{author}</span>
          <span className='tweet-timestamp'>{new moment(timestamp).fromNow()}</span>
        </div>
        <div className='tweet-content'>{content}</div>
        {account ? (
          <div className='tweet-tip'>
            <button onClick={e => sendTip(author)} type='submit' className='tweet-tip-button'>Tip</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Tweet;
