const form = document.getElementById('login-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting traditionally

    // Get the form data
   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Send a POST request to your backend login route
        const response = await fetch('http://localhost:7001/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Send data as JSON
            },
            body: JSON.stringify({ username, password }), // Send username and password
        });

        // Handle the response from the server
        const data = await response.json();
        if (response.ok) {
            // If login is successful, store the token
            localStorage.setItem('token', data.token);  // Store the token in localStorage or cookies

            // Now, attempt to access the /admin route to check if the user is an admin
            console.log('Token:', data.token);
            const adminResponse = await fetch('http://localhost:7001/api/users/admin', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`,  // Send token in Authorization header
                },
            });

            if (adminResponse.ok) {
                // If the admin route is accessible, redirect to the admin home page
                window.location.href = '/html/adminHome.html';  // Adjust the path if necessary
            } else {
                // If the user is not an admin or can't access the route
                alert('Access Denied or You are not an admin.');
            }
        } else {
            // If login fails, show an error message
            alert(data.message || 'Login failed');
        }

    } catch (error) {
        // Handle network errors
        console.error('Error logging in:', error);
    }
});