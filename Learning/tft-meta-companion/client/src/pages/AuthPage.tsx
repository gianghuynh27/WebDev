import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { login, signup } from "../services/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");
    setError("");
    try {
      const response =
        mode === "signup"
          ? await signup({ email, password })
          : await login({ email, password });
      if (mode === "login") {
        loginUser(response.token, response.user.email);
        navigate("/");
      }
      setMessage(`${mode === "signup" ? "Signup" : "Login"} successful.`);
    } catch {
      setError(mode === "signup" ? "Signup failed." : "Login failed.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Account"
        title={mode === "signup" ? "Create Account" : "Login"}
        description="Sign in to save your TFT coach and stats experience later."
      />

      <section className="max-w-md rounded-xl border border-slate-800 bg-slate-950 p-5">
        <div className="mb-5 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              mode === "login"
                ? "bg-cyan-300 text-slate-950"
                : "bg-slate-900 text-slate-300"
            }`}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-md px-3 py-2 text-sm font-medium ${
              mode === "signup"
                ? "bg-cyan-300 text-slate-950"
                : "bg-slate-900 text-slate-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
              placeholder="At least 8 characters"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-cyan-300 px-4 py-2 font-medium text-slate-950 disabled:opacity-60"
          >
            {isLoading
              ? "Please wait..."
              : mode === "signup"
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        {message && (
          <p className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}

export default AuthPage;
