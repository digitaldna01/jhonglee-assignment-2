from flask import Flask, render_template, request, send_file
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from kmean_implementation import KMeans, generate_dataset, initial_capture

app = Flask(__name__)

# Global variable to hold the dataset
data_points = None
kmean = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/initial')
def initial():
    num_points = 100
    
    data_points = generate_dataset(num_points)
    
    initial_capture(data_points)

    # Send the image back
    return send_file('static/initial_visualization.png')  # 이미지 파일 전송


@app.route('/generate')
def generate():
    num_points = int(request.args.get('num_points', 100))
    k = int(request.args.get('k', 0))
    init_method = request.args.get('init_method', 'random')
    
    # Perform KMeans clustering
    kmeans = KMeans(data, k)
    kmeans.lloyds(init_method)  # Run the KMeans algorithm
