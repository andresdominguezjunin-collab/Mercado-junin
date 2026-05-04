import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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

  // 🔥 CARGAR
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

  // 🔥 GUARDAR
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
    <div style={{ padding: 20 }}>
      <h1>Mercado Junín</h1>

      <button onClick={invitarWhatsApp}>
        Invitar por WhatsApp
      </button>

      <input
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <h3>Publicar</h3>

      <input placeholder="Nombre" onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
      <input placeholder="Precio" onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })} />
      <input placeholder="Vendedor" onChange={(e) => setNuevo({ ...nuevo, vendedor: e.target.value })} />
      <input placeholder="WhatsApp" onChange={(e) => setNuevo({ ...nuevo, whatsapp: e.target.value })} />

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
      />

      <button onClick={agregarProducto}>Publicar</button>

      {filtrados.map((p) => (
        <div key={p.id}>
          {p.imagen && <img src={p.imagen} width="100%" />}
          <h3>{p.nombre}</h3>
          <p>${p.precio}</p>
          <a href={`https://wa.me/${p.whatsapp}`} target="_blank">
            <button>Comprar</button>
          </a>
        </div>
      ))}
    </div>
  );
}
