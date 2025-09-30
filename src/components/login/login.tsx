import React, { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { authApi, type LoginRequest } from "../../lib/api"

export default function LogIn() {
  // State variables for login form fields
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // State variables for error/modals management
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)

  // --------------------------------------------------

  // Login form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const credentials: LoginRequest = {
      username: username.trim() || "",
      password: password.trim() || "",
    }

    try {
      const response = await authApi.login(credentials)

      if (response.user) {
        // Store user data in localStorage for later use
        localStorage.setItem("user_data", JSON.stringify(response.user))

        // Check user role - assuming the UserResource includes role information
        // You may need to adjust this based on your UserResource structure
        const userRole = response.user.role

        // Redirect based on role
        switch (userRole) {
          case "admin":
            window.location.href = "/administrador"
            break
          case "estudiante":
            window.location.href = "/estudiante"
            break
          default:
            setError("Rol de usuario no reconocido.")
            setShowModal(true)
            break
        }
      } else {
        setError("Respuesta del servidor incompleta. Faltan datos de sesión.")
        setShowModal(true)
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Credenciales inválidas o error del servidor.")
      setShowModal(true)
    }
  }

  return (
    <section
      id="login"
      className="flex flex-col w-full items-center py-12 md:py-36"
    >
      <div className="fixed inset-0 z-0 w-full h-full">
        <img src="/background.png" className="w-full h-full object-cover" />
      </div>

      <div className="w-sm flex flex-col items-center justify-center px-8 py-6 gap-6 md:border border-gray-200 rounded-2xl md:bg-white relative z-10">
        <h1 className="text-2xl font-montserrat text-gray-800 font-bold text-center w-[85%] py-3 border-b border-gray-200">
          Iniciar sesión
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-[85%] gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Usuario *</label>
            <input
              id="username"
              type="text"
              required
              placeholder="Usuario"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Contraseña *</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-xs font-montserrat text-white font-medium w-full bg-[#700303] hover:bg-[#700303]/80 py-2 rounded-full"
          >
            Iniciar sesión
          </button>
          <div className="flex justify-center py-2">
            <a
              href="#"
              className="text-xs font-inter text-gray-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>

      {/* Modal de rechazo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-montserrat text-gray-700 text-center leading-relaxed">
                <b className="text-base">Error de inicio de sesión.</b> <br />
                <br />
                {error} <br />
                Por favor, intente nuevamente.
              </p>

              <div className="flex justify-center gap-2 mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-montserrat font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-200"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
