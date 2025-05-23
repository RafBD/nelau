// src/components/AuthForm.jsx
import React, { useState } from 'react';

function AuthForm({ type, onSubmit, isLoading, errorMessage, onToggleAuthMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, displayName);
  };

  const isLogin = type === 'login';

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.01]"> {/* Mejoramos el estilo de la tarjeta */}
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        {isLogin ? 'Bienvenido de Nuevo' : 'Únete a NeLau'}
      </h2>
      {errorMessage && (
        <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center text-sm">
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-6"> {/* Espaciado entre campos */}
        {!isLogin && (
          <div>
            <label htmlFor="displayName" className="block text-gray-700 text-sm font-semibold mb-2">
              Tu Nombre
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              placeholder="Ej. Ana"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
        </button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          {isLogin ? (
            <>
              ¿No tienes una cuenta?{' '}
              <button onClick={onToggleAuthMode} className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none transition duration-200">Regístrate aquí</button>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{' '}
              <button onClick={onToggleAuthMode} className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none transition duration-200">Inicia sesión aquí</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthForm;