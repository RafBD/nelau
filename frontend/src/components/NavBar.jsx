import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';


function NavBar () {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    setAuthError('');
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setAuthError(error.message);
    }
  };

  // Muestra un estado de carga o un mensaje si el usuario aún no se ha cargado
  if (loadingAuth) {
    return <div>Cargando navegación...</div>;
  }

  // Si no hay usuario autenticado, puedes renderizar algo diferente o null
  if (!user) {
    return null; // O un navbar para usuarios no autenticados, si lo necesitas
  }

  return (
    <div className='bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10'>
      <h1 className="text-2xl font-bold text-purple-700">NeLau</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium hidden sm:inline">
          Hola, {user.displayName || user.email.split('@')[0]}
        </span>
        <button
          onClick={handleLogout}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  )
}

export default NavBar;