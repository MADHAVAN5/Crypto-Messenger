import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// internal import

import { CheckIfWalletConnected, connectWallet, connectWithContract } from '../utils/apiFeature';

export const MessengerContext = React.createContext();

export const MessengerProvider = ({ children }) => {
    const [account, setaccount] = useState('');
    const [userName, setuserName] = useState('');
    const [friendLists, setfriendLists] = useState([]);
    const [friendMsg, setfriendMsg] = useState([]);
    const [loading, setloading] = useState(false);
    const [userList, setuserList] = useState([]);
    const [error, seterror] = useState('');

    //chat user data
    const [currentUserName, setcurrentUserName] = useState('');
    const [currentUserAddress, setcurrentUserAddress] = useState('');

    const router = useRouter();

    //fetch data time of page load
    const fetchData = async () => {
        try {
            // get contract
            const contract = await connectWithContract();
            //get account
            const connectAccount = await connectWallet();
            setaccount(connectAccount);
            //get user name
            const userName = await contract.getUser(connectAccount);
            setuserName(userName);
            //get my friend list
            const friendLists = await contract.getMyFriendList();
            setfriendLists(friendLists);
            //get all app user list
            const userList = await contract.getAllAppUsers();
            setuserList(userList);
        } catch (error) {
            seterror("Please Install And Your Wallet");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //read message

    const readMessage = async (friendAddress) => {
        try {
            const contract = await connectWithContract();
            const read = await contract.readMessage(friendAddress);
            setfriendMsg(read);
        } catch (error) {
            seterror("Currently You Have no Message");
        }
    };

    //create account
    const createAccount = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return seterror("Name and AccountAddress, cannot be emty");

            const contract = await connectWithContract();
            const getCreatedUser = await contract.CreateAccount(name);
            setloading(true);
            await getCreatedUser.wait();
            setloading(false);
            window.location.reload();
        } catch (error) {
            seterror("Error while creating your account please reload")
        }
    };

    //add your friends
    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return seterror("Please provide")

            const contract = await connectWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setloading(true)
            await addMyFriend.wait()
            setloading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            seterror("Something went wrong while adding friends, try again");
        }
    };

    //send message to your friend

    const sendMessage = async ({ msg, address }) => {
        try {
            if (msg || address) return seterror("Please Type your Message");

            const contract = await connectWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setloading(true);
            await addMessage.wait();
            setloading(false);
            window.location.reload();
        } catch (error) {
            seterror("Please reload and try again");
        }
    };

    // read message

    const readUser = async (userAddress) => {
        const contract = await connectWithContract();
        const userName = await contract.getUser(userAddress);
        setcurrentUserName(userName);
        setcurrentUserAddress(userAddress);
    };

    return (
        <MessengerContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUser,
                connectWallet,
                CheckIfWalletConnected,
                account,
                userName,
                friendLists,
                friendMsg,
                loading,
                userList,
                error,
                currentUserName,
                currentUserAddress
            }}>
            {children}
        </MessengerContext.Provider>
    );
};