import { useEffect } from "react";
import useLand from "../../hooks/useLand";
import SearchBar from "../../components/SearchBar";
import UserList from "../../components/UserList";
import ChatHeader from "../../components/CharHeader";
import ChatBody from "../../components/ChatBody";
import ChatFooter from "../../components/ChatFooter";
import styles from "./Land.module.css";
import userDefault from "../../assets/userDefault.webp";
import useLogout from "../../hooks/useLogout";

const Land = () => {
  const {
    users,
    searchQuery,
    setSearchQuery,
    selectedUser,
    setSelectedUser,
    messages,
    newMessage,
    setNewMessage,
    fetchUsers,
    fetchMessages,
    handleSendMessage,
  } = useLand();

  const { loading, logout } = useLogout();

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchUsers(searchQuery);
    }
  }, [searchQuery, fetchUsers]);

  useEffect(() => {
    if (selectedUser) {
      console.log("Fetching messages for user:", selectedUser._id);
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser, fetchMessages]);

  useEffect(() => {
    console.log("Messages:", messages);
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.topBar}>
          <button
            className={styles.logoutButton}
            onClick={logout}
            disabled={loading}
          >
            Logout
          </button>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fetchUsers={() => fetchUsers(searchQuery)}
          />
        </div>
        <UserList users={users} setSelectedUser={setSelectedUser} />
      </div>
      <div className={styles.right}>
        {selectedUser ? (
          <>
            <ChatHeader user={selectedUser} userDefault={userDefault} />
            <ChatBody messages={messages} styles={styles} />
            <ChatFooter
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className={styles.selectUserMessage}>
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Land;
