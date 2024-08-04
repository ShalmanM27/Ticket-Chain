require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

const {API, PRIVATE_KEY} = process.env;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork:"sepolia",
  networks : {
    sepolia : {
      url : API,
      accounts : [`0x${PRIVATE_KEY}`],
    },
  },
};
