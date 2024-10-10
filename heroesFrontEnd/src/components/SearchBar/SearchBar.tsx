import React, { useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (term: FormDataEntryValue | null) => unknown;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const form = e.target;
    const term = new FormData(form).get("search");
    onSearch(term);
  };
  return (
    <form className={styles.searchbar} onSubmit={handleSubmit}>
      <span>
        <input type="text" placeholder="Search" name="search" />
        <div className={styles.buttonborder}>
          <button>Search</button>
        </div>
      </span>
    </form>
  );
};

export default SearchBar;
