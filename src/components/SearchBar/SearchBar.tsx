
import styles from "./SearchBar.module.css";
import {toast} from "react-hot-toast";
import { useId } from "react";

interface SearchBarProps {
  handleSearch: (query: string) => void;
  disabled: boolean;
}

const SearchBar = ({ handleSearch, disabled }: SearchBarProps) => {
    const uniqueId = useId();

    const onSubmit = (formData: FormData) => {
        const searchQuery = formData.get("query") as string;
        if (!searchQuery.trim()) {
            toast.error("Please enter your search query.");
            return;
        } 
        handleSearch(searchQuery)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form action={onSubmit} className={styles.form}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                        id={uniqueId}
                    />
                    <button className={styles.button} type="submit" disabled={disabled}>
                        Search
                    </button>
                </form>
            </div>
        </header>
    )
}

export default SearchBar;
