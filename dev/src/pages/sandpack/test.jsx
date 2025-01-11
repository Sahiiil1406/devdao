import React from 'react';
import CodeEditorWithTests from './x.jsx';
//Wolfram--->maths(Image recogition)
// const initialFiles = {
//   'App.js': {
//     code: `import React from 'react';

//     function App() {
//       return <h1>Hello, world!</h1>;
//     }

//     export default App;
//     `,
//   },
//   'App.test.js': {
//     code: `import { render, screen } from '@testing-library/react';
//     import '@testing-library/jest-dom';
//     import App from './App';

//     test('renders hello world', () => {
//       render(<App />);
//       const linkElement = screen.getByText(/hello, world!/i);
//       expect(linkElement).toBeInTheDocument();
//     });
//     `,
//   },
// };
const initialFiles = {
  'App.js': {
    code: `import React, { useEffect, useState } from 'react';

    function App() {
      const [todo, setTodo] = useState(null);

      useEffect(() => {
        const fetchTodo = async () => {
          try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await response.json();
            setTodo(data);
          } catch (error) {
            console.error('Failed to fetch todo:', error);
          }
        };

        fetchTodo();
      }, []);

      return (
        <div>
          <nav style={styles.navbar} aria-label="Main Navigation">
            <h1>DevDAO</h1>
          </nav>
          <main style={styles.main}>
            {todo ? (
              <div data-testid="todo-item">
                <h2>Todo Item</h2>
                <p><strong>Title:</strong> {todo.title}</p>
                <p><strong>Completed:</strong> {todo.completed ? 'Yes' : 'No'}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </main>
        </div>
      );
    }

    const styles = {
      navbar: {
        backgroundColor: 'red',
        padding: '1rem',
        textAlign: 'center',
      },
      main: {
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
      },
    };

    export default App;
    `,
    hidden: false
  },
  'App.test.js': {
    code: `import { render, screen, waitFor } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import App from './App';

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            userId: 1,
            id: 1,
            title: 'delectus aut autem',
            completed: false,
          }),
      })
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders DevDAO in the navbar', () => {
      render(<App />);
      const navbarTitle = screen.getByText(/DevDAO/i);
      expect(navbarTitle).toBeInTheDocument();
    });

    test('navbar has red background color', () => {
      render(<App />);
      const navbar = screen.getByRole('navigation', { name: /main navigation/i });
      expect(navbar).toHaveStyle('background-color: red');
    });

    test('fetches and displays the todo item', async () => {
      render(<App />);

      // Verify loading text is present initially
      expect(screen.getByText(/loading/i)).toBeInTheDocument();

      // Wait for the todo item to be displayed
      const todoItem = await waitFor(() => screen.getByTestId('todo-item'));

      // Verify todo item contents
      expect(todoItem).toHaveTextContent('Title: delectus aut autem');
      expect(todoItem).toHaveTextContent('Completed: No');
    });
    `,
  },
};



const dependencies = {
  '@testing-library/react': '^12.1.2',
  '@testing-library/jest-dom': '^5.14.1',
  "react": "^18.3.1",
  "axios": "^1.7.9",
  "react-dom": "^18.3.1"
};

const Test = () => (
  <CodeEditorWithTests initialFiles={initialFiles} dependencies={dependencies} />
);

export default Test;
