from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('../frontend/static', filename)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory('../backend/static', 'favicon.ico')

if __name__ == '__main__':
    app.run(debug=True)
