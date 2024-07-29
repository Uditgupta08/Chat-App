import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/Land/Land.module.css";

const SearchBar = ({ searchQuery, setSearchQuery, fetchUsers }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by username or phone..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default SearchBar;
