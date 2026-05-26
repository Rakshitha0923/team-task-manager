import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "https://team-task-manager-unqk.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

localStorage.setItem(
  "role",
  response.data.user.role
);

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      
      <div className="bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">
        
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Welcome Back
        </h1>

        <div className="flex flex-col gap-5">
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="p-4 rounded-xl bg-white/80 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="p-4 rounded-xl bg-white/80 outline-none"
          />

          <button
            onClick={loginUser}
            className="bg-black text-white py-4 rounded-xl font-bold hover:scale-105 transition duration-300"
          >
            Login
          </button>

          <button
  onClick={() => window.location.href = "/signup"}
  className="bg-white text-black py-4 rounded-xl font-bold"
>
  Go To Signup
</button>

        </div>
      </div>
    </div>
  );
}

export default Login;