from flask import Flask
from flask import render_template

app = Flask(__name__,template_folder='../Frontend')


@app.route('/')
def index():
    return render_template('inicio_sesion.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1',debug=False)
    