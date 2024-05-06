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
* ~~ANOTHER BACKEND API WRITE THIS LATER~~

***more detailed information on the API's used can be found in the API section below***



# HOW TO RUN THE APPLICATION
use `code example` to do something

## testing the application
code for testing: 
```
this is where the code will go 
so the user can
copy and paste
and run easiliy
```

# FULL API RUNDOWN
This is the rundown of all the api interactions in this application:


##  GET 
### Gutendex
two types of get calls are made to Gutendex:
* The first is in the Homepage, where a request is made after using the search bar. The querry is searched through all 32 pages of the Gutendex for a matching result.
* The second is a request found in all the genre pages, but it is the same request to Gutendex but with a different search tag, this is by the genre acording to what was listend on the page. Example: the Romance Books page requests the Gutendex to return only Romance books. The Horror Books page requests the Gutendex to return only the list of Horror books.

###  API 2

* example text 1
* example text 2

## POST
 ### API 2
 * example text 1
 * example text 2
## PATCH
write this later
## ENDPOINTS
### Gutendex:  

https://gutendex.com/books?topic= + topic    *(topic is a JS variable)* 


https://gutendex.com/books

https://gutendex.com/books/?page= + pageNum   *(pageNum is a JS variable)* 

## API 2
sample text

## API 3
sample text



# BUG HUNT
known bugs:

# FUTURE DEVELOPMENT FOR THIS PROJECT
write more later