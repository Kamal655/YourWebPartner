import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'  // Make sure this imports Tailwind CSS

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center mt-10">
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="inline-block w-20 h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="inline-block w-20 h-20 ml-4" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold text-blue-600 mt-6">Welcome to YourWebPartner!</h1>
      <p className="mt-4 text-gray-700">Your website partner for success.</p>

      <div className="card mt-8">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={() => setCount(count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-2">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs mt-6">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
