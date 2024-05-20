
// supabase initialize
const supabaseUrl = "https://dkrtmelljyeyesrteyhf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


function fetchRandomBooks() {
    return fetch("https://gutendex.com/books")
        .then(response => response.json())
        .then(data => {
            const books = data.results;
            const randomBooks = [];

            // Choose a random subset of books
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * books.length);
                const randomBook = books[randomIndex];
                randomBooks.push(randomBook);
            }

            return randomBooks;
        });
}

// Function to create HTML for carousel cells
function createCarouselCell(book) {
    return `
        <div class="carousel-cell">
            <a href="${book.formats['text/html']}">
                <img src="${book.formats['image/jpeg']}" alt="${book.title}">
            </a>
        </div>
    `;
}

// Function to initialize Flickity carousel
function initializeCarousel() {
    fetchRandomBooks()
        .then(randomBooks => {
            const carouselContainer = document.querySelector('.main-carousel');
            carouselContainer.innerHTML = randomBooks.map(createCarouselCell).join('');

            // Initialize Flickity carousel
            const flkty = new Flickity(carouselContainer, {
                cellAlign: 'left',
                contain: true,
                wrapAround: true
            });
        })
        .catch(error => {
            console.error('Error fetching random books:', error);
        });
}

// Call initializeCarousel function when the page loads
window.addEventListener('load', initializeCarousel);
    // Function to perform book search
    function performSearch(event) {
        event.preventDefault();

        let searchItem = document.querySelector(".search-input").value;
        var booksDetails = [];
        const apiUrlBase = "https://gutendex.com/books";
        const totalPages = 20; // Set the total number of pages to fetch

        document.getElementById("loading-indicator").style.display = "block";

        // Recursive function to fetch all pages of results
        function fetchAllPages(page) {
            const apiUrl = `${apiUrlBase}?page=${page}`;

            fetch(apiUrl)
                .then((res) => res.json())
                .then((res) => {
                    for (var key of Object.keys(res)) {
                        if (Object.prototype.hasOwnProperty.call(res, key)) {
                            // If the key is results, we add all the details to the bookDetails Array.
                            if (key === "results") {
                                booksDetails.push(...res[key]);
                            }
                        }
                    }

                    // Check if there are more pages to fetch
                    if (page < totalPages) {
                        // Fetch the next page recursively
                        fetchAllPages(page + 1);
                    } else {
                        // Once all pages are fetched, filter and display results
                        const searchResults = booksDetails.filter(book => {
                            return book.title.toLowerCase().includes(searchItem.toLowerCase());
                        });

                        document.getElementById("loading-indicator").style.display = "none";

                        displayResults(searchResults); // Display the search results
                        filterResults(); 
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    document.getElementById("loading-indicator").style.display = "none";
                });
        }

        // Start fetching from page 1
        fetchAllPages(1);
    }

    // Function to display search results
    function displayResults(searchResults) {
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = ""; // Clear previous search results

        searchResults.forEach(book => {
            // Create a container for each book
            const bookContainer = document.createElement("div");
            bookContainer.classList.add("book-container");
            bookContainer.setAttribute("data-copyright", book.copyright); // Add copyright attribute

            // Create elements for title, author, and subjects
            const titleElement = document.createElement("h2");
            titleElement.textContent = book.title;

            const authorElement = document.createElement("p");
            authorElement.textContent = "Author: " + book.authors[0].name;

            const subjectsElement = document.createElement("p");
            subjectsElement.textContent = "Subjects: " + book.subjects.join(", ");

            // Append elements to the book container
            bookContainer.appendChild(titleElement);
            bookContainer.appendChild(authorElement);
            bookContainer.appendChild(subjectsElement);

            // Append the book container to the results container
            resultsContainer.appendChild(bookContainer);
        });
    }

    // Function to filter search results
    function filterResults() {
        const filterValue = document.getElementById("copyright-filter").value;
        const resultsContainer = document.getElementById("results");
        const bookContainers = resultsContainer.getElementsByClassName("book-container");

        Array.from(bookContainers).forEach(container => {
            const copyright = container.getAttribute("data-copyright");

            if (filterValue === "all" || (filterValue === "copyrighted" && copyright === "true") || (filterValue === "public-domain" && copyright === "false")) {
                container.style.display = "block";
            } else {
                container.style.display = "none";
            }
        });
    }

    
    document.getElementById("genre-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const selectedGenre = document.getElementById("genre-select").value;
        fetchBooks(selectedGenre);

    
        document.querySelector(".chart-container").style.display = "block";
    });


function fetchBooks(genre) {
    const apiUrl = `https://dkrtmelljyeyesrteyhf.supabase.co/rest/v1/${genre}_books`;

    fetch(apiUrl, {
        headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74'
        }
    })
    .then(response => response.json())
    .then(data => {
        
        const titles = data.map(book => book.book_name);
        const downloadCounts = data.map(book => book.download_count);

        
        displayChart(titles, downloadCounts);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


function displayChart(titles, downloadCounts) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: titles,
            datasets: [{
                label: 'Most Downloaded',
                data: downloadCounts,
                backgroundColor: 'rgba(255, 255, 255, 1)', 
                borderColor: 'rgba(0, 0, 255, 1)', 
                borderWidth: 2, 
                color: 'white'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Book Downloads',
                    color: 'white', 
                    font: {
                        size: 18 
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white' 
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: 'white' 
                    }
                }
            }
        }
    });
}

async function loadBookData() {
    var test = await fetch('http://localhost:3500/book_suggestions')
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            const element = document.getElementById("dataOnBooks");
            if (element) {
                element.remove();
            }

            var table = document.createElement('table');
            table.setAttribute('id', 'dataOnBooks')

            var tableRow = document.createElement('tr');

            var tableHeading1 = document.createElement('th');
            tableHeading1.innerHTML = "Book Name"
            tableRow.appendChild(tableHeading1)

            var tableHeading2 = document.createElement('th');
            tableHeading2.innerHTML = "Author Name"
            tableRow.appendChild(tableHeading2)

            table.appendChild(tableRow)
            var cutoff = document.getElementById('dataOnBooks');
            cutoff.insertAdjacentElement("beforebegin", table)
            for (var i = 0; i < res.length; i++) {
                var bookRow = document.createElement('tr');
                var bookName = document.createElement('td');
                var bookAuthor = document.createElement('td');

                bookName.innerHTML = res[i].book_name;
                bookAuthor.innerHTML = res[i].book_author;

                bookRow.appendChild(bookName);
                bookRow.appendChild(bookAuthor);

                table.appendChild(bookRow);
            }
        })
}



// Handle form submission
const author = document.getElementById('author').innerText.trim();
const title = document.getElementById('title').innerText.trim();

async function addSuggestion() {
    console.log("Adding data to Supabase.");
    const author = document.getElementById('author').value.trim();
    const title = document.getElementById('title').value.trim();
    console.log("Title and author: ", author, title);
    // Collect form data
    
    // Validate that both author and title fields are filled out
    if (!author || !title) {
        alert('Please fill out both the author name and title.');
        return;
    }
    var test = await fetch("http://localhost:3500/book_suggestions", {
        method: 'POST',
        body: JSON.stringify({
            "book_name": `${title}`,
            "book_author": `${author}`
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res) => res.json())
    .then((res) => {

    })
    await loadBookData; 
}


