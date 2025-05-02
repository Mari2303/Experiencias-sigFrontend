const loginApiUrl = 'https://localhost:7199/api/User/login';

document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(loginApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const user = await response.json();
      alert(`Bienvenido, ${user.email}`);
      // Aquí puedes redirigir, guardar info en localStorage, etc.
      // window.location.href = '/dashboard.html';
    } else {
      const errorText = await response.text();
      alert("Error: " + errorText);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    alert("Error de conexión con el servidor.");
  }
});

