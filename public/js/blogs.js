const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
   
    const description = document.querySelector('#project-desc').value.trim();
    console.log(name);
    if (name &&  description) {
      const response = await fetch(`/blogs`, {
        method: 'POST',
        body: JSON.stringify({ name,  description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      console.log(id);
      const response = await fetch(`/deleteblogs/${id}`, {
        method: 'DELETE',
       
      });
      console.log(response);
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  function myFunction() {
    window.location.href="/blogs";  
  }
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  