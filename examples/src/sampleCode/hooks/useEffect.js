import { useState } from "react";
import { useEffect } from "react";

function Content() {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState([]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPost(data));
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>useEffect Example</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}  
        placeholder="Set document title..."
      />
      <ul>
        {post.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
