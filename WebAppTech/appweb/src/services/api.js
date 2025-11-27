import axios from "axios"

class ApiService {

  puerto = 8080
  enlace = import.meta.env.VITE_API_URL || `http://localhost:${this.puerto}`
  TOKEN_KEY = "auth_token"
  EXP_KEY = "auth_token_exp"

  api

  constructor() {
    this.api = axios.create({
      baseURL: this.enlace,
      headers: { "Content-Type": "application/json" }
    })

    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  setToken(token) {
    const exp = Date.now() + (60 * 60 * 1000)
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.EXP_KEY, exp)
  }

  getToken() {
    if (!this.isTokenValid()) {
      this.logout()
      return null
    }
    return localStorage.getItem(this.TOKEN_KEY)
  }

  isTokenValid() {
    const exp = localStorage.getItem(this.EXP_KEY)
    return exp && Date.now() < Number(exp)
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.EXP_KEY)
  }

  isAuthenticated() {
    return this.isTokenValid()
  }

  // auth
  async login(credentials) {
    const res = await this.api.post("/auth/login", credentials)
    if (res.data?.token) this.setToken(res.data.token)
    return res.data
  }

  // Endpoints generales
  get(url) { return this.api.get(url) }
  post(url, body) { return this.api.post(url, body) }
  put(url, body) { return this.api.put(url, body) }
  delete(url, body = null) { return this.api.delete(url, { data: body }) }

  // ejemplos reales
  getProductos() { return this.get("/productos") }
  crearUsuario(usuario) { return this.post("/usuarios", usuario) }
}

export default new ApiService()