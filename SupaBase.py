import requests
from supabase_py import create_client


supabase_url = "https://dkrtmelljyeyesrteyhf.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74"
supabase = create_client(supabase_url, supabase_key)


gutendex_base_url = "https://gutendex.com/books"


topic = "science"


gutendex_url = f"{gutendex_base_url}?topic={topic}"

# Make a GET request to Gutendex API
response = requests.get(gutendex_url)
data = response.json()

# Insert data into Supabase table
if data.get("results"):
    for book in data["results"]:
        
        book_id = book.get("id", "")
        title = book.get("title", "")
        authors = [author["name"] for author in book.get("authors", [])]
        subjects = book.get("subjects", [])
        download_count = book.get("download_count","")
        
        
        supabase.table("science_books").insert({
            "id": book_id,
            "book_name": title,
            "book_author": ", ".join(authors),
            "subject": ", ".join(subjects),
            "download_count": download_count
        }).execute()

print("Data insertion completed.")