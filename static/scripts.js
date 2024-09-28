function generateInitialVisualization(){
    
    const url = `/initial`;

    const img = document.getElementById('data-visualization');
    img.src = url;
    img.style.display = 'block'; // Show the image
}


function generateVisualization() {
    const numPoints = document.getElementById('numPoints').value || 100;
    const kClusters = document.getElementById('kClusters').value;
    const initMethod = document.getElementById('initMethod').value;

    // Create the URL for the image request
    const url = `/generate?num_points=${numPoints}&k=${kClusters}&init_method=${initMethod}`;

    // Update the image source to fetch the generated image
    const img = document.getElementById('data-visualization');
    img.src = url;
    img.style.display = 'block'; // Show the image
}

// Function to step through KMeans
function stepThroughKMeans() {
    // Implement step-by-step functionality here
}

// Function to run to convergence
function runToConvergence() {
    // Implement functionality to complete the algorithm
}

// Function to generate a new dataset
function generateNewDataset() {
    document.getElementById('numPoints').value = '';  // Clear the number of points
    generateVisualization();  // Generate a new dataset
}

// Function to reset the algorithm
function resetAlgorithm() {
    // Reset necessary variables and UI components
    document.getElementById('kClusters').value = '';
    document.getElementById('initMethod').selectedIndex = 0;
    const img = document.getElementById('data-visualization');
    img.src = ''; // Hide the image
}

// Automatically generate visualization on page load
window.onload = function() {
    generateInitialVisualization();
};