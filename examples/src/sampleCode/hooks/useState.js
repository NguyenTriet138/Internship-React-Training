import { useState } from "react";

function TodoList() {
  const [jobInput, setJobInput] = useState('');
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('jobs'));
    return storageJobs ?? [];
  });

  const handleSubmit = () => {
    if (jobInput.trim() !== '') {
      setJobs(prev => {
        const newJobs = [...prev, jobInput];
        localStorage.setItem('jobs', JSON.stringify(newJobs));
        return newJobs;
      });
      setJobInput('');
    }
  };

  const handleClear = () => {
    setJobs([]);
    localStorage.removeItem('jobs');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List Example</h2>

      <input
        value={jobInput}
        onChange={e => setJobInput(e.target.value)}
        placeholder="Enter your job..."
      />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>

      <button onClick={handleClear}>Clear All</button>
    </div>
  );
}

export default TodoList;
