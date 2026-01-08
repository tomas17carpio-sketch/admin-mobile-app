import { useState } from 'react';
import { loginAdmin } from '../auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (await loginAdmin(email, password)) {
      // Redirigir al dashboard
    }
  };

  return (
    <div className="p-4">
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="admin@rifas.com"
        className="border rounded p-2 w-full mb-3"
      />
      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        className="border rounded p-2 w-full mb-4"
      />
      <button 
        onClick={handleLogin}
        className="bg-primary text-white p-3 rounded-full w-full"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}