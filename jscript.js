// Función para crear una persona
function crearPersona(nombre, edad) {
    return {
        nombre: nombre,
        edad: edad,
    };
}

// Array para almacenar las personas
const personas = [];

// Función para agregar una persona al array
function agregarPersona() {
    let nombre = prompt("Ingresa el nombre de la persona:");
    let edad = prompt("Ingresa la edad de la persona:");
    edad = parseInt(edad);

    if (!isNaN(edad) && edad >= 0) {
        const persona = crearPersona(nombre, edad);
        personas.push(persona); //Agrega a la persona a la lista de personas
        alert("Persona agregada exitosamente.");
    } else {
        alert("Por favor, ingresa una edad válida.");
    }
}

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
            sumaEdades += persona.edad; //Se agrega una edad al contador
        }

        const promedio = sumaEdades / personas.length; //Fórmula para calcular el promedio de edad
        alert("El promedio de edades de las " + personas.length + " personas registradas es: " + promedio.toFixed(2));
    }
}

// Llamamos a la función para comenzar el simulador
alert("Este simulador te ayudará a calcular el promedio de edad de las personas");

let ejecutarSimulador = true;

while (ejecutarSimulador) {
    let opcion = prompt("Seleccione una opción:\n1. Agregar persona\n2. Calcular edad promedio\n3. Buscar nombre\n4. Salir");

    switch (opcion) {
        case "1":
            agregarPersona();
            break;
        case "2":
            calcularEdadPromedio();
            break;
        case "3":
            buscarNombre();
            break;
        case "4":
            alert("Saliendo del simulador.");
            ejecutarSimulador = false; // Cambia la variable a false para salir del bucle
            break;
        default:
            alert("Opción inválida. Por favor, seleccione una opción válida.");
    }
}