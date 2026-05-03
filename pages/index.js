import { useState, useEffect } from "react";

// 🔥 FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDDqfxHz2T8cRhm4YHgavgG6fe7_sio_G0",
  authDomain: "mercado-junin.firebaseapp.com",
  projectId: "mercado-junin",
  storageBucket: "mercado-junin.firebasestorage.app",
  messagingSenderId: "306782751540",
  appId: "1:306782751540:web:fb0e957bfbba7a46293361",
};

// 🔥 INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  // 🔥 CARGAR DESDE FIREBASE
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

  // 🔥 GUARDAR EN FIREBASE
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
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          background: "white",
          borderRadius: 20,
          padding: 20,
        }}
      >
        <h1 style={{ textAlign: "center" }}>Mercado Junín</h1>

        <button onClick={invitarWhatsApp} style={{ width: "100%", marginBottom: 20 }}>
          Invitar por WhatsApp
        </button>

        <input
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />

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
          placeholder="WhatsApp"
          value={nuevo.whatsapp}
          onChange={(e) => setNuevo({ ...nuevo, whatsapp: e.target.value })}
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
        />

        <button onClick={agregarProducto}>Publicar</button>

        {filtrados.map((p) => (
          <div key={p.id} style={{ marginTop: 20 }}>
            {p.imagen && <img src={p.imagen} style={{ width: "100%" }} />}
            <h3>{p.nombre}</h3>
            <p>${p.precio}</p>
            <p>{p.vendedor}</p>
            <a href={`https://wa.me/${p.whatsapp}`} target="_blank">
              <button>Comprar por WhatsApp</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
