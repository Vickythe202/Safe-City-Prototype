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

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstName = $_POST['fname'];
    $lastName = $_POST['lname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $role = $_POST['role'];
    $address = $_POST['address'];

    // Check if the email already exists in the database
    $check_stmt = $conn->prepare("SELECT id FROM register WHERE email = ?");
    if (!$check_stmt) {
        die("Prepare failed: " . $conn->error);
    }
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        // Email already exists, handle accordingly (e.g., show error message)
        echo "Error: Email already exists.";
    } else {
        // Email does not exist, proceed with insertion
        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and bind the SQL statement for insertion
        $insert_stmt = $conn->prepare("INSERT INTO register (first_name, last_name, email, password, phone_number, role, address) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if (!$insert_stmt) {
            die("Prepare failed: " . $conn->error);
        }
        $insert_stmt->bind_param("sssssss", $firstName, $lastName, $email, $hashedPassword, $phone, $role, $address);

        // Execute the insertion statement
        if ($insert_stmt->execute()) {
            // Redirect to the main website page
            header("Location: dashboard.php");
            exit();
        } else {
            echo "Error: " . $insert_stmt->error;
        }

        // Close the insertion statement
        $insert_stmt->close();
    }

    // Close the check statement
    $check_stmt->close();
    
    // Close the database connection
    $conn->close();
}
?>
