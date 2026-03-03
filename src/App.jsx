import React, { useState } from 'react';
import { projects } from './data/projects';

const skills = [
  { name: "Java / Spring Boot", level: "90%" },
  { name: "PostgreSQL / MySQL", level: "85%" },
  { name: "Arquitectura Limpia", level: "80%" },
  { name: "React (Frontend)", level: "65%" }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Nuevo estado para el modal

  return (
    <div className="min-h-screen bg-[#111214] text-slate-300 p-4 md:p-10 font-sans selection:bg-yellow-500/30">
      
      {/* MODAL DE IMAGEN (LIGHTBOX) */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button className="absolute -top-12 right-0 text-white text-4xl hover:text-yellow-500 transition-colors">×</button>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <p className="text-center text-gray-400 mt-4 font-mono text-sm uppercase tracking-widest">{selectedImage.alt}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* SIDEBAR */}
        <aside className="lg:w-[30%]"> 
          <div className="bg-[#1c1d21] border border-gray-800 rounded-[3rem] p-10 sticky top-10 shadow-2xl text-center">
            <div className="w-40 h-40 bg-[#2a2c33] rounded-[2.5rem] mx-auto mb-8 flex items-center justify-center border border-gray-700 shadow-inner group overflow-hidden">
               <span className="text-5xl text-yellow-500 font-black tracking-tighter group-hover:scale-110 transition-transform">NM</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Neyder Manrique</h2>
            <div className="inline-block bg-[#2a2c33] text-gray-400 px-6 py-1.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black mb-8 border border-gray-700">Backend Developer</div>
            <div className="space-y-6 border-t border-gray-800 pt-8 text-left">
              <p className="text-sm text-white truncate font-medium text-xs">manrique.neyder3011@gmail.com</p>
              <a href="/CV_Neyder_Manrique.pdf.pdf" download="CV_Neyder_Manrique.pdf" className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-[#111214] font-extrabold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4 text-xs">📥 DESCARGAR CV</a>
            </div>
          </div>
        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="lg:w-[70%] bg-[#1c1d21] border border-gray-800 rounded-[3rem] p-12 shadow-2xl relative min-h-[80vh]">
          {!selectedProject ? (
            /* VISTA INICIO */
            <div className="animate-in fade-in duration-500">
              <h3 className="text-4xl font-bold text-white mb-10">Sobre Mí</h3>
              <p className="text-gray-400 leading-relaxed mb-14 text-[1.2rem] font-light italic">
               Desarrollador Backend con un enfoque sólido en Java y Spring Boot. Especializado en crear soluciones escalables y seguras, optimizando procesos mediante arquitecturas limpias y el uso eficiente de bases de datos SQL y NoSQL.
              </p>

              <h3 className="text-2xl font-bold text-white mb-8">Proyectos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p) => (
                  <div key={p.id} onClick={() => setSelectedProject(p)} className="cursor-pointer bg-[#2a2c33]/20 border border-gray-800 p-8 rounded-[2.5rem] hover:border-yellow-500 transition-all group shadow-lg">
                    <h4 className="text-white font-bold text-2xl group-hover:text-yellow-500 mb-2">{p.title}</h4>
                    <p className="text-gray-500 text-sm mb-6">{p.description}</p>
                    <span className="text-yellow-500 font-bold text-xs uppercase">Ver detalle →</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* VISTA DETALLE */
            <div className="animate-in slide-in-from-right duration-500">
              <button onClick={() => setSelectedProject(null)} className="mb-8 flex items-center gap-2 text-yellow-500 font-bold hover:bg-yellow-500/10 px-6 py-2 rounded-xl transition-all">← Volver al inicio</button>
              <h3 className="text-5xl font-black text-white mb-2 uppercase">{selectedProject.title}</h3>
              <p className="text-yellow-500 font-bold text-[10px] mb-12 uppercase tracking-[0.2em]">{selectedProject.role}</p>

{selectedProject.learnings && (
  <section className="mt-12">
    <h4 className="text-xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-4">Lecciones Aprendidas</h4>
    <ul className="list-disc list-inside text-gray-400 space-y-2">
      {selectedProject.learnings.map((l, idx) => (
        <li key={idx}>{l}</li>
      ))}
    </ul>
  </section>
)}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {selectedProject.images.map((img, idx) => (
                  <div key={idx} className="group cursor-zoom-in" onClick={() => setSelectedImage(img)}>
                    <div className="bg-[#111214] rounded-t-2xl p-3 border-t-2 border-x-2 border-gray-800 shadow-2xl relative transition-transform group-hover:-translate-y-1">
                      <div className="flex items-center gap-1.5 mb-3 bg-[#1c1d21] p-2 rounded-lg border border-gray-800">
                        <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500/40"></div><div className="w-2 h-2 rounded-full bg-yellow-500/40"></div><div className="w-2 h-2 rounded-full bg-green-500/40"></div></div>
                      </div>
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-800 bg-[#1c1d21]">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500" />
                        <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/10 transition-colors flex items-center justify-center text-white opacity-0 group-hover:opacity-100 font-bold text-xs uppercase tracking-widest">Hacer clic para ampliar</div>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-b-2xl border-b-2 border-x-2 border-gray-900 mx-4 shadow-inner"></div>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                <section>
                  <h4 className="text-xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-4">Análisis Técnico</h4>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">{selectedProject.longDescription}</p>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.features.map((f, i) => (
                    <div key={i} className="bg-[#2a2c33]/20 p-6 rounded-3xl border border-gray-800">
                      <h5 className="text-white font-bold mb-2 flex items-center gap-2"><span className="text-yellow-500 text-xs">0{i+1}.</span> {f.title}</h5>
                      <p className="text-gray-500 text-sm">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}