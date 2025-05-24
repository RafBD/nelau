// src/components/CreatePost.jsx
import React, { useState } from 'react';
import { db, auth } from '../firebase.config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function CreatePost() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError('Debes iniciar sesión para crear una publicación.');
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      setError('El contenido no pueden estar vacíos.');
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        content: content.trim(),
        createdAt: serverTimestamp()
      });
      setSuccess('¡Publicación creada con éxito!');
      setContent('');
    } catch (err) {
      console.error("Error al crear la publicación:", err);
      setError('Error al crear la publicación. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-200">

      {error && <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm">{error}</p>}
      {success && <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4 text-sm">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <label htmlFor="content" className="sr-only">Contenido</label>
          <textarea
            id="content"
            rows="1" // Reducimos las filas por defecto para que sea más compacto
            className="w-full border-b-2 border-gray-300 focus:border-violet-500 focus:outline-none placeholder-gray-500 transition duration-200 resize-none"
            placeholder="Comparte tu historia..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end"> {/* Botón a la derecha */}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;