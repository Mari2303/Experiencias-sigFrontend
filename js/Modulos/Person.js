const personApiUrl = 'https://localhost:7199/api/Person';
const userApiUrl = 'https://localhost:7199/api/User';
const roleUserApiUrl = 'https://localhost:7199/api/UserRol'; // Endpoint para asignar rol

document.getElementById('personForm').addEventListener('submit', crearPersonaYUsuario);

async function crearPersonaYUsuario(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const documentNumber = document.getElementById('document').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  const codeDane = document.getElementById('codeDane').value;

  if (!name || !surname || !documentNumber || !email || !password) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  const personaData = {
    name: name,
    surname: surname,
    document: documentNumber,
    password: password,
    email: email,
    phone: phone,
    codeDane: codeDane,
    active: true
  };

  try {
    // Paso 1: Crear Persona
    const personaResponse = await fetch(personApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(personaData)
    });

    if (!personaResponse.ok) {
      throw new Error('Error al crear la persona.');
    }

    const personaCreada = await personaResponse.json();
    const personId = personaCreada.id;

    // Paso 2: Crear Usuario
    const userData = {
      email: email,
      password: password,
      personId: personId, // en lugar de { person: { id: personId } }
      active: true
    };
    

    const userResponse = await fetch(userApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!userResponse.ok) {
      throw new Error('Error al crear el usuario.');
    }

    const usuarioCreado = await userResponse.json();
    const userId = usuarioCreado.id;

    // Paso 3: Asignar rol predeterminado
    const UserRolData = {
      userId: userId,
      TypeRol : "profesor",
      rolId: 15,
      active: true
    };

    const roleResponse = await fetch(roleUserApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(UserRolData)
    });

    if (!roleResponse.ok) {
      throw new Error('Error al asignar el rol al usuario.');
    }

    alert("¡Registro exitoso!");
    document.getElementById('personForm').reset();
    window.location.href = "login.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}
