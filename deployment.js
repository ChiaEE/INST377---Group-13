const supabaseClient = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = 5500;      // This is the port on which the HTML page runs. 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());         // Integrate the Body Parser in the application. 

let endpoints = ["/HorrorBooks.html", "/MysteryBooks.html", "/NonFictionBooks.html", "/RomanceBooks.html", "/Children'sBooks.html", "/ComedyBooks.html", "/ScienceBooks.html", "/DramaBooks.html", "/YABooks.html"]; // These are all the endpoints that we want to load in Supabase

