from flask import Flask, render_template, request, send_file
import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from kmean_implementation import KMeans, generate_dataset, initial_capture
import os
import glob

# Path to the folder
folder_path = 'static/step_images/'

app = Flask(__name__)

# Global variable to hold the dataset
# data_points = []
kmeans = None
total_step = 0
data_points = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/initial')
def initial():
    global data_points
    num_points = int(request.args.get('numPoints', 100))
    
    data_points = generate_dataset(num_points)
    
    initial_capture(data_points)

    # Send the image back
    return send_file('static/initial_visualization.png')

@app.route('/step')
def step():
    step_number = int(request.args.get('step', 0))
    # Logic to determine the appropriate image for the step
    image_path = f'static/step_images/step_{step_number}.png'
    return send_file(image_path)

@app.route('/generate')
def generate():
    global kmeans
    global total_step
    k = int(request.args.get('k', 0))
    init_method = request.args.get('init_method', 'random')
    
    # Perform KMeans clustering
    kmeans = KMeans(data_points, k)
    total_step = kmeans.lloyds(init_method)  # Run the KMeans algorithm
    
    return str(total_step)

@app.route('/reset')
def reset():
    global kmeans
    kmeans = None 
    global total_step
    total_step = 0
    
    # Use glob to find all files in the folder
    files = glob.glob(os.path.join(folder_path, '*'))

    # Delete each file
    for file in files:
        os.remove(file)
        print(f"Deleted {file}")
    
    return send_file('static/initial_visualization.png')  # 이미지 파일 전송
    
@app.route('/newDataset')
def newDataSet():
    global kmeans
    kmeans = None 
    global total_step
    total_step = 0
    
    # Use glob to find all files in the folder
    files = glob.glob(os.path.join(folder_path, '*'))

    # Delete each file
    for file in files:
        os.remove(file)
        print(f"Deleted {file}")
        
    global data_points
    num_points = int(request.args.get('numPoints', 100))
    
    data_points = generate_dataset(num_points)
    
    initial_capture(data_points)

    # Send the image back
    return send_file('static/initial_visualization.png')


@app.route('/set_manual_points', methods=['POST'])
def set_manual_points():
    manual_points = request.json['points']
    global data_points  # Assuming data_points is the list where you want to store these points
    data_points = [(p['x'], p['y']) for p in manual_points]
    return {'status': 'success'}
