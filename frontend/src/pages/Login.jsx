// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 👈 Import Link

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigate('/dashboard'); {/* Redirect to dashboard */}
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error or server is down:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 max-w-md w-full bg-white p-6 rounded-lg shadow-md">
            <input className="bg-gray-100 p-2 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="bg-gray-100 p-2 rounded"  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="btn btn-primary w-full px-4 py-2 rounded text-sm font-semibold bg-[#E11D48] text-white">Log In</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/signup" className="text-red-500 hover:underline">Sign Up</Link> {/* Add the Link component */}
      </p>
    </div>
  );
}

export default Login;