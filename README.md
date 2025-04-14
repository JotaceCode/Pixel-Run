

# 🎮 Pixel Run

Un juego de plataformas 2D estilo pixel-art desarrollado con **Phaser 3**, donde controlas a un personaje que corre, salta y esquiva enemigos en un mundo dinámico.

---

## 🚀 Características

- 👾 Animaciones personalizadas para jugador y enemigos
- 🧠 Sistema de físicas y colisiones con Phaser
- 🌍 Mundo desplazable al estilo clásico (como Mario)
- 🧩 Arquitectura modular con Webpack
- 🔥 Hot reload con `webpack-dev-server`
- 📦 Recursos organizados por escenas, entidades y assets

---

## 🛠️ Tecnologías

- [Phaser 3](https://phaser.io/)
- JavaScript moderno (ES6+)
- Webpack 5
- Babel
- HTML5 + CSS3

---

## 📁 Estructura del proyecto

```
Pixel Run/
├── dist/                # Carpeta generada por Webpack (build final)
├── src/                 # Código fuente
│   ├── assets/          # Imágenes, JSON, y tilesets
│   ├── scenes/          # Escenas de Phaser (mainScene, etc.)
│   ├── entities/        # Clases de personajes y enemigos
│   ├── animations/      # Animaciones organizadas por entidad
│   └── main.js          # Punto de entrada del juego
├── package.json
├── webpack.config.js
└── README.md
```

---

## 🔧 Instalación y ejecución

1. **Clona el repositorio**  
```bash
git clone https://github.com/tu-usuario/pixel-run.git
cd pixel-run
```

2. **Instala las dependencias**  
```bash
npm install
```

3. **Inicia el servidor de desarrollo**  
```bash
npm run dev
```

4. Abre el navegador en [http://localhost:9000](http://localhost:9000)

---


## 📌 TODOs

- [ ] Menús y pantallas de carga | GameOver | etc
- [ ] Sistema elección de personaje
- [ ] Sistema de puntuación
- [ ] Menú principal e instrucciones
- [ ] Música y efectos de sonido
- [ ] Publicación en GitHub Pages o Vercel

---


## 💬 ¿Te gusta el proyecto?

¡No olvides darle una ⭐ en GitHub y seguirme para más juegos indie y proyectos web!