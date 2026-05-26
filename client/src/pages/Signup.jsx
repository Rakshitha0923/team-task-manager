import { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const signupUser = async () => {
    try {
      await axios.post(
        "https://team-task-manager-unqk.onrender.com/api/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup Successful");
    } catch (error) {
      console.log(error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 p-6">
      
      <div className="bg-white/20 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-10 w-full max-w-md">
        
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Create Account
        </h1>

        <div className="flex flex-col gap-5">
          
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="p-4 rounded-xl bg-white/80 outline-none"
          />

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
            onClick={signupUser}
            className="bg-black text-white py-4 rounded-xl font-bold hover:scale-105 transition duration-300"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;