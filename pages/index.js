import { useState, useEffect } from "react";
// actualizacion
export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);

  const [nuevo, setNuevo] = useState({
    nombre: "",
    precio: "",
    vendedor: "",
    whatsapp: "",
  });

  // cargar productos guardados
  useEffect(() => {
  if (typeof window !== "undefined") {
    const guardados = localStorage.getItem("productos");
    if (guardados) {
      setProductos(JSON.parse(guardados));
    }
  }
}, []);

  // guardar productos
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
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
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Mercado Junín</h1>
      <p>Todo Junín en un solo mercado</p>

      {/* BUSCADOR */}
      <input
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />

      {/* FORMULARIO */}
      <div style={{ marginBottom: 30 }}>
        <h3>Publicar producto</h3>

        <input
          placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />

        <input
          placeholder="Precio"
          value={nuevo.precio}
          onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
        />

        <input
          placeholder="Vendedor"
          value={nuevo.vendedor}
          onChange={(e) => setNuevo({ ...nuevo, vendedor: e.target.value })}
        />

        <input
          placeholder="WhatsApp (ej: 5492364...)"
          value={nuevo.whatsapp}
          onChange={(e) => setNuevo({ ...nuevo, whatsapp: e.target.value })}
        />

        <button onClick={agregarProducto}>
          Publicar
        </button>
      </div>

      {/* LISTA */}
      {filtrados.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", padding: 15, marginBottom: 10 }}>
          <h3>{p.nombre}</h3>
          <p><strong>${p.precio}</strong></p>
          <p>{p.vendedor}</p>

          <a href={`https://wa.me/${p.whatsapp}`} target="_blank">
            <button>Comprar por WhatsApp</button>
          </a>
        </div>
      ))}
    </div>
  );
}
