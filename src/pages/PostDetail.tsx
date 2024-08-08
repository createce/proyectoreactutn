import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api';
import '../styles/PostDetail.css'

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPost(id!).then((response) => {
      setPost(response.data);
    }).catch(() => {
      setError('Failed to load the post data. Please try again later.');
    });

    // Obtener una imagen aleatoria de Unsplash
    // Obtener una imagen aleatoria de Picsum
    const randomImageId = Math.floor(Math.random() * 1000); // Generar un ID de imagen aleatoria
    setImageUrl(`https://picsum.photos/id/${randomImageId}/800/600`);
  }, [id]);
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      <img src={imageUrl} alt="Random" className="post-image" />
      <p>{post.body}</p>
    </div>
  );
};

export default PostDetail;