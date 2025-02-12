document.addEventListener('DOMContentLoaded', function() {
    const typeField = document.querySelector('#typeText'); 
    const textField = document.querySelector('#roomText');
    const priceField = document.querySelector('#priceText');
    const submitButton = document.querySelector('#addRoom');

    submitButton.addEventListener('click', function() {
        payload = {
            type: typeField.value,
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
        .then(data => {
            typeField.value = '';
            textField.value = '';
            priceField.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
        })
    });
});