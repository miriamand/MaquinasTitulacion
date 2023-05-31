$(document).ready(function () {
    
    $(".confirm-text").on("click",function confirmDelete(itemId) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'This action will permanently delete the item',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform the DELETE request to delete the brand
            deleteBrand(itemId);
          }
        });
      }), function deleteBrand(itemId) {
        fetch(`/home/deletebrand/${itemId}`, {
          method: 'DELETE'
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire('Deleted!', 'The item has been deleted.', 'success');
            // Optionally, you can reload the page or update the UI here
          } else {
            Swal.fire('Error!', 'Failed to delete the item.', 'error');
          }
        })
        .catch((error) => {
          Swal.fire('Error!', 'An error occurred.', 'error');
          console.error(error);
        });
      }

})