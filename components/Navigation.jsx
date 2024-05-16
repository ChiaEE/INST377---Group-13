import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/comedy-books">Comedy Books</Link></li>
                <li><Link to="/childrens-books">Children`s Books</Link></li>
                <li><Link to="/fiction-books">Fiction Books</Link></li>
                <li><Link to="/non-fiction-books">Non-Fiction Books</Link></li>
                <li><Link to="/romance-books">Romance Books</Link></li>
                <li><Link to="/drama-books">Drama Books</Link></li>
                <li><Link to="/science-books">Science Books</Link></li>
                <li><Link to="/horror-books">Horror Books</Link></li>
                <li><Link to="/mystery-books">Mystery Books</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;