
let currentStep = 0;
let totalSteps = 0;


function generateInitialVisualization(){
    const numPoints = document.getElementById('numPoints').value || 100;
    const url = `/initial?numPoints=${numPoints}&t=${new Date().getTime()}`;

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
                currentStep = 1;
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
                currentStep = totalSteps;
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
        currentStep = totalSteps;
        updateVisualization();
    }
}

// Function to generate a new dataset
function generateNewDataset() {

    const numPoints = document.getElementById('numPoints').value || 100;
    const url = `/newDataset?numPoints=${numPoints}&t=${new Date().getTime()}`;

    currentStep = 0;
    totalSteps = 0;

    const img = document.getElementById('data-visualization');
    img.src = url;
    img.style.display = 'block'; // Show the image

}

// Function to reset the algorithm
function resetAlgorithm() {
    // Reset necessary variables and UI components
    const url = `/reset`;

    const img = document.getElementById('data-visualization');
    img.src = url;
    img.style.display = 'block'; // Show the image
    currentStep = 0;
    totalSteps = 0;
}
document.getElementById('initMethod').addEventListener('change', function () {
    const selectedMethod = this.value;
    const canvas = document.getElementById('manualCanvas');
    const img = document.getElementById('data-visualization');

    if (selectedMethod === 'manual') {
        img.style.display = 'none';
        canvas.style.display = 'block';
        initManualSelection();
    } else {
        canvas.style.display = 'none';
        img.style.display = 'block';
    }
});

let manualPoints = [];
let kValue = 0;

function initManualSelection() {
    const canvas = document.getElementById('manualCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    manualPoints = [];
    
    // Retrieve the value of k from the input
    kValue = parseInt(document.getElementById('kClusters').value);

    if (isNaN(kValue) || kValue <= 0) {
        alert("Please enter a valid number of clusters (k) before selecting points.");
        return;
    }

    // Add event listener for clicking on the canvas
    canvas.addEventListener('click', selectPoint);
}

function selectPoint(event) {
    if (manualPoints.length >= kValue) {
        alert(`You have already selected ${kValue} points.`);
        return;
    }

    const canvas = document.getElementById('manualCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = canvas.getContext('2d');

    drawPoint(x, y, ctx);
    manualPoints.push({ x: x, y: y });

    console.log('Selected Points:', manualPoints);

    if (manualPoints.length === kValue) {
        alert(`You have selected all ${kValue} points.`);
        // Optionally, disable further clicks or start the KMeans algorithm
        canvas.removeEventListener('click', selectPoint);
    }
}

function drawPoint(x, y, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

// Function to send manual points to the server when KMeans starts
function startKMeansWithManualPoints() {
    if (manualPoints.length !== kValue) {
        alert(`Please select exactly ${kValue} points before starting the KMeans algorithm.`);
        return;
    }

    fetch('/set_manual_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ points: manualPoints })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Manual points sent successfully:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// Automatically generate visualization on page load
window.onload = function() {
    generateInitialVisualization();
};
