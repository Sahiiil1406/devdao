import React from 'react';
import CodeEditorWithTests from './x.jsx';
//Wolfram--->maths(Image recogition)
const initialFiles = {
  'App.js': {
    code: `import React from 'react';

    function App() {
      return <h1>Hello, world!</h1>;
    }

    export default App;
    `,
  },
  'App.test.js': {
    code: `import { render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom';
    import App from './App';

    test('renders hello world', () => {
      render(<App />);
      const linkElement = screen.getByText(/hello, world!/i);
      expect(linkElement).toBeInTheDocument();
    });
    `,
  },
};

const dependencies = {
  '@testing-library/react': '^12.1.2',
  '@testing-library/jest-dom': '^5.14.1',
  "react": "^18.3.1",
  "react-dom": "^18.3.1"
};

const Test = () => (
  <CodeEditorWithTests initialFiles={initialFiles} dependencies={dependencies} />
);

export default Test;
