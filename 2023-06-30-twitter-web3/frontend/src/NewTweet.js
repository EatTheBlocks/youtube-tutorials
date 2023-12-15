import { useState } from 'react';

const TweetForm = ({ createTweet }) => {
  const [tweet, setTweet] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(tweet); // This would be where you handle the tweet submission
    createTweet(tweet);
    setTweet('');
  };

  return (
    <form className='tweetForm' onSubmit={handleSubmit}>
      <textarea
        className='tweetForm-textarea'
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        maxLength='280'
        placeholder="What's happening?!"
      />
      <div className='tweetForm-bottom'>
        <button type='submit' className='tweetForm-button' disabled={!tweet}>
          Tweet
        </button>
      </div>
    </form>
  );
};

export default TweetForm;
