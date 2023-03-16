from flask import Flask,render_template,jsonify
import philosopher2
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('indexx.html')
@app.route('/Sjf')
def Sjf():
    return render_template('sjf.html')
@app.route('/dinningP')
def dinningP():
    return render_template('dp.html')
@app.route('/data')
def data():
    philosopher2.main()
    data = philosopher2.get_data()
    return jsonify(data)
# @app.route("/simulate")
# def simulate():    
#     output = ""
#     # Render the template with the output
#     return render_template("index.html", output=output)
if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)