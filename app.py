from flask import Flask, render_template, request, send_file
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from kmean_implementation import KMeans, generate_dataset, initial_capture

app = Flask(__name__)

# Global variable to hold the dataset
# data_points = []
kmean = None
total_step = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/initial')
def initial():
    global data_points
    num_points = 100
    
    data_points = generate_dataset(num_points)
    
    initial_capture(data_points)

    # Send the image back
    return send_file('static/initial_visualization.png')  # 이미지 파일 전송

@app.route('/step')
def step():
    step_number = int(request.args.get('step', 0))
    # Logic to determine the appropriate image for the step
    image_path = f'static/step_images/step_{step_number}.png'
    return send_file(image_path)

@app.route('/generate')
def generate():
    k = int(request.args.get('k', 0))
    init_method = request.args.get('init_method', 'random')
    
    # Perform KMeans clustering
    kmeans = KMeans(data_points, k)
    total_step = kmeans.lloyds(init_method)  # Run the KMeans algorithm
    
    return str(total_step)
