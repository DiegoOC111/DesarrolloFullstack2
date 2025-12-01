import axios from "axios"

class ApiService {
  puerto = 8080
  enlace = `http://13.59.58.161:${this.puerto}`
  TOKEN_KEY = "auth_token"
  EXP_KEY = "auth_token_exp"

  api

  constructor() {
    this.api = axios.create({
      baseURL: this.enlace,
      headers: { "Content-Type": "application/json" }
    })

    // Interceptor para agregar token automáticamente
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getToken()
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error) => Promise.reject(error)
    )
  }

  // ==========================
  // TOKEN MANAGEMENT
  // ==========================
  setToken(token) {
    const exp = Date.now() + (60 * 60 * 1000)  // 1 hora
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

  // ==========================
  // HELPERS (ASYNC)
  // ==========================
handleError(error, method, url) {
    console.error(`Error en ${method} ${url}:`, error);
    
    // Si el error viene de la respuesta del servidor (ej: 400, 403, 500)
    if (error.response) {
        console.error("Datos del error:", error.response.data);
        console.error("Status:", error.response.status);
        // Opcional: Podrías lanzar solo el mensaje del backend
        // throw error.response.data; 
    } else if (error.request) {
        // La petición se hizo pero no hubo respuesta (Error de red / Backend caído)
        console.error("No se recibió respuesta del servidor (Network Error)");
    } else {
        // Error al configurar la petición
        console.error("Error de configuración:", error.message);
    }

    // ⚠️ IMPORTANTE: Re-lanzamos el error.
    // Si no hacemos 'throw', el componente pensará que todo salió bien y recibirá 'undefined'.
    throw error; 
  }

  async get(url) {
    try {
      console.log("GET", url); 
      const res = await this.api.get(url);
      return res.data;
    } catch (error) {
      this.handleError(error, "GET", url);
    }
  }

  // ==========================
  // AUTH
  // ==========================
  async login(credentials) {
    const res = await this.api.post("/auth/login", credentials)
    if (res.data?.token) this.setToken(res.data.token)
    return res.data
  }

  getAuthStatus() {
    return this.get("/auth/status")
  }

  crearAdminInicial() {
    return this.post("/auth/bootstrap-admin")
  }

  // ==========================
  // USUARIOS
  // ==========================
  getUsuarios() {
    return this.get("/usuario")
  }

  getUsuarioById(id) {
    return this.get(`/usuario/${id}`)
  }

  crearUsuarioBasico(usuario) {
    return this.post("/usuario", usuario)
  }

  crearUsuarioRegister(data) {
    return this.post("/usuario/create-user", data)
  }

  actualizarUsuario(id, data) {
    return this.put(`/usuario/${id}`, data)
  }

  eliminarUsuario(id) {
    return this.delete(`/usuario/${id}`)
  }

  // ==========================
  // UBICACIONES
  // ==========================
  getUbicaciones() {
    return this.get("/ubicaciones")
  }

  getUbicacionById(id) {
    return this.get(`/ubicaciones/${id}`)
  }

  crearUbicacion(data) {
    return this.post("/ubicaciones", data)
  }

  actualizarUbicacion(id, data) {
    return this.put(`/ubicaciones/${id}`, data)
  }

  eliminarUbicacion(id) {
    return this.delete(`/ubicaciones/${id}`)
  }

  // ==========================
  // TIPOS DE PRODUCTO
  // ==========================
  getTiposProducto() {
    return this.get("/tipos-producto")
  }

  getTipoProductoById(id) {
    return this.get(`/tipos-producto/${id}`)
  }

  crearTipoProducto(data) {
    return this.post("/tipos-producto", data)
  }

  actualizarTipoProducto(id, data) {
    return this.put(`/tipos-producto/${id}`, data)
  }

  eliminarTipoProducto(id) {
    return this.delete(`/tipos-producto/${id}`)
  }

  // ==========================
  // PRODUCTOS
  // ==========================
  getProductos() {
    return this.get("/productos")
  }

  getProductoById(id) {
    return this.get(`/productos/${id}`)
  }

  crearProducto(data) {
    return this.post("/productos", data)
  }

  actualizarProducto(id, data) {
    return this.put(`/productos/${id}`, data)
  }

  eliminarProducto(id) {
    return this.delete(`/productos/${id}`)
  }

  // ==========================
  // DETALLE BOLETAS
  // ==========================
  getDetalleBoletas() {
    return this.get("/detalle-boletas")
  }

  getDetalleBoletaById(id) {
    return this.get(`/detalle-boletas/${id}`)
  }

  crearDetalleBoleta(data) {
    return this.post("/detalle-boletas", data)
  }

  actualizarDetalleBoleta(id, data) {
    return this.put(`/detalle-boletas/${id}`, data)
  }

  eliminarDetalleBoleta(id) {
    return this.delete(`/detalle-boletas/${id}`)
  }

  // ==========================
  // BOLETAS
  // ==========================
  getBoletas() {
    return this.get("/boletas")
  }

  getBoletaById(id) {
    return this.get(`/boletas/${id}`)
  }

  crearBoleta(data) {
    return this.post("/boletas", data)
  }

  actualizarBoleta(id, data) {
    return this.put(`/boletas/${id}`, data)
  }

  eliminarBoleta(id) {
    return this.delete(`/boletas/${id}`)
  }
  // ==========================
  // TIPOS DE DESPACHO
  // ==========================
  getTiposDespacho() {
    return this.get("/tipos-despacho");
  }

  getTipoDespachoById(id) {
    return this.get(`/tipos-despacho/${id}`);
  }

  crearTipoDespacho(data) {
    return this.post("/tipos-despacho", data);
  }

  actualizarTipoDespacho(id, data) {
    return this.put(`/tipos-despacho/${id}`, data);
  }

  eliminarTipoDespacho(id) {
    return this.delete(`/tipos-despacho/${id}`);
  }

}
export default ApiService
