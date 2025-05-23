// src/components/PostList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase.config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
      setLoading(false);
    }, (err) => {
      console.error("Error al obtener publicaciones:", err);
      setError('Error al cargar las publicaciones. Intenta de nuevo más tarde.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Cargando publicaciones...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6"> {/* Espacio entre cada tarjeta de publicación */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-8">No hay publicaciones todavía. ¡Sé el primero en compartir!</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center mb-3">
              {/* Avatar del usuario (Placeholder) */}
              <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg mr-3">
                {post.userName ? post.userName.charAt(0).toUpperCase() : '?'}{/* Primera letra del nombre */}
              </div>
              <div className='flex items-center flex-row justify-between w-full'>
                <p className="font-semibold text-gray-800">{post.userName}</p>
                <div>
                  <p className="text-xs text-gray-500">
                    {post.createdAt?.toDate().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}  | {post.createdAt?.toDate().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}h
                  </p>
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.content}</p>
            {/* Aquí podríamos añadir botones de "Me gusta", "Comentar", etc. en el futuro */}
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;