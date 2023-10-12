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
  
  // Función para agregar una persona al array y al DOM
  function agregarPersona() {
    let nombre = nombreInput;
    let edad = edadInput;
    edad = parseInt(edad);
    if (!isNaN(edad) && edad >= 0) {
      const persona = crearPersona(nombre, edad);
      personas.push(persona);
  
      // Agregar la persona al DOM
      const personasLista = document.getElementById('personas-lista').querySelector('ul');
      const li = document.createElement('li');
      li.textContent = `Nombre: ${persona.nombre} - Edad: ${persona.edad}`;
      personasLista.appendChild(li);
      guardarPersonasEnLocalStorage(); // Guardar en localStorage
      alert("Persona agregada exitosamente.");
    } else {
      alert("Por favor, ingresa una edad válida.");
    }
  }
  
  // Función para guardar la lista de personas en localStorage
  function guardarPersonasEnLocalStorage() {
    localStorage.setItem('personas', JSON.stringify(personas));
  }
  
  // Función para cargar la lista de personas desde localStorage
  function cargarPersonasDesdeLocalStorage() {
    const personasJSON = localStorage.getItem('personas');
    if (personasJSON) {
      personas = JSON.parse(personasJSON);
      // Agregar las personas al DOM al cargar la página
      const personasLista = document.getElementById('personas-lista').querySelector('ul');
      personas.forEach(function (persona) {
        const li = document.createElement('li');
        li.textContent = `${persona.nombre} - Edad: ${persona.edad}`;
        personasLista.appendChild(li);
      });
    }}
  
  //Función para buscar un nombre y eliminarlo de la lista
  function buscarNombre() {
    let nombreBuscado = prompt("Ingresa el nombre de la persona que deseas buscar: ");
    let personaEncontrada = personas.find(persona => persona.nombre.toLowerCase() === nombreBuscado.toLowerCase());
  
    if (personaEncontrada) {
        let opcion = prompt(`Se ha encontrado a ${personaEncontrada.nombre} en la lista. Si desea eliminarla, presione 1. En caso contrario, presione 2`);
        switch (opcion) {
          case "1":
            // Opción para eliminar al usuario
            const index = personas.indexOf(personaEncontrada);
            if (index !== -1) {
              personas.splice(index, 1);
              alert(`Se ha eliminado a ${personaEncontrada.nombre} de la lista.`);
            }
            break;
          case "2": //Opción para dejar al usuario en la lista
            alert("No se ha eliminado a la persona.");
            break;
          default:
            alert("Opción inválida. Por favor, seleccione una opción válida.");
            break;
        }
    } else {
      alert("No se ha encontrado a la persona que busca");
    }
  }

  // Función para calcular el promedio de edades de las personas
  function calcularEdadPromedio() {
    if (personas.length === 0) {
      alert("No se han agregado personas.");
    } else {
      let sumaEdades = 0;
      for (const persona of personas) {
        sumaEdades += persona.edad;
      }
      const promedio = sumaEdades / personas.length;
      const resultadoPromedio = document.getElementById('resultado-promedio');
      resultadoPromedio.textContent = `El promedio de edad de la/s ${personas.length} persona/s registrada/s es de: ${promedio.toFixed(2)}`;
    }
  }
  
  // Llamamos a la función para cargar la lista de personas al inicio
  cargarPersonasDesdeLocalStorage();
