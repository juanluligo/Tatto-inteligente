import { STUDIO_NAME } from '../constants/app.js';
import DesignsStudioSection from '../features/designs/components/DesignsStudioSection.jsx';

export default function HomePage() {
  return (
    <>
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Estudio privado · Bogotá</p>
          <h1>Historias que se llevan en la piel.</h1>
          <p className="hero-description">
            Diseñamos tatuajes con intención, detalle y una mirada profundamente personal.
          </p>
          <a className="primary-button" href="#contacto">Cuéntanos tu idea <span>↗</span></a>
        </div>
        <div className="hero-art" aria-label="Composición artística de tinta" role="img">
          <div className="ink-orbit orbit-one" />
          <div className="ink-orbit orbit-two" />
          <div className="ink-flower">✳</div>
          <span className="art-note">SINCE<br />2025</span>
        </div>
      </section>
      <section className="studio-section" id="estudio">
        <DesignsStudioSection />
      </section>
      <section className="intro-grid" id="proceso">
        <p className="section-number">01 / 03</p>
        <div>
          <p className="eyebrow">{STUDIO_NAME}</p>
          <h2>Tu piel. Nuestro lienzo.</h2>
          <p className="muted-copy">Un espacio para convertir referencias, recuerdos e intuiciones en piezas que te representan.</p>
        </div>
        <div className="detail-card"><span>01</span><strong>Idea</strong><p>Conversamos sobre lo que quieres contar.</p></div>
        <div className="detail-card"><span>02</span><strong>Diseño</strong><p>Le damos forma hasta encontrar el lenguaje exacto.</p></div>
      </section>
      <section className="contact-strip" id="contacto">
        <p className="eyebrow">¿Listo para empezar?</p>
        <h2>Hagamos algo que permanezca.</h2>
        <a className="text-link" href="mailto:hola@tattoostudio.local">hola@tattoostudio.local ↗</a>
      </section>
    </>
  );
}
