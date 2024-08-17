let path = [];
let draggingIndex = -1;
let gridSize = 10; // Default grid size is now 10
let fieldImage;
let canvasSize;
let panX = 0;
let panY = 0;
let isPanning = false;
let undoStack = [];

// URLs for the field images
const fieldImages = {
    v5rc: "https://raw.githubusercontent.com/NoozAbooz/210K-HighStakes-2025/V1/website/path/V5RC-HighStakes-H2H-2000x2000.png",
    "v5rc-skills": "https://raw.githubusercontent.com/NoozAbooz/210K-HighStakes-2025/V1/website/path/V5RC-HighStakes-Skills-2000x2000.png"
};

// Preload the field image based on selection
function preload() {
    updateFieldImage();
}

// Setup the canvas and initial configurations
function setup() {
    canvasSize = min(windowWidth, windowHeight - 60);
    let canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent('canvas-container');
    windowResized();
    document.getElementById('canvas-container').addEventListener('contextmenu', e => e.preventDefault()); // Disable right-click context menu

    // Setup for undo functionality
    window.addEventListener('keydown', handleUndo);

	document.getElementById('code-output').textContent = "// No waypoints set.";
}

// Draw loop to render the field, grid, and path
function draw() {
    background(45);
    translate(panX, panY);
    if (fieldImage) {
        image(fieldImage, 0, 0, width, height);
    }
    drawGrid();
    drawPath();

    if (document.getElementById('robot-visible').checked) {
        drawRobotOverlay();
    }
}

// Draw the grid lines, aligned with the field tiles
function drawGrid() {
    stroke(100, 100, 100, 15); // Updated stroke for grid lines
    for (let i = 0; i <= width; i += gridSize) {
        line(i, 0, i, height);
        line(0, i, width, i);
    }
}

// Handle resizing of the canvas when the window is resized
function windowResized() {
    let canvasSize = min(windowWidth, windowHeight - 60);
    resizeCanvas(canvasSize, canvasSize);
}

// Update the field image based on the selected field
function updateFieldImage() {
    let fieldType = document.getElementById('field-select').value;
    fieldImage = loadImage(fieldImages[fieldType]);
}

// Update grid density based on user input
function updateGridDensity() {
    gridSize = parseInt(document.getElementById('grid-density').value);
}

// Handle mouse pressed events for adding, dragging, or removing waypoints
function mousePressed() {
    if (isModalOpen) return; // Disable waypoint creation and editing if the modal is open

    if (mouseButton === LEFT) {
        if (isPanning) return;

        let x = Math.round((mouseX - panX) / gridSize) * gridSize;
        let y = Math.round((mouseY - panY) / gridSize) * gridSize;

        // Ensure waypoints are within field image boundaries
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
            draggingIndex = path.findIndex(p => dist(mouseX - panX, mouseY - panY, p.x, p.y) < 20); // No offset for grid center
            if (draggingIndex === -1) {
                path.push({
                    x,
                    y,
                    angle: 0,
                    forwards: true,
                    minSpeed: 0,
                    maxSpeed: 127,
                    timeout: 2000,
                    angularDirection: "auto"
                });
                undoStack.push([...path]); // Save state for undo
                generateCode();
            } else {
                openWaypointEditor(draggingIndex); // Open the editor if a waypoint is clicked
            }
        }
    } else if (mouseButton === RIGHT) {
        // Remove the waypoint if right-clicked within the halo
        path = path.filter(p => dist(mouseX - panX, mouseY - panY, p.x, p.y) >= 20); // No offset for grid center
        undoStack.push([...path]); // Save state for undo
        generateCode();
    } else if (mouseButton === CENTER) {
        isPanning = true;
    }
}

// Handle dragging of waypoints
function mouseDragged() {
    if (isPanning) {
        panX += movedX;
        panY += movedY;
    } else if (draggingIndex !== -1) {
        let x = Math.round((mouseX - panX) / gridSize) * gridSize;
        let y = Math.round((mouseY - panY) / gridSize) * gridSize;

        // Ensure waypoints remain within field image boundaries
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
            path[draggingIndex].x = x;
            path[draggingIndex].y = y;
            generateCode();
        }
    }
}

// Stop dragging when the mouse is released
function mouseReleased() {
    if (draggingIndex !== -1) {
        undoStack.push([...path]); // Save state for undo
        draggingIndex = -1;
    }
    isPanning = false;
}

// Handle undo operation (Ctrl + Z)
function handleUndo(event) {
    if (event.ctrlKey && event.key === 'z') {
        if (undoStack.length > 0) {
            path = undoStack.pop();
            generateCode();
        }
    }
}

// Draw the path, waypoints, and direction indicators
function drawPath() {
    if (path.length > 0) {
        stroke(0, 255, 255);
        strokeWeight(3);
        noFill();
        beginShape();
        for (let point of path) {
            vertex(point.x + gridSize / 2, point.y + gridSize / 2);
        }
        endShape();

        for (let i = 0; i < path.length; i++) {
            let waypoint = path[i];
            let x = waypoint.x + gridSize / 2;
            let y = waypoint.y + gridSize / 2;

            // Draw waypoint halos
            if (i === 0) {
                fill(255, 100, 100, 150); // Red translucent halo for the starting waypoint
            } else {
                fill(255, 255, 255, 100); // Translucent white halo for other waypoints
            }
            noStroke();
            ellipse(x, y, 40); // 40px diameter halo

            // Draw the direction line for each waypoint based on the angle (compass heading)
            let angleInRadians = radians(waypoint.angle); // Convert to radians
            let lineLength = 20; // Length of the direction line from center to circumference
            let lineX = x + lineLength * sin(angleInRadians); // Use sin() for X considering compass heading
            let lineY = y - lineLength * cos(angleInRadians); // Use cos() for Y considering compass heading

            // Set the line color to white
            stroke(255); // White color
            strokeWeight(2);
            line(x, y, lineX, lineY); // Draw the direction line

            // Draw waypoint labels on top of halos and lines
            fill(0);
            textAlign(CENTER, CENTER);
            text(i + 1, x, y);
        }
    }
}

// Function to draw the robot overlay when hovering near the path
function drawRobotOverlay() {
    if (path.length < 2) return; // No path to hover over if there are fewer than 2 waypoints

    const inchesToPixels = canvasSize / 148.625;
    const robotWidth = parseInt(document.getElementById('robot-width').value) * inchesToPixels;
    const robotHeight = parseInt(document.getElementById('robot-height').value) * inchesToPixels;

    let closestPoint = null;
    let closestAngle = 0;
    let minDistance = Infinity;

    // Iterate through each segment of the path
    for (let i = 0; i < path.length - 1; i++) {
        let p1 = path[i];
        let p2 = path[i + 1];

        // Get the closest point on the line segment to the mouse
        let closest = getClosestPointOnSegment(
            createVector(p1.x + gridSize / 2, p1.y + gridSize / 2),
            createVector(p2.x + gridSize / 2, p2.y + gridSize / 2),
            createVector(mouseX - panX, mouseY - panY)
        );

        // Calculate the distance from the mouse to the closest point
        let distance = dist(mouseX - panX, mouseY - panY, closest.x, closest.y);

        // Calculate the angle of the path segment
        let angle = atan2(p2.y - p1.y, p2.x - p1.x);

        // Update the closest point and angle if this one is nearer
        if (distance < minDistance) {
            minDistance = distance;
            closestPoint = closest;
            closestAngle = angle;
        }
    }

    // If the mouse is near enough to the path, draw the rectangle and direction indicator
    if (closestPoint && minDistance < 30) { // Adjust this threshold for sensitivity
        push();
        translate(closestPoint.x, closestPoint.y);
        rotate(closestAngle);
        fill(100, 100, 100, 150); // Grey translucent fill
        noStroke();
        rectMode(CENTER);
        rect(0, 0, robotWidth, robotHeight); // Draw the rectangle centered at the closest point

        // Draw direction indicator rotated 90 degrees clockwise
        stroke(255, 0, 0); // Red color for the direction indicator
        strokeWeight(3);
        line(0, 0, robotWidth / 2, 0); // Line extending from the center to the right side of the robot
        pop();
    }
}

// Function to get the closest point on a line segment
function getClosestPointOnSegment(p1, p2, p) {
    let v = p5.Vector.sub(p2, p1);
    let u = p5.Vector.sub(p, p1);
    let t = constrain(u.dot(v) / v.dot(v), 0, 1); // Get the projection factor, constrained between 0 and 1
    return p5.Vector.add(p1, v.mult(t));
}

// Clear the path and update the code output
function clearPath() {
    path = [];
    undoStack.push([...path]); // Save state for undo
    generateCode();
}

// Reset the field view
function resetView() {
    panX = 0;
    panY = 0;
}

// Generate the autonomous path code and display it in the output box
function generateCode() {
    if (path.length === 0) {
        document.getElementById('code-output').textContent = "// No waypoints set.";
        return;
    }
    
    if (loadedSlotIndex !== null) {
        saveSlots[loadedSlotIndex].waypoints = [...path]; // Overwrite waypoints
        saveSlots[loadedSlotIndex].modified = new Date().toLocaleString(); // Update modified date
        saveSlotsToLocalStorage(); // Save to local storage
        renderSaveSlots(); // Re-render save slots
    }

    const formatSelect = document.getElementById('format-select');
    const selectedConfig = formatSelect.value;

    if (selectedConfig === 'libks-mtpoint') {
        let firstWaypoint = path[0];
        const pixelsToInches = 148.625 / canvasSize; // Dynamic conversion factor

        let code = "// libKS MTPoint v0.1\n";
        code += `// Starting point: (${((firstWaypoint.x - (canvasSize / 2)) * pixelsToInches).toFixed(2)} in, ${((firstWaypoint.y - (canvasSize / 2)) * pixelsToInches).toFixed(2)} in)\n`;
        //code += `chassis.set_drive_pid(${path.length * 10}, 100, 1000, 0, 0.0, 0.0);\n`;

        for (let i = 0; i < path.length; i++) {
            let relativeX = (path[i].x - firstWaypoint.x) * pixelsToInches;
            let relativeY = (path[i].y - firstWaypoint.y) * pixelsToInches;

            // Rotate coordinates based on the first waypoint's orientation
            let angle = firstWaypoint.angle;
            let rotatedX = relativeX * cos(angle) - relativeY * sin(angle);
            let rotatedY = -(relativeX * sin(angle) + relativeY * cos(angle));

            if (path[i].angularDirection === "auto") {
                code += `chassis.turnToHeading(${path[i].angle}, ${path[i].timeout}); // Point ${i + 1}\n`;
            } else if (path[i].angularDirection === "clockwise") {
                code += `chassis.turnToHeading(${path[i].angle}, ${path[i].timeout}, {.direction = AngularDirection::CW_CLOCKWISE}); // Point ${i + 1}\n`;
            } else if (path[i].angularDirection === "counter-clockwise") {
                code += `chassis.turnToHeading(${path[i].angle}, ${path[i].timeout}, {.direction = AngularDirection::CCW_COUNTERCLOCKWISE}); // Point ${i + 1}\n`;
            }

            code += `chassis.moveToPoint(${rotatedX.toFixed(2)}, ${rotatedY.toFixed(2)}, ${path[i].timeout}, {.forwards = ${path[i].forwards}, .maxSpeed = ${path[i].maxSpeed}, .minSpeed = ${path[i].minSpeed}}); // Point ${i + 1}\n`;
            document.getElementById('code-output').textContent = code;
        }
    }

    //console.log(path);
}

function reflectPathVertically() {
    const canvasMidX = canvasSize / 2;

    path.forEach(waypoint => {
        // Reflect the X-coordinate across the middle of the canvas
        const distanceFromMid = waypoint.x - (canvasMidX - 10);
        waypoint.x = canvasMidX - distanceFromMid;

        // Reflect the angle vertically
        waypoint.angle = (360 - waypoint.angle) % 360; // Invert the angle vertically
    });

    // Update the code and re-render the changes
    generateCode();
}

// Copy the generated code to the clipboard
function copyCodeToClipboard() {
    const codeOutput = document.getElementById('code-output');
    const textArea = document.createElement('textarea');
    textArea.value = codeOutput.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Show toast notification
    showToast("Code copied to clipboard!");
}

// Function to display the toast notification with customizable text
function showToast(message = "Placeholder Text") {
    const toast = document.getElementById('toast');
    toast.textContent = message; // Update the toast text based on the argument
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
    setTimeout(() => { // delay code generation on load to give time for trig functions to load???
        // otherwise cos function is not loaded and bad things happen
        generateCode();
    }, 200);
}
