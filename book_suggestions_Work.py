from flask import Flask, request, render_template

app = Flask(__name__)
# This code attempts to access the form in Suggestion.html
@app.route('/', methods=["GET", "POST"])
def gfg():
    if request.method == "POST":
        first_name = request.form.get("title")
        last_name = request.form.get("author")
        return f'{first_name} {last_name}'
        
    return render_template("Suggestion.html")

if __name__=='__main__':
    app.run()
    