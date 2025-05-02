const personApiUrl = 'https://localhost:7199/api/Person';
const userApiUrl = 'https://localhost:7199/api/User'; // ajusta según tu backend

async function crearPersonaYUsuario(event) {
  event.preventDefault();

  // Recolectar valores del formulario
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const documentNumber = document.getElementById('document').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const codeDane = document.getElementById('codeDane').value;

  // Validar campos básicos
  if (!name || !surname || !documentNumber || !email || !password) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  // Crear objeto Persona
  const personaData = {
    name: name,
    surname: surname,
    document: documentNumber,
    email: email,
    phone: phone,
    codeDane: codeDane,
    active: true
  };

  try {
    // 1. Crear la persona
    const personaResponse = await fetch(personApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personaData)
    });

    if (!personaResponse.ok) {
      const error = await personaResponse.text();
      throw new Error("Error al crear persona: " + error);
    }

    const personaCreada = await personaResponse.json();
    const personaId = personaCreada.id; // Asegúrate que tu backend devuelve el ID

    // 2. Crear el usuario vinculado con el ID de persona
    const userData = {
      email: email,
      password: password,
      personId: personaId, // este campo debe existir en tu backend
      active: true
    };

    const userResponse = await fetch(userApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (!userResponse.ok) {
      const error = await userResponse.text();
      throw new Error("Error al crear usuario: " + error);
    }

    alert("Persona y usuario registrados con éxito.");
    document.getElementById('personForm').reset();
    // Puedes recargar la lista si tienes una función cargarPersonas()
    cargarPersonas?.();

  } catch (error) {
    console.error(error);
    alert(error.message);
  }


  
}
