import React, { useState, useEffect } from 'react';

function ComedyBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Equivalent of document.addEventListener("DOMContentLoaded", ...) in React:
    useEffect(() => {
        fetchBooks();
    }, []); // The empty array makes this effect run only once after the initial render

    const fetchBooks = () => {
        const topic = "comedy";
        setLoading(true);
        fetch(`https://gutendex.com/books?topic=${topic}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBooks(data.results);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const displayBooks = () => {
        if (books.length === 0) {
            return <div>No results found.</div>;
        } else {
            return (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>
                            <strong>Title:</strong> {book.title}<br />
                            <strong>Author:</strong> {book.authors[0].name}<br />
                            <a href={book.formats["text/html"]} target="_blank" rel="noopener noreferrer">Read on Project Gutenberg</a>
                        </li>
                    ))}
                </ul>
            );
        }
    };

    return (
        <div style={{ backgroundColor: '#226ca1' }}>
            <header id="bar">
                <h1>Comedy Books</h1>
            </header>
            <nav id="main-nav">
                <ul id="navList">
                    {/* Links would be converted to React Router Links or kept as is depending on routing strategy */}
                    <li><a href="/">HOME</a></li>
                    <li><a href="/about">ABOUT</a></li>
                    {/* Other links */}
                </ul>
            </nav>
            <div id="comedyBooksList">
                {loading ? <div>Loading books...</div> : displayBooks()}
            </div>
        </div>
    );
}

export default ComedyBooks;
