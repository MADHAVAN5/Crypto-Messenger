import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { MessengerAddress, MessengerABI} from "../context/constants";

export const CheckIfWalletConnected = async () => {
    try {
        if (!window.ethereum) return console.log("Install Matamask");
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
    } catch (error) {
        console.log("Install Matamask");
    }
};

export const connnectWallet = async() => {
    try {
        if (!window.ethereum) return console.log("Install Matamask");
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.log(error);
    }
};

const fetchContract = (signerOrProvider) => new ethers.Contract(MessengerABI, MessengerAddress, signerOrProvider);

export const connnectWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.provider.Web3Modal(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    } catch (error) {
        console.log(error);
    }
};

export const converTime = (time) => {
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + 
    "/" +
    newTime.getMinutes() +
    "/" +
    newTime.getSeconds() +
    "Date:" +
    newTime.getDate()
    "/" +
    (newTime.getMonth() + 1) +
    "/" +
    newTime.getFullYear();

    return realTime;
};