import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();

  return (
    <div>
      <h1>Blog Post {id}</h1>
      {/* Fetch and display the blog post based on the id */}
    </div>
  );
}

export default BlogPost;
