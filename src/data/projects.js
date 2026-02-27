export const projects = [
  {
    id: 1,
    title: "Spring DilanMotos",
    role: "Arquitecto Backend",
    description: "Sistema de gestión empresarial para talleres de motocicletas con Spring Security.",
    longDescription: "Desarrollo de una aplicación de gestión empresarial para talleres de motocicletas, implementando seguridad avanzada con Spring Security y encriptación BCrypt para proteger datos sensibles. El sistema incluye funcionalidades de autenticación, autorización, gestión de usuarios y persistencia dinámica de datos mediante MySQL, ofreciendo una solución robusta y escalable para la administración eficiente de talleres.",
    tech: ["Java", "Spring Boot", "Spring Security", "MySQL", "Thymeleaf"],
    images: [
      { src: "/dilan_login.png", alt: "Pantalla de Login Segura" },
      { src: "/dilan_usuarios.png", alt: "Gestión de Usuarios con BCrypt" },
      { src: "/dilan_perfil.png", alt: "Perfil con Datos Dinámicos" }
    ],
    features: [
      { title: "Seguridad por Capas", desc: "Protección contra ataques CSRF y gestión de sesiones mediante Spring Security." },
      { title: "Manejo de Protocolos HTTP", desc: "Endpoints robustos validados mediante Postman con estados 200 OK." },
      { title: "Gestión de Usuarios", desc: "Panel administrativo con operaciones CRUD completas y encriptación BCrypt." },
      { title: "Persistencia Dinámica", desc: "Renderizado de datos reales y relaciones de entidades desde MySQL." }
    ]
  },
  {
    id: 2,
    title: "Yuumi Cosmetics",
    role: "Full-Stack Developer",
    description: "E-commerce real con gestión de inventario y autenticación stateless JWT.",
    longDescription: "Desarrollo integral de una plataforma de comercio electrónico con seguridad basada en JWT.",
    tech: ["Java", "PostgreSQL", "React", "JWT"],
    images: [
      { src: "/yuumi-home.png", alt: "Página de Inicio" },
      { src: "/yuumi-cart.png", alt: "Carrito de Compras" }
    ],
    features: [
      { title: "Checkout Seguro", desc: "Procesamiento de pagos con validación de tokens JWT." },
      { title: "Filtros Pro", desc: "Búsqueda avanzada por categorías y rangos de precio." }
    ]
  }
];