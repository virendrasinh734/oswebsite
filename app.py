from flask import Flask,render_template,jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import philosopher2
app=Flask(__name__)

@app.route('/')
def index():
    # ph=philt(s_no=2,p_01="Think",p_02="Think",p_03="Think",p_04="Think",p_05="Think")
    # db.session.add(ph)
    # db.session.commit()p
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
def fcfs():
    return render_template('fcfs.html')
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


app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///phil.db"
app.config['SQLALCHEMY_DATABASE_TRACK_MODIFICATIONS']=False

# db=SQLAlchemy(app)
# class philt(db.Model):
#     s_no=db.Column(db.Integer,primary_key=True)
#     p_01= db.Column(db.String(100), nullable =False)
#     p_02= db.Column(db.String(100), nullable =False)
#     p_03= db.Column(db.String(100), nullable =False)
#     p_04= db.Column(db.String(100), nullable =False)
#     p_05= db.Column(db.String(100), nullable =False)
#     tim=db.Column(db.DateTime, default=datetime.utcnow)

    # def __repr__(self) -> str:
    #     return f"{self.p_01} {self.p_02} {self.p_03} {self.p_04} {self.p_05}"

