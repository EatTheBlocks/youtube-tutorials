pragma solidity 0.8.20;

contract Twitter {

  struct Tweet {
    string content;
    address author;
    uint timestamp;
  }

  mapping(uint => Tweet) public tweets; 


  
  uint public nextTweetId;
  uint public nextReplyId;

  function postTweet(string calldata content) external {
    tweets[nextTweetId].content = content; 
    tweets[nextTweetId].author = msg.sender; 
    nextTweetId++;
  }

  function postReply(uint tweetIdbytes32  string calldata content) {
    require(tweets[tweetId].author != address(0), 'This tweet does not exist');
    tweets[nextTweetId].replies.push(Reply(content, msg.sender, block.timestamp);
    nextReplyId++:
  }
}
