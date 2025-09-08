import { useState } from "react";
import { useEffect } from "react";

const tabs = ['posts', 'comments', 'albums'];

function Content() {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState([]);
  const [type, setType] = useState('posts');

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(data => setPost(data));
  }, [type]);
  
  return (
    <div style={{ padding: '20px' }}>
      {tabs.map(tab => (
        <button 
          key={tab} 
          style={type === tab ? { color: 'red' } : {}}
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}

      <h2>useEffect Example</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}  
        placeholder="Set document title..."
      />
      <ul>
        {post.map(item => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;
