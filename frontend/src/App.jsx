// src/App.jsx
import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

import { auth } from './firebase.config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async (email, password, displayName) => {
    setLoadingAuth(true);
    setAuthError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    } catch (error) {
      console.error("Error al registrarse:", error);
      setAuthError(error.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogin = async (email, password) => {
    setLoadingAuth(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setAuthError(error.message);
    } finally {
      setLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    setAuthError('');
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setAuthError(error.message);
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
        Cargando NeLau...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      {user ? (
        <div className="flex flex-col min-h-screen">
          {/* Encabezado Fijo */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-indigo-700">NeLau</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium hidden sm:inline">
                Hola, {user.displayName || user.email.split('@')[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full text-sm shadow-md transition duration-300 ease-in-out"
              >
                Cerrar Sesión
              </button>
            </div>
          </header>

          {/* Contenido Principal: Centrado y con margen */}
          <main className="flex-grow p-4 md:p-8 max-w-xl mx-auto w-full">
            {/* El formulario de creación ahora va aquí, antes de la lista de posts */}
            <CreatePost />
            <PostList />
          </main>
        </div>
      ) : (
        // Pantalla de autenticación si no hay usuario
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
          <AuthForm
            type={isRegistering ? "register" : "login"}
            onSubmit={isRegistering ? handleRegister : handleLogin}
            isLoading={loadingAuth}
            errorMessage={authError}
            onToggleAuthMode={() => setIsRegistering(!isRegistering)}
          />
        </div>
      )}
    </div>
  );
}

export default App;