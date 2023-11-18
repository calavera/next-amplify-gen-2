import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '@/amplify/data/resource';

// generate your data client using the Schema from your backend
const client = generateClient<Schema>();

export default function HomePage() {
  const [todos, setTodos] = useState<Schema['Todo'][]>([]);

  async function listTodos() {
    // fetch all todos
    const { data } = await client.models.Todo.list();
    setTodos(data);
  }

  useEffect(() => {
    listTodos();
  }, []);

return (
    <main>
      <h1>Hello, Amplify 👋</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
        <button onClick={() => {
          // create a new Todo with the following attributes
          const { errors, data: newTodo } = await client.models.Todo.create({
            // prompt the user to enter the title
            title: window.prompt("title"),
            description: window.prompt("description"),
            done: false,
            priority: 'medium'
          })
        }}>Create </button>
      </ul>
    </main>
  );
}
