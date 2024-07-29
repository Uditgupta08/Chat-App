import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMicrophone,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/Land/Land.module.css";

const ChatFooter = ({ newMessage, setNewMessage, handleSendMessage }) => {
  return (
    <div className={styles.chatFooter}>
      <button className={styles.button}>
        <FontAwesomeIcon icon={faPaperclip} />
      </button>
      <input
        type="text"
        placeholder="Send a message"
        className={styles.messageInput}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button className={styles.button}>
        <FontAwesomeIcon icon={faMicrophone} />
      </button>
      <button className={styles.button} onClick={handleSendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
};

export default ChatFooter;
