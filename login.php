<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smart_traffic";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Start session
session_start();

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("SELECT id, password FROM register WHERE email = ?");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("s", $email);

    // Execute the statement
    $stmt->execute();
    $stmt->store_result();

    // Check if a user with the provided email exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $dbPassword);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $dbPassword)) {
            // Password is correct, start a session
            $_SESSION['user_id'] = $id;

            // Redirect to the main website page
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Invalid email or password.";
        }
    } else {
        // No user found with the provided email
        echo "Invalid email or password.";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
