import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  // 1. Change the state variables from email and password to name, email, and password
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2. Change the fetch URL to your signup endpoint
      const response = await fetch(`${backendUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 3. Include the new 'name' field in the request body
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        // 4. Redirect the user to a success page or the login page after signup
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData.message);
      }
    } catch (error) {
      console.error('Network error or server is down:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 max-w-md w-full bg-white p-6 rounded-lg shadow-md">  
                {/* 5. Add a new input field for the name */}
                <input className="bg-gray-100 p-2 rounded" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input className="bg-gray-100 p-2 rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="bg-gray-100 p-2 rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-primary w-full px-4 py-2 rounded text-sm font-semibold bg-[#E11D48] text-white">Sign Up</button>
              </div>  
            </form>
            <p>
                Already have an account? <Link to="/login" className="text-red-500 hover:underline">Log In</Link>
            </p> 
    </div>
  );
}