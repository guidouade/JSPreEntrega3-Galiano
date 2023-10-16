// Función para crear una persona
function crearPersona(nombre, edad) {
    return { //Esta función devuelve un objeto con las propiedades nombre y edad, que se igualan a los valores pasados ​​como argumentos.
      nombre: nombre,
      edad: edad,
    };
  }
  
  // Array para almacenar las personas
  let personas = [];
  
  // Botón para agregar una persona
  const agregarPersonaBtn = document.getElementById('agregar-persona'); //Se obtiene un elemento de botón del documento con el ID 'agregar-persona'.
  agregarPersonaBtn.addEventListener('click', agregarPersona); //Se agrega un oyente de eventos al botón "Agregar Persona" para que llame a la función agregarPersonacuando se hace clic en él.
  
  // Botón para calcular el promedio
  const calcularPromedioBtn = document.getElementById('calcular-promedio'); //Se obtiene un elemento de botón del documento con el ID 'calcular-promedio'.
  calcularPromedioBtn.addEventListener('click', calcularEdadPromedio); //Se agrega un oyente de eventos al botón "Calcular Promedio" para que llame a la función calcularEdadPromediocuando se hace clic en él.
  
  // Función para agregar una persona al array y al DOM
  function agregarPersona() {
    const nombreInput = document.getElementById('nombreInput').value; //Obtiene el valor del elemento de entrada de texto con el ID 'nombreInput' y lo almacena en la variable nombreInput.
    const edadInput = document.getElementById('edadInput').value;
    let nombre = nombreInput; //Almacena el valor de nombreInput en una llamada variable nombre.
    let edad = edadInput;
    edad = parseInt(edad); //Convierte edad a un número entero utilizando parseInt
    if (!isNaN(edad) && edad >= 0) { //Verifica si edad no es un NaN (no es un número) y si es mayor o igual a cero.
      const persona = crearPersona(nombre, edad); //Llama a la función crearPersona para crear un objeto de persona con nombre y edad y lo almacena en la variable persona.
      personas.push(persona); //Agrega el objeto personaal arreglo personas.
      renderizarPersonas() //Llama a la función renderizarPersonaspara actualizar la lista de personas en el DOM.
      guardarPersonasEnLocalStorage(); //Llama a la función guardarPersonasEnLocalStorage para almacenar los datos en el almacenamiento local del navegador.
      alert ("Persona agregada exitosamente");
    } else {
      alert ("Por favor, ingresa una edad válida")
    }
  }
      
  
  
  
const eliminarPersona = (nombre) => {
  const persona = personas.find (persona => persona.nombre === nombre);
  personas.splice (personas.indexOf(persona), 1);
  guardarPersonasEnLocalStorage();
  renderizarPersonas()
};
   
function renderizarPersonas() {
  const personasLista = document.getElementById('personas-lista').querySelector('ul');
  personasLista.innerHTML = ''; //limpiar la lista
  
    
  personas.forEach((persona) => {
    const li = document.createElement ('li');
    li.textContent = `${persona.nombre} - ${persona.edad} años`;
  
      //Crear un botón para eliminar
      const btnEliminar = document.createElement ('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => eliminarPersona(persona.nombre)); //Se agrega un oyente de eventos al botón "Eliminar" para que llame a la función eliminarPersona se hace clic en él.
  
  
      li.appendChild(btnEliminar);
      personasLista.appendChild(li);
    });
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
        li.textContent = `${persona.nombre} - ${persona.edad} años`;
        personasLista.appendChild(li);
      });
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
