import { useState, useEffect } from "react";

const projects = [
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
    learnings: [
      "Implementación de autenticación JWT stateless",
      "Optimización de consultas SQL con índices",
      "Diseño de arquitectura modular con Spring Boot"
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
    longDescription: "Desarrollo integral de una plataforma de comercio electrónico con seguridad basada en JWT. Arquitectura desacoplada entre el frontend en React y el backend en Java, con flujos de autenticación robustos y gestión de estado del carrito.",
    tech: ["Java", "PostgreSQL", "React", "JWT"],
    images: [
      { src: "/yuumi-home.png", alt: "Página de Inicio" },
      { src: "/yuumi-cart.png", alt: "Carrito de Compras" }
    ],
    learnings: [],
    features: [
      { title: "Checkout Seguro", desc: "Procesamiento de pagos con validación de tokens JWT." },
      { title: "Filtros Avanzados", desc: "Búsqueda por categorías y rangos de precio en tiempo real." }
    ]
  }
];

const skillGroups = [
  { cat: "Lenguajes & Frameworks", items: ["Java", "Spring Boot", "Spring Security", "Spring Cloud", "React"] },
  { cat: "Bases de Datos", items: ["PostgreSQL", "MySQL", "Redis"] },
  { cat: "Arquitectura & Patrones", items: ["Arquitectura Hexagonal", "Clean Architecture", "REST API", "JWT / OAuth2"] },
  { cat: "Herramientas", items: ["Docker", "Git", "Postman", "Linux", "Maven"] },
];

const NAV = ["Inicio", "Proyectos", "Habilidades", "Contacto"];

const CSS = `
  @keyframes float0 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-18px) translateX(6px)} }
  @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-12px) translateX(-8px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-22px) translateX(4px)} }
  @keyframes glowPulse { 0%,100%{opacity:0.12} 50%{opacity:0.3} }
  @keyframes slideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
  .su1{animation:slideUp 0.6s 0.05s ease-out both}
  .su2{animation:slideUp 0.6s 0.18s ease-out both}
  .su3{animation:slideUp 0.6s 0.32s ease-out both}
  .su4{animation:slideUp 0.6s 0.46s ease-out both}
  .dot-blink{animation:blink 2s ease-in-out infinite}
`;

function Dots() {
  const pts = Array.from({length:20},(_,i)=>({
    x:(i*37+11)%100, y:(i*53+7)%100,
    big: i%3===0, yellow: i%5===0,
    anim: i%3, dur: 6+(i%4)*2, delay: (i*0.7)%5
  }));
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {pts.map((p,i)=>(
        <div key={i} style={{
          position:"absolute", left:`${p.x}%`, top:`${p.y}%`,
          width: p.big?"2px":"1px", height: p.big?"2px":"1px",
          borderRadius:"50%",
          background: p.yellow?"rgba(234,179,8,0.45)":"rgba(255,255,255,0.07)",
          animation:`float${p.anim} ${p.dur}s ${p.delay}s ease-in-out infinite`
        }}/>
      ))}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Inicio");
  const [project, setProject] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>20);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const goTo = (s) => { setActive(s); setProject(null); setMenuOpen(false); window.scrollTo(0,0); };

  const card = {
    background:"#1c1d21",
    border:"1px solid rgba(55,65,81,0.55)",
    borderRadius:"14px",
    padding:"24px",
    transition:"all 0.25s"
  };

  return (
    <div style={{background:"#111214",minHeight:"100vh",color:"#9ca3af",fontFamily:"'Inter','Segoe UI',sans-serif"}}>
      <style>{CSS}</style>

      {lightbox && (
        <div onClick={()=>setLightbox(null)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.95)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",cursor:"zoom-out"}}>
          <img src={lightbox.src} alt={lightbox.alt} style={{maxHeight:"85vh",maxWidth:"100%",borderRadius:"12px",objectFit:"contain"}}/>
          <p style={{position:"absolute",bottom:"28px",color:"#374151",fontSize:"11px",fontFamily:"monospace",textTransform:"uppercase",letterSpacing:"0.15em"}}>{lightbox.alt}</p>
        </div>
      )}

      {/* NAV */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,background:scrolled?"rgba(17,18,20,0.96)":"transparent",borderBottom:scrolled?"1px solid rgba(255,255,255,0.04)":"none",backdropFilter:scrolled?"blur(16px)":"none",transition:"all 0.3s"}}>
        <div style={{maxWidth:"1024px",margin:"0 auto",padding:"0 24px",height:"62px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>goTo("Inicio")} style={{background:"none",border:"none",cursor:"pointer",color:"#e5e7eb",fontWeight:900,fontSize:"18px",letterSpacing:"-0.05em"}}>
            NM<span style={{color:"#eab308"}}>.</span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:"2px"}}>
            {NAV.map(item=>(
              <button key={item} onClick={()=>goTo(item)} style={{
                padding:"7px 14px",borderRadius:"8px",fontSize:"13px",fontWeight:500,border:"none",cursor:"pointer",
                background:active===item?"rgba(234,179,8,0.08)":"transparent",
                color:active===item?"#eab308":"#6b7280",
                transition:"all 0.2s"
              }}>{item}</button>
            ))}
            <a href="/CV_Neyder_Manrique.pdf" download style={{marginLeft:"12px",padding:"7px 18px",background:"#eab308",color:"#000",fontSize:"13px",fontWeight:700,borderRadius:"8px",textDecoration:"none",transition:"background 0.2s"}}>CV →</a>
          </div>
        </div>
      </nav>

      <div style={{maxWidth:"1024px",margin:"0 auto",padding:"110px 24px 96px"}}>

        {/* INICIO */}
        {active==="Inicio" && (
          <div>
            <section style={{position:"relative",minHeight:"76vh",display:"flex",flexDirection:"column",justifyContent:"center",borderBottom:"1px solid rgba(55,65,81,0.3)",paddingBottom:"80px",marginBottom:"80px",overflow:"hidden"}}>
              <Dots/>
              {/* amber glow blobs */}
              <div style={{position:"absolute",top:"-15%",right:"-8%",width:"480px",height:"480px",background:"radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 65%)",pointerEvents:"none",animation:"glowPulse 4s ease-in-out infinite"}}/>
              <div style={{position:"absolute",bottom:"5%",left:"-8%",width:"320px",height:"320px",background:"radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 65%)",pointerEvents:"none",animation:"glowPulse 6s 2s ease-in-out infinite"}}/>

              <div className="su1" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"36px",padding:"7px 16px",border:"1px solid rgba(234,179,8,0.18)",borderRadius:"999px",width:"fit-content",background:"rgba(234,179,8,0.04)"}}>
                <span className="dot-blink" style={{width:"7px",height:"7px",borderRadius:"50%",background:"#eab308",display:"inline-block"}}/>
                <span style={{color:"rgba(234,179,8,0.75)",fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase"}}>Disponible para proyectos</span>
              </div>

              <h1 className="su2" style={{fontSize:"clamp(3.5rem,10vw,7rem)",fontWeight:900,color:"#f3f4f6",lineHeight:0.88,letterSpacing:"-0.045em",marginBottom:"28px"}}>
                Neyder<br/>
                <span style={{color:"#eab308",textShadow:"0 0 80px rgba(234,179,8,0.25), 0 0 30px rgba(234,179,8,0.12)"}}>Manrique</span>
              </h1>

              <p className="su3" style={{color:"#6b7280",fontSize:"17px",maxWidth:"460px",lineHeight:1.75,marginBottom:"10px",fontWeight:300}}>
                Backend Developer · <span style={{color:"#9ca3af"}}>Java & Spring Boot</span>
              </p>
              <p className="su3" style={{color:"#4b5563",fontSize:"13px",maxWidth:"460px",lineHeight:1.7,marginBottom:"44px"}}>
                2 años construyendo sistemas con arquitectura limpia, seguridad robusta y SQL.
              </p>

              <div className="su4" style={{display:"flex",flexWrap:"wrap",gap:"12px"}}>
                <button onClick={()=>goTo("Proyectos")} style={{padding:"13px 26px",background:"#eab308",color:"#000",fontWeight:700,borderRadius:"10px",border:"none",cursor:"pointer",fontSize:"13px",transition:"all 0.2s",boxShadow:"0 0 24px rgba(234,179,8,0.22)"}}
                  onMouseEnter={e=>{e.target.style.background="#fbbf24";e.target.style.transform="translateY(-2px)";e.target.style.boxShadow="0 0 40px rgba(234,179,8,0.38)";}}
                  onMouseLeave={e=>{e.target.style.background="#eab308";e.target.style.transform="translateY(0)";e.target.style.boxShadow="0 0 24px rgba(234,179,8,0.22)";}}>
                  Ver proyectos →
                </button>
                <button onClick={()=>goTo("Contacto")} style={{padding:"13px 26px",background:"transparent",color:"#6b7280",fontWeight:500,borderRadius:"10px",border:"1px solid rgba(75,85,99,0.45)",cursor:"pointer",fontSize:"13px",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(156,163,175,0.4)";e.currentTarget.style.color="#d1d5db";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(75,85,99,0.45)";e.currentTarget.style.color="#6b7280";}}>
                  Contacto
                </button>
              </div>

              <div style={{position:"absolute",bottom:"20px",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",opacity:0.4}}>
                <span style={{fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#374151"}}>scroll</span>
                <div style={{width:"1px",height:"28px",background:"linear-gradient(to bottom,#374151,transparent)"}}/>
              </div>
            </section>

            {/* About */}
            <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"56px",borderBottom:"1px solid rgba(55,65,81,0.3)",paddingBottom:"80px",marginBottom:"80px"}}>
              <div>
                <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"18px"}}>Sobre mí</p>
                <p style={{color:"#9ca3af",lineHeight:1.8,marginBottom:"14px",fontSize:"14px"}}>
                  Me especializo en construir el núcleo backend de productos digitales — APIs robustas, sistemas de autenticación y arquitecturas limpias.
                </p>
                <p style={{color:"#6b7280",lineHeight:1.8,fontSize:"14px"}}>
                  Sin experiencia formal en empresa todavía, pero con 2 años de desarrollo real en proyectos propios. Me interesa el código limpio, mantenible y bien documentado.
                </p>
              </div>
              <div>
                <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"18px"}}>Stack principal</p>
                <div style={{display:"flex",flexDirection:"column",gap:"11px"}}>
                  {["Java · Spring Boot","Spring Security · JWT","PostgreSQL · MySQL","REST API · Clean Architecture","Docker · Git"].map(s=>(
                    <div key={s} style={{display:"flex",alignItems:"center",gap:"12px",color:"#6b7280",fontSize:"13px"}}>
                      <span style={{width:"3px",height:"3px",borderRadius:"50%",background:"rgba(234,179,8,0.45)",flexShrink:0}}/>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects preview */}
            <section>
              <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"32px"}}>
                <div>
                  <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"8px"}}>Trabajo reciente</p>
                  <h2 style={{fontSize:"30px",fontWeight:900,color:"#e5e7eb",letterSpacing:"-0.03em"}}>Proyectos</h2>
                </div>
                <button onClick={()=>goTo("Proyectos")} style={{color:"rgba(234,179,8,0.65)",fontSize:"13px",fontWeight:500,background:"none",border:"none",cursor:"pointer"}}>Ver todos →</button>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"14px"}}>
                {projects.map((p,i)=>(
                  <button key={p.id} onClick={()=>{setProject(p);setActive("Proyectos");window.scrollTo(0,0);}}
                    style={{...card,textAlign:"left",cursor:"pointer",display:"block"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(234,179,8,0.28)";e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.background="#1f2023";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(55,65,81,0.55)";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.background="#1c1d21";}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:"18px"}}>
                      <span style={{color:"#1f2937",fontFamily:"monospace",fontSize:"11px"}}>{String(i+1).padStart(2,"0")}</span>
                      <span style={{color:"#4b5563",fontSize:"10px",border:"1px solid rgba(55,65,81,0.7)",padding:"2px 9px",borderRadius:"999px"}}>{p.role}</span>
                    </div>
                    <h3 style={{color:"#e5e7eb",fontWeight:700,fontSize:"18px",marginBottom:"8px",lineHeight:1.3}}>{p.title}</h3>
                    <p style={{color:"#4b5563",fontSize:"12px",lineHeight:1.7,marginBottom:"18px"}}>{p.description}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                      {p.tech.slice(0,3).map(t=><span key={t} style={{color:"#374151",fontSize:"11px",fontFamily:"monospace"}}>{t}</span>)}
                      {p.tech.length>3 && <span style={{color:"#1f2937",fontSize:"11px",fontFamily:"monospace"}}>+{p.tech.length-3}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PROYECTOS */}
        {active==="Proyectos" && (
          <div>
            {!project ? (
              <div>
                <div style={{marginBottom:"52px"}}>
                  <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"10px"}}>Portafolio</p>
                  <h1 style={{fontSize:"46px",fontWeight:900,color:"#e5e7eb",letterSpacing:"-0.04em",marginBottom:"10px"}}>Proyectos</h1>
                  <p style={{color:"#4b5563",fontSize:"13px",maxWidth:"400px"}}>Sistemas y aplicaciones que he diseñado e implementado.</p>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                  {projects.map((p,i)=>(
                    <button key={p.id} onClick={()=>setProject(p)}
                      style={{...card,width:"100%",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:"20px"}}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(234,179,8,0.25)";e.currentTarget.style.background="#1f2023";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(55,65,81,0.55)";e.currentTarget.style.background="#1c1d21";}}>
                      <span style={{color:"#1f2937",fontWeight:900,fontSize:"44px",fontFamily:"monospace",lineHeight:1,flexShrink:0,width:"52px"}}>{String(i+1).padStart(2,"00")}</span>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"10px",marginBottom:"5px"}}>
                          <h3 style={{color:"#e5e7eb",fontWeight:700,fontSize:"17px"}}>{p.title}</h3>
                          <span style={{color:"#4b5563",fontSize:"10px",border:"1px solid rgba(55,65,81,0.7)",padding:"2px 9px",borderRadius:"999px",flexShrink:0}}>{p.role}</span>
                        </div>
                        <p style={{color:"#4b5563",fontSize:"12px"}}>{p.description}</p>
                      </div>
                      <span style={{color:"#374151",fontSize:"18px",flexShrink:0}}>→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <button onClick={()=>setProject(null)} style={{display:"flex",alignItems:"center",gap:"8px",color:"#6b7280",background:"none",border:"none",cursor:"pointer",fontSize:"13px",marginBottom:"44px"}}>
                  ← Todos los proyectos
                </button>
                <div style={{marginBottom:"44px"}}>
                  <span style={{color:"rgba(234,179,8,0.6)",border:"1px solid rgba(234,179,8,0.14)",padding:"3px 12px",borderRadius:"999px",fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em"}}>{project.role}</span>
                  <h1 style={{fontSize:"clamp(2.4rem,6vw,4rem)",fontWeight:900,color:"#f3f4f6",letterSpacing:"-0.04em",marginTop:"18px",marginBottom:"14px",lineHeight:1.1}}>{project.title}</h1>
                  <p style={{color:"#6b7280",fontSize:"14px",maxWidth:"640px",lineHeight:1.8}}>{project.longDescription}</p>
                </div>

                <div style={{marginBottom:"40px"}}>
                  <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"14px"}}>Stack tecnológico</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                    {project.tech.map(t=>(
                      <span key={t} style={{padding:"5px 12px",background:"#1c1d21",border:"1px solid rgba(55,65,81,0.55)",borderRadius:"7px",fontSize:"12px",fontFamily:"monospace",color:"#9ca3af"}}>{t}</span>
                    ))}
                  </div>
                </div>

                {project.images?.length>0 && (
                  <div style={{marginBottom:"40px"}}>
                    <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"16px"}}>Capturas</p>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"12px"}}>
                      {project.images.map((img,i)=>(
                        <button key={i} onClick={()=>setLightbox(img)}
                          style={{background:"#1c1d21",border:"1px solid rgba(55,65,81,0.55)",borderRadius:"10px",overflow:"hidden",cursor:"zoom-in",textAlign:"left",transition:"border-color 0.2s"}}
                          onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(234,179,8,0.22)"}
                          onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(55,65,81,0.55)"}>
                          <div style={{aspectRatio:"16/9",background:"#111214",overflow:"hidden"}}>
                            <img src={img.src} alt={img.alt} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.72,transition:"opacity 0.2s"}}
                              onMouseEnter={e=>e.target.style.opacity="1"} onMouseLeave={e=>e.target.style.opacity="0.72"}/>
                          </div>
                          <p style={{color:"#4b5563",fontSize:"10px",fontFamily:"monospace",padding:"8px 12px"}}>{img.alt}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{marginBottom:"40px"}}>
                  <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"16px"}}>Características</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"10px"}}>
                    {project.features.map((f,i)=>(
                      <div key={i} style={{background:"#1c1d21",border:"1px solid rgba(55,65,81,0.55)",borderRadius:"10px",padding:"18px",display:"flex",gap:"10px"}}>
                        <span style={{color:"rgba(234,179,8,0.35)",fontFamily:"monospace",fontSize:"10px",marginTop:"2px",flexShrink:0}}>{String(i+1).padStart(2,"0")}</span>
                        <div>
                          <h5 style={{color:"#d1d5db",fontWeight:600,fontSize:"13px",marginBottom:"5px"}}>{f.title}</h5>
                          <p style={{color:"#4b5563",fontSize:"12px",lineHeight:1.7}}>{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {project.learnings?.length>0 && (
                  <div>
                    <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"14px"}}>Aprendizajes clave</p>
                    <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
                      {project.learnings.map((l,i)=>(
                        <div key={i} style={{display:"flex",alignItems:"center",gap:"12px",color:"#6b7280",fontSize:"13px",background:"#1c1d21",border:"1px solid rgba(55,65,81,0.45)",borderRadius:"9px",padding:"11px 18px"}}>
                          <span style={{width:"3px",height:"3px",borderRadius:"50%",background:"rgba(234,179,8,0.4)",flexShrink:0}}/>{l}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* HABILIDADES */}
        {active==="Habilidades" && (
          <div>
            <div style={{marginBottom:"52px"}}>
              <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"10px"}}>Expertise</p>
              <h1 style={{fontSize:"46px",fontWeight:900,color:"#e5e7eb",letterSpacing:"-0.04em",marginBottom:"10px"}}>Habilidades</h1>
              <p style={{color:"#4b5563",fontSize:"13px",maxWidth:"400px"}}>Tecnologías y prácticas que domino con profundidad real.</p>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"12px",marginBottom:"12px"}}>
              {skillGroups.map(g=>(
                <div key={g.cat} style={{...card}}>
                  <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"16px"}}>{g.cat}</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                    {g.items.map(item=>(
                      <span key={item} style={{padding:"5px 11px",background:"#111214",border:"1px solid rgba(55,65,81,0.45)",color:"#9ca3af",fontSize:"11px",borderRadius:"7px",fontFamily:"monospace",cursor:"default",transition:"all 0.2s"}}
                        onMouseEnter={e=>{e.target.style.borderColor="rgba(234,179,8,0.28)";e.target.style.color="#d1d5db";}}
                        onMouseLeave={e=>{e.target.style.borderColor="rgba(55,65,81,0.45)";e.target.style.color="#9ca3af";}}
                      >{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{...card}}>
              <p style={{color:"#374151",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"16px"}}>Metodologías</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                {["Scrum","Code Review","TDD","Git Flow","Documentación técnica","Clean Code","SOLID","API-First"].map(s=>(
                  <span key={s} style={{padding:"5px 11px",background:"#111214",border:"1px solid rgba(55,65,81,0.45)",color:"#9ca3af",fontSize:"11px",borderRadius:"7px",fontFamily:"monospace"}}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTACTO */}
        {active==="Contacto" && (
          <div style={{minHeight:"70vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div style={{maxWidth:"500px"}}>
              <p style={{color:"rgba(234,179,8,0.55)",fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.2em",fontWeight:700,marginBottom:"14px"}}>Contacto</p>
              <h1 style={{fontSize:"clamp(3rem,8vw,5.5rem)",fontWeight:900,color:"#f3f4f6",letterSpacing:"-0.045em",lineHeight:0.88,marginBottom:"18px"}}>
                Hablemos<span style={{color:"#eab308",textShadow:"0 0 40px rgba(234,179,8,0.25)"}}>.</span>
              </h1>
              <p style={{color:"#6b7280",fontSize:"14px",lineHeight:1.8,marginBottom:"44px",maxWidth:"380px"}}>
                Abierto a oportunidades, proyectos freelance o una conversación técnica. Escribime sin apuro.
              </p>
              <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"36px"}}>
                {[
                  {label:"Email",value:"manrique.neyder3011@gmail.com",href:"mailto:manrique.neyder3011@gmail.com"},
                  {label:"LinkedIn",value:"linkedin.com/in/neyder-manrique",href:"#"},
                  {label:"GitHub",value:"github.com/neyder-manrique",href:"#"},
                ].map(c=>(
                  <a key={c.label} href={c.href}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#1c1d21",border:"1px solid rgba(55,65,81,0.55)",borderRadius:"10px",padding:"18px 22px",textDecoration:"none",transition:"border-color 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(234,179,8,0.22)"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(55,65,81,0.55)"}>
                    <div>
                      <p style={{color:"#374151",fontSize:"9px",textTransform:"uppercase",letterSpacing:"0.15em",fontWeight:700,marginBottom:"3px"}}>{c.label}</p>
                      <p style={{color:"#9ca3af",fontWeight:500,fontSize:"13px"}}>{c.value}</p>
                    </div>
                    <span style={{color:"#374151",fontSize:"16px"}}>→</span>
                  </a>
                ))}
              </div>
              <a href="/CV_Neyder_Manrique.pdf" download
                style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"13px 26px",background:"#eab308",color:"#000",fontWeight:700,borderRadius:"10px",textDecoration:"none",fontSize:"13px",boxShadow:"0 0 24px rgba(234,179,8,0.18)",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="#fbbf24";e.currentTarget.style.boxShadow="0 0 36px rgba(234,179,8,0.32)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#eab308";e.currentTarget.style.boxShadow="0 0 24px rgba(234,179,8,0.18)";}}>
                📥 Descargar CV
              </a>
            </div>
          </div>
        )}
      </div>

      <footer style={{borderTop:"1px solid rgba(55,65,81,0.25)"}}>
        <div style={{maxWidth:"1024px",margin:"0 auto",padding:"24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          <span style={{color:"#374151",fontSize:"11px"}}>© 2024 Neyder Manrique</span>
          <span style={{color:"#1f2937",fontSize:"11px",fontFamily:"monospace"}}>Backend Developer · Java · Spring Boot</span>
        </div>
      </footer>
    </div>
  );
}