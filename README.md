# Libro de Condolencias - Robe Iniesta

Una aplicación web de libro de condolencias dedicada a Robe Iniesta, cantante de Extremoduro.

## Características

- ✍️ Enviar mensajes de condolencia con nombre y mensaje
- 📖 Ver todos los mensajes enviados en orden cronológico
- 🎨 Diseño responsivo con tema oscuro
- 💾 Almacenamiento en memoria (los mensajes se reinician al recargar la página)

## Desarrollo

### Iniciar servidor de desarrollo
```bash
npm install
npm run dev
```
La aplicación estará disponible en http://localhost:5173/

### Compilar para producción
```bash
npm run build
```

### Vista previa de la compilación
```bash
npm run preview
```

## Tecnologías

- React 18
- Vite
- CSS moderno con gradientes y animaciones

## Estructura del proyecto

```
robe/
├── src/
│   ├── App.jsx       # Componente principal con formulario y lista de mensajes
│   ├── App.css       # Estilos de la aplicación
│   ├── index.css     # Estilos globales
│   └── main.jsx      # Punto de entrada
├── index.html        # Template HTML
└── package.json      # Dependencias y scripts
```

## En memoria de Robe
Su música vivirá por siempre.


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
