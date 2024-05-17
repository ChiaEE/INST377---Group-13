// supabase client variables
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3500;      // This is the port on which the HTML page runs. 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());         // Integrate the Body Parser in the application. 

let endpoints = ["/children_books", "/comedy_books", "/science_books", "/romance_books", "/nonfiction_books", "/fiction_books", "/mystery_books", "/drama_books", "/horror_books"]; // These are all the endpoints that we want to load in Supabase
// Append the items from the HTML pages
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74";
const supabaseUrl = 'https://dkrtmelljyeyesrteyhf.supabase.co';
const supabase = supabaseClient.createClient(supabaseUrl, apiKey);


var endpoint = "/children_books";
// This code allows us to get and retrieve books as normal.
app.get(endpoint, async (req, res) => {
    const { data, error } = await supabase
        .from("children_books")
        .select()
    if(error) {
        console.log("Error: ", error);
        res.send(error);
    } else {
        console.log("Data: ", data);
        res.send(data);
    }
})

app.post(endpoint, async (req, res) => {
    /* Get all the characteristics of the book such as name, author, subject and ID. */
    var bookID = req.body.id;
    var bookName = req.body.book_name;
    var bookAuthor = req.body.book_author;
    var bookSubject = req.body.subject;
    var downloadCount = req.body.download_count;
    /* Populate the records on the Supabase DB. */
    const { data, error } = await supabase
        .from("Books")
        .insert({ 'id': bookID, 'book_name': bookName, 'book_author': bookAuthor, 'subject': bookSubject, 'download_count': downloadCount})
        .select();

    if(error) {
        console.log('Error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.listen(port, () => {
    console.log("App is Created!");
})
