// components/ChatBody.jsx
const ChatBody = ({ messages, styles }) => {
  return (
    <div className={styles.chatBody}>
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            {msg.message}
          </div>
        ))
      ) : (
        <div className={styles.noMessages}>No messages</div>
      )}
    </div>
  );
};

export default ChatBody;
