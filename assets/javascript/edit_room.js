document.addEventListener('DOMContentLoaded', function() {
    const editTypeField = document.querySelector('#editTypeText'); 
    const editTextField = document.querySelector('#editRoomText');
    const editPriceField = document.querySelector('#editPriceText');
    const editPhotoField = document.querySelector('#editPhotoFile');
    const editSubmitButton = document.querySelector('#editSubmitRoom');
    const createRoomForm = document.querySelector('#createRoomForm');
    const editRoomForm = document.querySelector('#editRoomForm');
    let editId;
    document.querySelectorAll('.editButton').forEach(function(button) {
        button.addEventListener('click', function(){
            editId = button.getAttribute('data-id');
            editTypeField.value = button.getAttribute('data-type');
            editTextField.value = button.getAttribute('data-text');
            editPriceField.value = button.getAttribute('data-price');
            createRoomForm.style.display = 'none';
            editRoomForm.style.display = 'flex';
            editRoomForm.scrollIntoView({ behavior: 'smooth' });
        })
    })

    editSubmitButton.addEventListener('click', function() {
        const formData = new FormData();
        formData.append('id', editId);
        formData.append('type', editTypeField.value);
        formData.append('text', editTextField.value);
        formData.append('price', editPriceField.value);
        if (editPhotoField.files[0]) {
            formData.append('photo', editPhotoField.files[0]);
        }

        fetch(editPath, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            editTypeField.value = '';
            editTextField.value = '';
            editPriceField.value = '';
            editPhotoField.value = '';
            editId = '';
            createRoomForm.style.display = 'flex';
            editRoomForm.style.display = 'none';
            alert(data.status);

        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});