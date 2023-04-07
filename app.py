from flask import Flask,render_template,jsonify,request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import philosopher2
import fcfs
app=Flask(__name__)

@app.route('/')
def index():
    return render_template('greetings.html')
@app.route('/main')
def mainn():
    return render_template('index.html')

@app.route('/Sjf')
def Sjf():
    return render_template('sjf.html')
@app.route('/dinningP')
def dinningP():
    return render_template('dp.html')
@app.route('/look')
def look():
    return render_template('look.html')
@app.route('/fcfs')
def fcfss():
    return render_template('fcfs.html')
@app.route('/data')
def data():
    philosopher2.main()
    data = philosopher2.get_data()
    return jsonify(data)


@app.route('/process-data', methods=['POST'])
def process_data():
    data = request.get_json()
    input_array = data['inputArrayy']
    capacity = data['capacityy']
    
    # Call your Python function that runs an algorithm on the input_array and capacity
    result = fcfs.page_faults(input_array, capacity)
    
    # Return the result as a JSON response
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="localhost", port=7000, debug=True)



