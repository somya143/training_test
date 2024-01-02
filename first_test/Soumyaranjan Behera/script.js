function validateForm() {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('emailError').innerHTML = 'Invalid email format';
      return false;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        document.getElementById('passwordError').innerHTML = 'Password must be at least 8 characters, contain at least one uppercase letter, and one symbol (!@#$%^&*(),.?":{}|<>)';
        return false;
    }
    alert('Login successful!');
    
}
