import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDqfxHz2T8cRhm4YHgavgG6fe7_sio_G0",
  authDomain: "mercado-junin.firebaseapp.com",
  projectId: "mercado-junin",
  storageBucket: "mercado-junin.firebasestorage.app",
  messagingSenderId: "306782751540",
  appId: "1:306782751540:web:fb0e957bfbba7a46293361",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  const [busquedaInput, setBusquedaInput] = useState("");
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
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`);
  };

  const compartirProducto = (p) => {
    const mensaje = `Mirá este producto en Mercado Junín 👇
${p.nombre}
💲 ${p.precio}
📲 https://wa.me/${p.whatsapp}
🔗 ${linkApp}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`);
  };

  const cargarProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const lista = [];
    querySnapshot.forEach((doc) => {
      lista.push({ ...doc.data(), id: doc.id });
    });
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const agregarProducto = async () => {
    if (!nuevo.nombre || !nuevo.precio || !nuevo.whatsapp) return;

    await addDoc(collection(db, "productos"), nuevo);

    setNuevo({
      nombre: "",
      precio: "",
      vendedor: "",
      whatsapp: "",
      imagen: "",
    });

    cargarProductos();
  };

  const filtrados = productos.filter((p) =>
    p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      padding: 20,
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 500,
        background: "white",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
      }}>

        <h1 style={{ textAlign: "center" }}>Mercado Junín</h1>

        <button
          onClick={invitarWhatsApp}
          style={{
            width: "100%",
            background: "#25D366",
            color: "white",
            border: "none",
            padding: 12,
            borderRadius: 10,
            fontWeight: "bold",
            marginBottom: 15
          }}
        >
          Invitar por WhatsApp
        </button>

        <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
          <input
            placeholder="Buscar productos..."
            value={busquedaInput}
            onChange={(e) => setBusquedaInput(e.target.value)}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 10,
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={() => setBusqueda(busquedaInput)}
            style={{
              background: "#4facfe",
              color: "white",
              border: "none",
              padding: "0 15px",
              borderRadius: 10,
              fontWeight: "bold"
            }}
          >
            Buscar
          </button>
        </div>

        <h3>Publicar producto</h3>

        <input placeholder="Nombre"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          style={input}
        />

        <input placeholder="Precio"
          value={nuevo.precio}
          onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
          style={input}
        />

        <input placeholder="Vendedor"
          value={nuevo.vendedor}
          onChange={(e) => setNuevo({ ...nuevo, vendedor: e.target.value })}
          style={input}
        />

        <input placeholder="WhatsApp"
          value={nuevo.whatsapp}
          onChange={(e) => setNuevo({ ...nuevo, whatsapp: e.target.value })}
          style={input}
        />

        <input
          type="file"
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

        <button
          onClick={agregarProducto}
          style={{
            width: "100%",
            background: "#4facfe",
            color: "white",
            border: "none",
            padding: 12,
            borderRadius: 10,
            fontWeight: "bold"
          }}
        >
          Publicar
        </button>

        {filtrados.map((p) => (
          <div key={p.id} style={{
            marginTop: 20,
            padding: 10,
            borderRadius: 15,
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
          }}>
            {p.imagen && (
              <img src={p.imagen} style={{
                width: "100%",
                borderRadius: 10
              }} />
            )}

            <h3>{p.nombre}</h3>
            <p style={{ fontWeight: "bold" }}>${p.precio}</p>

            <div style={{ display: "flex", gap: 10 }}>
              <a href={`https://wa.me/${p.whatsapp}`} target="_blank" style={{ flex: 1 }}>
                <button style={btnComprar}>
                  Comprar
                </button>
              </a>

              <button
                onClick={() => compartirProducto(p)}
                style={btnCompartir}
              >
                Compartir
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 10,
  border: "1px solid #ccc"
};

const btnComprar = {
  width: "100%",
  background: "#25D366",
  color: "white",
  border: "none",
  padding: 10,
  borderRadius: 10
};

const btnCompartir = {
  width: "100%",
  background: "#555",
  color: "white",
  border: "none",
  padding: 10,
  borderRadius: 10
};
