import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import PostList from './components/PostList'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Post Management System</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create">Create Post</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
