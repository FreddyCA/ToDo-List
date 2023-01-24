console.log("hola") 


const formulario = document.getElementById('formulario');
const listaTareas = document.getElementById('lista-tareas');
const input = document.getElementById('input')
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

// puede ser un array(con find) o una coleccion de objetos(mejor para varias peticiones)
let tareas = {
    // 5: {
    //     id: 5,
    // texto: 'hola',
    // estado: false
    // }
}

// por si ya hay algo
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('tareas')) {
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }

    pintarTareas();
})


listaTareas.addEventListener('click', e => {
    btnAccion(e);
})



formulario.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target.querySelector('input').value)
    // console.log(input.value)

    setTarea(e);
})

const setTarea = e => {
    if (input.value.trim() === '') {
        // console.log('esta vacio')
        formulario.reset();
        input.focus();
        return
    }

    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    // console.log(tarea)

    tareas[tarea.id] = tarea
    // console.log(tareas);

    
    // console.log('diste click')
    formulario.reset();
    input.focus();

    pintarTareas();
}

const pintarTareas = () => {

    localStorage.setItem('tareas', JSON.stringify(tareas));


    if(Object.values(tareas).length === 0) {
        listaTareas.innerHTML = `
        <div class="alert alert-dark">
                No hay tareas pendientes
            </div>
        `
        return
    }

    listaTareas.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        // console.log(tarea)
        // primero se clona
        const clone = template.cloneNode(true);
        clone.querySelector('p').textContent = tarea.texto;

        if(tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary');
            clone.querySelectorAll('.fa-solid')[0].classList.replace('fa-circle-check', 'fa-rotate-left');
            clone.querySelector('p').style.textDecoration = 'line-through';
        }

        clone.querySelectorAll('.fa-solid')[0].dataset.id = tarea.id;
        clone.querySelectorAll('.fa-solid')[1].dataset.id = tarea.id;

        fragment.appendChild(clone);
    })
    listaTareas.appendChild(fragment)
}


const btnAccion = e => {
    // console.log(e.target.classList.contains('fa-circle-check'))
    if (e.target.classList.contains('fa-circle-check')) {
        // console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = true;
        pintarTareas();
        // console.log(tareas)
    }

    if (e.target.classList.contains('fa-circle-minus')){
        delete tareas[e.target.dataset.id];
        pintarTareas();
        // console.log(tareas)
    }
    if (e.target.classList.contains('fa-rotate-left')) {
        tareas[e.target.dataset.id].estado = false;
        pintarTareas();
    }


    

    e.stopPropagation();
    
}