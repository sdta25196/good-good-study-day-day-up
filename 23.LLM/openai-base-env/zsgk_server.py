from flask import Flask, render_template,request
from zsgk_llmapi import zsgkFunctionCalling

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test', methods=['GET'])
def test_endpoint():
    q = request.args.get('q')
    res = zsgkFunctionCalling(q)
    return res

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)
