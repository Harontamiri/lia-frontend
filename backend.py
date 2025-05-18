from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    mensaje = data.get('mensaje', '')
    respuesta = f"IA responde: {mensaje}"
    return jsonify({'respuesta': respuesta})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
