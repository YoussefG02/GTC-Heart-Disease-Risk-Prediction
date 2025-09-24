document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('predictForm');
    const resultDiv = document.getElementById('result');
    const loadingSpinner = document.getElementById('loading');
    const submitBtn = document.querySelector('button[type="submit"]');

    // Add input event listeners for validation
    const inputs = form.querySelectorAll('input[type="number"], select');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateInput(this);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all inputs before submission
        let isValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showResult('Please fill in all fields with valid values', 'error');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        loadingSpinner.style.display = 'block';
        resultDiv.style.display = 'none';

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Convert all values to numbers
            Object.keys(data).forEach(key => {
                data[key] = parseFloat(data[key]);
            });

            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.prediction === 1) {
                showResult("High Risk of Heart Disease", "risky");
            } else {
                showResult("Low Risk of Heart Disease", "safe");
            }
        } catch (error) {
            console.error('Prediction error:', error);
            showResult("Error occurred while making prediction. Please try again.", "error");
        } finally {
            // Reset loading state
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;

        if (input.required && value === '') {
            isValid = false;
        } else if (input.type === 'number') {
            isValid = !isNaN(value) && isFinite(value);
        }

        if (isValid) {
            input.style.borderColor = '#28a745';
            input.style.boxShadow = '0 0 0 0.2rem rgba(40, 167, 69, 0.25)';
        } else if (value === '') {
            input.style.borderColor = '#ddd';
            input.style.boxShadow = 'none';
        } else {
            input.style.borderColor = '#dc3545';
            input.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        }

        return isValid;
    }

    function showResult(message, type) {
        resultDiv.textContent = message;
        resultDiv.className = ''; // Reset classes

        switch (type) {
            case 'risky':
                resultDiv.classList.add('result-risky');
                break;
            case 'safe':
                resultDiv.classList.add('result-safe');
                break;
            case 'error':
                resultDiv.classList.add('result-risky');
                break;
        }

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});