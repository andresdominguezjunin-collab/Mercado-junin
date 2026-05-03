import { useState } from "react";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");

  const productos = [
    { id: 1, nombre: "Pava eléctrica", precio: 18000, vendedor: "ElectroJunín", whatsapp: "5492364000001" },
    { id: 2, nombre: "Pava eléctrica acero", precio: 16500, vendedor: "HogarPlus", whatsapp: "5492364000002" },
    { id: 3, nombre: "Mate artesanal", precio: 5000, vendedor: "MateArte", whatsapp: "5492364000003" }
  ];

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Mercado Junín</h1>
      <p>Todo Junín en un solo mercado</p>

      <input
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: 10, width: "100%", marginBottom: 20 }}
      />

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
