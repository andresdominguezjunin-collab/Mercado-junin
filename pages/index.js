import { useState, useEffect } from "react";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  const [nuevo, setNuevo] = useState({
  nombre: "",
  precio: "",
  vendedor: "",
  whatsapp: "",
  imagen: "",
});

  const linkApp = "https://TU-LINK-REAL.vercel.app";

  const invitarWhatsApp = () => {
    const mensaje = `Mirá esta app para comprar en Junín 👇\n${linkApp}`;
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const guardados = localStorage.getItem("productos");
      if (guardados) {
        setProductos(JSON.parse(guardados));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  }, [productos]);

  const agregarProducto = () => {
    if (!nuevo.nombre || !nuevo.precio || !nuevo.whatsapp) return;

    setProductos([...productos, { ...nuevo, id: Date.now() }]);

    setNuevo({
      nombre: "",
      precio: "",
      vendedor: "",
      whatsapp: "",
    });
  };

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial", background: "#f5f5f5" }}>
      
      <h1 style={{ textAlign: "center" }}>Mercado Junín</h1>
      <p style={{ textAlign: "center", marginBottom: 20 }}>
        Todo Junín en un solo mercado
      </p>

      <button 
        onClick={invitarWhatsApp} 
        style={{
          width: "100%",
          padding: 12,
          background: "#25D366",
          color: "white",
          border: "none",
          borderRadius: 8,
          marginBottom: 20,
          fontWeight: "bold"
        }}
      >
        Invitar por WhatsApp
      </button>

      <input
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          padding: 12,
          width: "100%",
          marginBottom: 20,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      />

      <div style={{
        background: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 30
      }}>
        <h3>Publicar producto</h3>

       <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevo({ ...nuevo, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }}
  style={{ marginBottom: 10 }}
/>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevo({ ...nuevo, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }}
  style={{ marginBottom: 10 }}
/>
        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          placeholder="Precio"
          value={nuevo.precio}
          onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          placeholder="Vendedor"
          value={nuevo.vendedor}
          onChange={(e) => setNuevo({ ...nuevo, vendedor: e.target.value })}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />

        <input
          placeholder="WhatsApp"
          value={nuevo.whatsapp}
          onChange={(e) => setNuevo({ ...nuevo, whatsapp: e.target.value })}
          style={{ width: "100%", marginBottom: 8, padding: 8 }}
        />
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevo({ ...nuevo, imagen: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }}
  style={{ width: "100%", marginBottom: 10 }}
/>
        <button 
          onClick={agregarProducto}
          style={{
            width: "100%",
            padding: 10,
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8
          }}
        >
          Publicar
        </button>
      </div>

      {filtrados.map((p) => (
        <div 
          key={p.id} 
          style={{
            background: "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          {p.imagen && (
  <img
    src={p.imagen}
    style={{
      width: "100%",
      borderRadius: 10,
      marginBottom: 10
    }}
  />
)}
          <h3>{p.nombre}</h3>
          <p style={{ fontSize: 18, fontWeight: "bold" }}>${p.precio}</p>
          <p>{p.vendedor}</p>

          <a href={`https://wa.me/${p.whatsapp}`} target="_blank">
            <button style={{
              width: "100%",
              padding: 10,
              background: "#25D366",
              color: "white",
              border: "none",
              borderRadius: 8
            }}>
              Comprar por WhatsApp
            </button>
          </a>
        </div>
      ))}

    </div>
  );
}
