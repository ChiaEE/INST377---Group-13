import requests
from supabase import create_client, Client

# Supabase credentials
supabase_url = "https://dkrtmelljyeyesrteyhf.supabase.co"
supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrcnRtZWxsanlleWVzcnRleWhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU1MzUxNTUsImV4cCI6MjAzMTExMTE1NX0.xLDZ3H1Y0sGUC8tVAccJqm5YK2hwtZyWMB_AZD5vb74"

# Initialize Supabase client
supabase: Client = create_client(supabase_url, supabase_key)

# Gutendex API URL
gutendex_base_url = "https://gutendex.com/books"
topic = "horror"
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
        download_count = book.get("download_count", "")

        # Insert book data into Supabase table
        try:
            response = supabase.table("horror_books").insert({
                "id": book_id,
                "book_name": title,
                "book_author": ", ".join(authors),
                "subject": ", ".join(subjects),
                "download_count": download_count
            }).execute()
            print(f"Book '{title}' inserted successfully.")
        except Exception as e:
            print(f"Failed to insert book '{title}': {e}")

print("Data insertion completed.")
