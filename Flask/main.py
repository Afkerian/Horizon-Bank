from flask import Flask
from flask import render_template

PATH_FRONT = '../Angular/horizon-fe/src/'
app = Flask(__name__,template_folder=PATH_FRONT)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=False)