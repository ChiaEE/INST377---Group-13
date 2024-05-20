// supabase client variables
const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 3500;      // This is the port on which the HTML page runs. 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());         // Integrate the Body Parser in the application. 

// Append the items from the HTML pages
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74";
const supabaseUrl = 'https://dkrtmelljyeyesrteyhf.supabase.co';
const supabase = supabaseClient.createClient(supabaseUrl, apiKey);

app.get('/', (req, res) => {
    res.sendFile('Suggestion.html', {root:__dirname})
})

var endpoint = "/book_suggestions";
// This code allows us to get and retrieve books as normal.
app.get(endpoint, async (req, res) => {
    const { data, error } = await supabase
        .from("book_suggestions")
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
    var bookName = req.body.book_name;
    var bookAuthor = req.body.book_author;
    
    /* Populate the records on the Supabase DB. */
    const { data, error } = await supabase
        .from("book_suggestions")
        .insert({ 'book_name': bookName, 'book_author': bookAuthor })
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
    
<<<<<<< HEAD:index.js
});
=======
});
>>>>>>> c00fccc9e27ffd2fb32a300c27cde422ba6cc728:deployment.js
