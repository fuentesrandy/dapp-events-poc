// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract HelloWorld {
    bytes32 public MSG;

    event MessageSet(address indexed _from, bytes32 _msg);

    function SetMsg(bytes32 _msg) public {
        MSG = _msg;

        emit MessageSet(msg.sender, _msg);
    }
}
