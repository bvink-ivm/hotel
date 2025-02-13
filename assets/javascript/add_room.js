document.addEventListener('DOMContentLoaded', function() {
    const typeField = document.querySelector('#typeText'); 
    const textField = document.querySelector('#roomText');
    const priceField = document.querySelector('#priceText');
    const photoField = document.querySelector('#photoFile');
    const submitButton = document.querySelector('#addRoom');

    submitButton.addEventListener('click', function() {
        const formData = new FormData();
        formData.append('type', typeField.value);
        formData.append('text', textField.value);
        formData.append('price', priceField.value);
        if (photoField.files[0]) {
            formData.append('photo', photoField.files[0]);
        }

        fetch(addPath, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            typeField.value = '';
            textField.value = '';
            priceField.value = '';
            photoField.value = '';
            alert(data.status);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});