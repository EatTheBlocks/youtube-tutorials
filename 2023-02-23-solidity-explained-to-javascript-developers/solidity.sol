//layout
pragma solidity 0.8.17;

contract MyContract {
    uint a = 10;
    function foo() external {}
}















//variable lifetime & memory
contract MyContract {
    uint longTermVar = 10;
    function foo() external {
        uint tmpVar = 20;
    }
}















//functions
contract MyContract {
    uint data = 10;
    function updateData(uint newData) external {
        data = newData;
    }
    function readData() external view returns(uint) {
        return data;
    }
    function hellowWorld() external view returns(memory string) {
        return 'helloworld' ;
    }
}









//variables
contract MyContract {
    bool isRegistered = false;
    uint age = 20;
    string memory username = 'myUsername';
    address id = 0x5F927395213ee6b95dE97bDdCb1b2B1C0F16844F;
    string memory constant foo = 'immutable data';
    string memory bar = 'can be changed';
}















//array
contract MyContract {
    uint[] myArr;
    function foo() external {
        uint firstEl = myArr[0];
        uint len = array.length;
        array.push(10);
        array.pop();
    }
}













//object
contract MyContract {
    struct User {
        string name;
        uint balance;
    }
    function createUser() external {
        User memory user = User({
            name: 'Luke',
            balance: 1000
        });
    }
}









//key-value store (mappings)
contract MyContract {
    struct User {
        string name,
        uint balance,
    }
    mapping(uint => User) users;
    uint currentId;
    function createUser() external {
        users[currentId] = User({
            name: 'Luke',
            balance: 1000
        });
        currentId++;
        users[currentId] = User({
            name: 'Brittney',
            balance: 2000
        });
        currentId++;
    }
}

//control structures
bool foo = true;
if(foo) {
    //do something
}
uint i = 0;
for(i = 0; i < 10; i++) {
    //do something
}
while(foo) {
    //do something
}










//storing data long-term
contract MyContract {
    uint data;
    function storeData(uint newData) external {
        data = newData;
    }
}















//api calls
interface Callee {
    function foo() external returns(uint);
}
contract Caller {
    function bar() external {
        Callee callee = Callee(0x0C6B0976846e5849Ae8793B9f918bcBC24Aef805);
        uint result = callee.foo();
        //do something with result
    }
}












//send money
contract MyContract{
    function send(
        address payable to, 
        uint amount
    ) external {
        (bool sent, bytes memory data) = to.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}












//errors - throw
error BadArgument(string reason);
function add(uint a, uint b) external {
    if(a == 0 || b == 0) {
        revert BadArgument({
            reason: 'arguments should be > 0'
        });
    }
}















//errors - try/catch
interface Datafeed {
    function getData(address token) external view returns(uint value, bool success);
}
contract MyContract {
    Callee callee = Callee(0x0C6B0976846e5849Ae8793B9f918bcBC24Aef805);
    function foo(address token) external view returns(uint) {
        try feed.getdata(token) returns(uint v) {
            return (v, true);
        } catch Error(string memory errorCode) {
            return (0, false);
        } catch Panic(uint errorCode) {
            return (0, false);
        } catch (bytes memory lowLevelData) {
            return (0, false);
        }
    }
}




