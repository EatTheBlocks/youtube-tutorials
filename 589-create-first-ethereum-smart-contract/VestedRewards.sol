pragma solidity 0.8.14;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract VestedRewards {
    IERC20 public token;

    struct Reward {
        uint amountPerMonth;
        uint months;
        uint amountDistributed; 
        uint start;
    }
    mapping(address => Reward) public rewards;

    constructor(address reward) {
        token = IERC20(reward);
    }

    function createAllocation(address recipient, uint amountPerMonth, uint months) external {
        token.transferFrom(msg.sender, address(this), amountPerMonth * months);
        rewards[recipient] = Reward(amountPerMonth, months, 0, block.timestamp);
    }

    function distributeReward(address recipient) external {
        Reward storage reward = rewards[recipient];
        require(reward.start > 0, "This reward doesn't exist");
        uint amountVested = ((block.timestamp - reward.start) / 30 days) * reward.amountPerMonth;
        uint amountToDistribute = amountVested - reward.amountDistributed;
        require(amountToDistribute > 0, "No amount to distribute");
        reward.amountDistributed += amountToDistribute;
        token.transfer(recipient, amountToDistribute);
    }
}
