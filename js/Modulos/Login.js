const loginApiUrl = 'https://localhost:7199/api/Auth/login';


document.getElementById('loginForm').addEventListener('submit', loginUsuario);

async function loginUsuario(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Por favor completa todos los campos.");
    return;
  }

  try {
    const response = await fetch(loginApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    const user = await response.json();
    localStorage.setItem('usuario', JSON.stringify(user));

    alert(`¡Bienvenido, ${user.email}!`);
    window.location.href = "index.html";
  } catch (error) {
    console.error(error);
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = error.message;
  }
}

