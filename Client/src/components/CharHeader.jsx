// components/ChatHeader.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/Land/Land.module.css";
import userDefault from "../assets/userDefault.webp";

const ChatHeader = ({ user }) => {
  return (
    <div className={styles.chatHeader}>
      <span>
        <img
          src={userDefault}
          alt={user.username}
          className={styles.imgright}
        />
        {user.username}
      </span>
      <button className={styles.button}>
        <FontAwesomeIcon icon={faPhone} />
      </button>
    </div>
  );
};

export default ChatHeader;
