//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract myContract {
    uint256 private value;

    function addValue(uint256 newValue) public {
        require(newValue >= 10, "Value has to be greater than 10");
        value = newValue;
    }

    function getValue() external view returns (uint256) {
        return value;
    }
}
