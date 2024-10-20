import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Página de Inicio de Sesión</h1>
      <form>
        <label>
          Usuario:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
