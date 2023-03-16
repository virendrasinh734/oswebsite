from flask import Flask,render_template,jsonify
import philosopher
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('dp.html')

@app.route('/data')
def data():
    philosopher.main()
    data = philosopher.get_data()
    return jsonify(data)
# @app.route("/simulate")
# def simulate():    
#     output = ""
#     # Render the template with the output
#     return render_template("index.html", output=output)
if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)