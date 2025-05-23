'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LockKeyhole } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch('https://app.prazelab.my.id/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || 'Login gagal');
        return;
      }

      // Simpan token di cookie dengan waktu kedaluwarsa 1 jam
      Cookies.set('token', data.token, { expires: 1 / 24, secure: true, sameSite: 'Strict' });
      router.push('/dashboard');
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat menghubungi server');
    }
  };
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMsg('');

  //   try {
  //     const res = await fetch('https://app.prazelab.my.id/api/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setErrorMsg(data.message || 'Login gagal');
  //       return;
  //     }

  //     localStorage.setItem('token', data.token);
  //     router.push('/dashboard');
  //   } catch (err) {
  //     setErrorMsg('Terjadi kesalahan saat menghubungi server');
  //   }
  // };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <LockKeyhole color='#19633E' size={60} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Selamat Datang</h1>
              <p className="text-gray-600 mt-2">Masuk ke akun Anda</p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anr focus:border-anr transition"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-anr focus:border-anr transition"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-anr hover:bg-anr-100 text-white font-medium py-3 px-4 rounded-lg transition duration-200 transform hover:-translate-y-0.5"
              >
                Masuk
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-gray-600 text-sm">
              Belum punya akun?{' '}
              <a href="/auth/register" className="text-anr hover:text-anr-100 font-medium">
                Daftar sekarang
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}