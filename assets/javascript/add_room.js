document.addEventListener('DOMContentLoaded', function() { 
    const textField = document.querySelector('#roomText');
    const priceField = document.querySelector('#priceText');
    const submitButton = document.querySelector('#addRoom');

    submitButton.addEventListener('click', function() {
        payload = {
            text: textField.value,
            price: priceField.value
        };
        fetch(addPath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        })
    });
});