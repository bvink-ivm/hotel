document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.deleteButton').forEach(function(button) {
        button.addEventListener('click', function(){
            const deleteId = button.getAttribute('data-id');
            fetch(deletePath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: deleteId })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.status);
            })
            .catch(error => {
                console.error('Error:', error);
            })
        })
    })
});