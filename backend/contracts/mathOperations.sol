//SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract mathOperations {
    function add(int256 a, int256 b) public pure returns (int256) {
        return a + b;
    }

    function subtract(int256 a, int256 b) public pure returns (int256) {
        return a - b;
    }

    function multiply(int256 a, int256 b) public pure returns (int256) {
        return a * b;
    }

    function divide(int256 a, int256 b) public pure returns (int256) {
        require(b != 0);
        return a / b;
    }
}