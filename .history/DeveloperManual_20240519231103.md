#   GETTING STARTED

This website supports all modern web browser applications on the following platforms including those on mobile devices  *(IOS/Android)* :
* **Windows**
* **Mac OS**
* **IOS**
* **Android**

## API introductions and further requirements

This application is dependant on 
* the gutendex database web API
*  integration of the RESTful web API
* an API endpoint from our SQL database
* a custom API that connects with supabase 

***more detailed information on the APIs used can be found in the API section below***



# HOW TO RUN THE APPLICATION
Use the search bar to look for specific results. for example, typing `Dracula` in the search bar will return:
```
Dracula
Author: Stoker, Bram

Subjects: Dracula, Count (Fictitious character) -- Fiction, Epistolary fiction, Gothic fiction, Horror tales, Transylvania (Romania) -- Fiction, Vampires -- Fiction, Whitby (England) -- Fiction
```
# USING OUR API
copy the following code into your project to get started: 
```
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

```
this will allow you to connect to the supabase. 

# FULL API RUNDOWN
This is the rundown of all the api interactions in this application:


##  GET 
### Gutendex
two types of get calls are made to Gutendex:
* The first is in the Homepage, where a request is made after using the search bar. The querry is searched through all 32 pages of the Gutendex for a matching result.
* The second is a request found in all the genre pages, but it is the same request to Gutendex but with a different search tag, this is by the genre acording to what was listend on the page. Example: the Romance Books page requests the Gutendex to return only Romance books. The Horror Books page requests the Gutendex to return only the list of Horror books.

###  Chart.js

* a single get call is made to obtain the chart that is usesd to display a selection of book covers

### custom API
a call is made to fetch the books from the genre of choice from the supabase

## ENDPOINTS
### Gutendex:  

https://gutendex.com/books?topic= + topic    *(topic is a JS variable)* 


https://gutendex.com/books

https://gutendex.com/books/?page= + pageNum   *(pageNum is a JS variable)* 

### Chart.js
https://cdn.jsdelivr.net/npm/chart.js 

### Flickity Slider library
https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.2/flickity.pkgd.min.js

### Custom API
https://dkrtmelljyeyesrteyhf.supabase.co/rest/v1/${genre}_books`  *${genre} is from the function parameter*

## POST
a post request is made to update the database with new entries

# BUG HUNT
known bugs:
no known bugs at this time
# FUTURE DEVELOPMENT FOR THIS PROJECT
In the future, this project could include more books, genres, and further enhanced search features. With more tools at use, the value of this website would increase signifcantly. 
