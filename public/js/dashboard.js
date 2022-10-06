// listen for click and store event target in variable
// route user to edit view of clicked blog /blogs/:id/edit where id = clicked blogg
console.log("dashboard.js connected!");

document
    .querySelector('#blog-container')
    .addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        console.log(id);
        document.location.replace(`/blogs/edit/${id}`)
    });
//eventListener
// documen
//   .querySelector('[data-id='soemthing']')
//   .addEventListener('click', editHandler);