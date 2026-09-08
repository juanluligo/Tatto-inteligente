import artistAtWork from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012527.png';
import inkStation from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012531.png';
import lionTattoo from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012553.png';
import sketchBook from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012549.png';
import studioChair from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 011859.png';
import studioLounge from '../assets/CapturasParaTatto/Captura de pantalla 2026-09-08 012545.png';

const galleryImages = [
  {
    alt: 'Espacio de atención de Tattoo Inteligente',
    image: studioLounge,
    label: 'El espacio',
    size: 'gallery-card-wide',
  },
  {
    alt: 'Diseño de tatuaje preparado en libreta',
    image: sketchBook,
    label: 'Del trazo a la piel',
    size: 'gallery-card-tall',
  },
  {
    alt: 'Artista trabajando en un tatuaje',
    image: artistAtWork,
    label: 'Precisión',
    size: 'gallery-card-standard',
  },
  {
    alt: 'Tintas y herramientas del estudio',
    image: inkStation,
    label: 'Tinta',
    size: 'gallery-card-standard',
  },
  {
    alt: 'Tatuaje realista de un león',
    image: lionTattoo,
    label: 'Piezas con historia',
    size: 'gallery-card-tall',
  },
  {
    alt: 'Estación profesional de tatuaje',
    image: studioChair,
    label: 'El ritual',
    size: 'gallery-card-wide',
  },
];

export default function StudioGallery() {
  return (
    <section className="studio-gallery" aria-labelledby="studio-gallery-title">
      <div className="gallery-heading">
        <div>
          <p className="eyebrow">El estudio</p>
          <h2 id="studio-gallery-title">Donde las ideas toman forma.</h2>
        </div>
        <p>
          Un recorrido por el espacio, los materiales y el cuidado detrás de cada pieza.
        </p>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((item, index) => (
          <figure
            className={`gallery-card ${item.size}`}
            key={item.label}
            style={{ '--gallery-delay': `${index * 90}ms` }}
          >
            <img src={item.image} alt={item.alt} loading="lazy" />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{item.label}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
