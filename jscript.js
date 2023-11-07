// Función para crear una persona
function crearPersona(nombre, edad) {
  return {
    nombre: nombre,
    edad: edad,
  };
}

// Array para almacenar las personas
let personas = [];

// Botón para agregar una persona
const agregarPersonaBtn = document.getElementById('agregar-persona');
agregarPersonaBtn.addEventListener('click', agregarPersona);

// Botón para calcular el promedio
const calcularPromedioBtn = document.getElementById('calcular-promedio');
calcularPromedioBtn.addEventListener('click', calcularEdadPromedio);

// URL de la API o archivo JSON externo
const dataUrl = 'api.json';

// Función para agregar una persona al array y al DOM
function agregarPersona() {
  const nombreInput = document.getElementById('nombreInput').value;
  const edadInput = document.getElementById('edadInput').value;
  let nombre = nombreInput;
  let edad = edadInput;
  edad = parseInt(edad);

  if (!isNaN(edad) && edad >= 0) {
    const persona = crearPersona(nombre, edad);
    personas.push(persona);
    renderizarPersonas();
    guardarPersonasEnServidor(); // Envía datos a la API o archivo JSON
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal',
      text: 'Introduce una edad válida',
    });
  }
}

const eliminarPersona = (nombre) => {
  const persona = personas.find((persona) => persona.nombre === nombre);
  personas.splice(personas.indexOf(persona), 1);
  guardarPersonasEnServidor(); // Actualiza los datos en api.json
  renderizarPersonas();
};

function renderizarPersonas() {
  const personasLista = document.getElementById('personas-lista').querySelector('ul');
  personasLista.innerHTML = '';

  personas.forEach((persona) => {
    const li = document.createElement('li');
    li.textContent = `${persona.nombre} - ${persona.edad} años`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.addEventListener('click', () => eliminarPersona(persona.nombre));

    li.appendChild(btnEliminar);
    personasLista.appendChild(li);
  });
}

// Función para guardar la lista de personas en el servidor (API o archivo JSON)
function guardarPersonasEnServidor() {
  fetch(dataUrl, {
    method: 'PUT', // Utiliza 'PUT' para actualizar los datos
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(personas),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Datos enviados al servidor con éxito.');
      } else {
        console.error('Error al enviar los datos al servidor.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Función para cargar la lista de personas desde el servidor (API o archivo JSON)
function cargarPersonasDesdeServidor() {
  fetch(dataUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al cargar los datos del servidor');
      }
    })
    .then((data) => {
      personas = data;
      renderizarPersonas();
      console.log('Datos cargados desde el servidor:', personas);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function calcularEdadPromedio() {
  if (personas.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'No se han agregado personas',
      text: 'Inténtalo nuevamente',
    });
  } else {
    let sumaEdades = 0;
    for (const persona of personas) {
      sumaEdades += persona.edad;
    }
    const promedio = sumaEdades / personas.length;
    const resultadoPromedio = document.getElementById('resultado-promedio');
    resultadoPromedio.textContent = `El promedio de edad de las ${personas.length} personas registradas es de: ${promedio.toFixed(2)}`;
  }
}

// Llamamos a la función para cargar la lista de personas desde el servidor al inicio
cargarPersonasDesdeServidor();
