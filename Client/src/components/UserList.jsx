import styles from "../pages/Land/Land.module.css";
import userDefault from "../assets/userDefault.webp";

const UserList = ({ users, onUserSelect }) => {
  return (
    <ul className={styles.userList}>
      {users.map((userItem) => (
        <li
          key={userItem._id}
          className={styles.user}
          onClick={() => onUserSelect(userItem)}
        >
          <img
            src={userDefault}
            alt={userItem.username}
            className={styles.avatar}
          />
          <span>{userItem.username}</span>
          {userItem.newMessages > 0 && (
            <div className={styles.newMessageIndicator}>
              +{userItem.newMessages}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
