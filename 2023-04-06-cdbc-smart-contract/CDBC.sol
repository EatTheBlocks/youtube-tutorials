pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CBDC is ERC20 {
    address public controllingParty;
    uint public interestRateBasisPoints = 250; // 2.5%
    mapping (address => bool) public blacklist;
    mapping(address => uint) private stakedTreasuryBond;
    mapping(address => uint) private stakedFromTS;
    event UpdateControllingParty(address oldControllingParty, address newControllingParty);
    event UpdateInterestRate(uint oldInterestRate, uint newInterestRate);
    event IncreaseMoneySupply(uint oldMoneySupply, uint inflationAmount);
    event UpdateBlacklist(address _criminal, bool _blocked);
    event StakeTreasuryBonds(address user, uint amount);
    event UnstakeTreasuryBonds(address user, uint amount);
    event ClaimTreasuryBonds(address user, uint amount);
    
    constructor(address _controllingParty, uint initialSupply) 
    ERC20("Central Bank Digital Currency", "CBDC") {
        controllingParty = _controllingParty;
        _mint(controllingParty, initialSupply);
    }

    function updateControllingParty(address newControllingParty) external {
        require(msg.sender == controllingParty, "Not controlling party");
        controllingParty = newControllingParty;
        _transfer(controllingParty, newControllingParty, balanceOf(controllingParty));
        emit UpdateControllingParty(msg.sender, newControllingParty);
    }

    function updateInterestRate(uint newInterestRateBasisPoints) external {
        require(msg.sender == controllingParty, "Not controlling party");
        uint oldInterestRateBasisPoint = interestRateBasisPoints;
        interestRateBasisPoints = newInterestRateBasisPoints;
        emit UpdateInterestRate(oldInterestRateBasisPoint, newInterestRateBasisPoints);
    }

    function increaseMoneySupply(uint inflationAmount) external {
        require(msg.sender == controllingParty, "Not controlling party");
        uint oldMoneySupply = totalSupply();
        _mint(msg.sender, inflationAmount);
        emit IncreaseMoneySupply(oldMoneySupply, inflationAmount);
    }

    function stakeTreasuryBonds(uint _amount) external {
        require(_amount > 0, "amount is <= 0");
        require(balanceOf(msg.sender) >= _amount, "balance is <= amount");
        _transfer(msg.sender, address(this), _amount);
        if (stakedTreasuryBond[msg.sender] > 0) claimTreasuryBonds();
        stakedFromTS[msg.sender] = block.timestamp;
        stakedTreasuryBond[msg.sender] += _amount;
        emit StakeTreasuryBonds(msg.sender, _amount);
    }

    function unstakeTreasuryBonds(uint _amount) external {
        require(_amount > 0, "amount is <= 0");
        require(stakedTreasuryBond[msg.sender] >= _amount, "amount is > staked");
        claimTreasuryBonds();
        stakedTreasuryBond[msg.sender] -= _amount;
        _transfer(address(this), msg.sender, _amount);
        emit UnstakeTreasuryBonds(msg.sender, _amount);
    }

    function claimTreasuryBonds() public {
        require(stakedTreasuryBond[msg.sender] > 0, "staked is <= 0");
        uint secondsStaked = block.timestamp - stakedFromTS[msg.sender];
        uint rewards = stakedTreasuryBond[msg.sender] * secondsStaked * interestRateBasisPoints / 10000 / 3.154e7;
        stakedFromTS[msg.sender] = block.timestamp;
        _mint(msg.sender, rewards);
        emit ClaimTreasuryBonds(msg.sender, rewards);
    }

    function _transfer(address from, address to, uint amount) internal virtual override {
        require(blacklist[from] == false, "Sender address is blacklisted");
        require(blacklist[to] == false, "Recipient address is blacklisted");
        super._transfer(from, to, amount);
    }
}
