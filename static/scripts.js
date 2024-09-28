
let currentStep = 0;
let totalSteps = 0;


function generateInitialVisualization(){
    const url = `/initial`;

    const img = document.getElementById('data-visualization');
    img.src = url;
    img.style.display = 'block'; // Show the image
}

function stepThroughKMeans() {
    // Check if we need to initialize the KMeans process
    if (currentStep == 0) {
        const kClusters = document.getElementById('kClusters').value;
        const initMethod = document.getElementById('initMethod').value;
        
        // Create the URL for the initial generation request
        const url = `/generate?k=${kClusters}&init_method=${initMethod}`;
        
        // Make an AJAX request to get the total steps from the server
        fetch(url)
            .then(response => response.text()) // Assuming the server returns a plain text with totalSteps
            .then(data => {
                totalSteps = parseInt(data, 10); // Convert the response to an integer
                if (isNaN(totalSteps)) {
                    console.error("Failed to retrieve total steps from the server.");
                    return;
                }
                // Start the visualization process
                currentStep++;
                updateVisualization();
            })
            .catch(error => console.error("Error during initialization:", error));
    } else {
        // Check if we have reached the total steps
        if (currentStep >= totalSteps) {
            alert("KMeans has converged.");
            return; // Stop if we've reached the end
        }
        
        // Show the next step visualization
        currentStep++;
        updateVisualization();
    }
}
    

// Function to update the image for the current step
function updateVisualization() {
    const img = document.getElementById('data-visualization');
    img.src = `/step?step=${currentStep}`;
    img.style.display = 'block'; // Show the image
    currentStep++; // Increment the current step after updating the image
}

// Function to run to convergence
function runToConvergence() {
    // Implement functionality to complete the algorithm
    const kClusters = document.getElementById('kClusters').value;
    const initMethod = document.getElementById('initMethod').value;
}

// Function to generate a new dataset
function generateNewDataset() {
    resetAlgorithm();  // Reset any existing data
    generateInitialVisualization();  // Generate a new dataset
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

// function generateVisualization() {
//     const numPoints = document.getElementById('numPoints').value || 100;
//     const kClusters = document.getElementById('kClusters').value;
//     const initMethod = document.getElementById('initMethod').value;

//     // Create the URL for the image request
//     const url = `/generate?num_points=${numPoints}&k=${kClusters}&init_method=${initMethod}`;

//     // Update the image source to fetch the generated image
//     const img = document.getElementById('data-visualization');
//     img.src = url;
//     img.style.display = 'block'; // Show the image
// }