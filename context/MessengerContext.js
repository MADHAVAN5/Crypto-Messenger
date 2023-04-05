import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// internal import

import { CheckIfWalletConnected, connectWallet, connectWithContract } from '../utils/apiFeature';

export const MessengerContext = React.createContext();

export const MessengerProvider = ({ children }) => {
    const [account, setAccount] = useState('');
    const [userName, setUserName] = useState('');
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState('');

    //chat user data
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');

    const router = useRouter();

    //fetch data time of page load
    const fetchData = async () => {
        try {
            // get contract
            const contract = await connectWithContract();
            //get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //get user name
            const userName = await contract.getUser(connectAccount);
            setUserName(userName);
            //get my friend list
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //get all app user list
            const userList = await contract.getAllAppUsers();
            setUserList(userList);
        } catch (error) {
            setError("Please Install And Your Wallet");
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
            setFriendMsg(read);
        } catch (error) {
            setError("Currently You Have no Message");
        }
    };

    //create account
    const createAccount = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return setError("Name and AccountAddress, cannot be emty");

            const contract = await connectWithContract();
            const getCreatedUser = await contract.CreateAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account please reload")
        }
    };

    //add your friends
    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (name || accountAddress) return setError("Please provide")

            const contract = await connectWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true)
            await addMyFriend.wait()
            setLoading(false);
            router.push("/");
            window.location.reload();
        } catch (error) {
            setError("Something went wrong while adding friends, try again");
        }
    };

    //send message to your friend

    const sendMessage = async ({ msg, address }) => {
        try {
            if (msg || address) return setError("Please Type your Message");

            const contract = await connectWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Please reload and try again");
        }
    };

    // read message

    const readUser = async (userAddress) => {
        const contract = await connectWithContract();
        const userName = await contract.getUser(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };

    return (
        <MessengerContext.Provider
            value={{
                readMessage,
                createAccount,
                addFriends,
                sendMessage,
                readUser,
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