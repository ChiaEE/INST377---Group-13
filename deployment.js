// supabase client variables
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3000;      // This is the port on which the HTML page runs. 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());         // Integrate the Body Parser in the application. 

let endpoints = ["/HorrorBooks.html", "/MysteryBooks.html", "/NonFictionBooks.html", "/RomanceBooks.html", "/Children'sBooks.html", "/ComedyBooks.html", "/ScienceBooks.html", "/DramaBooks.html"]; // These are all the endpoints that we want to load in Supabase

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74";
const supabaseUrl = 'https://dkrtmelljyeyesrteyhf.supabase.co';
const supabase = supabaseClient.createClient(supabaseUrl, apiKey);

app.get("/Books", async (req, res) => {
    const { data, error } = await supabase
        .from("Books")
        .select()
    if(error) {
        console.log("Error: ", error);
        res.send(error);
    } else {
        console.log("Data: ", data);
        res.send(data);
    }
})

app.post("/Books", async (req, res) => {
    console.log("req.body");
    /* Get all the characteristics of the book such as name, author, subject and ID. */
    var bookID = req.body.book.id;
    var bookName = req.body.book_name;
    var bookAuthor = req.body.book_author;
    var bookSubject = req.body.subject;
    /* Populate the records on the Supabase DB. */
    const { data, error } = await supabase
        .from("Books")
        .insert({ 'id': bookID, 'book_name': bookName, 'book_author': bookAuthor, 'subject': bookSubject })
        .select()

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
