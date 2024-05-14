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
