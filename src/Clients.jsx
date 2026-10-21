import './clients.css';

const asset = filename => `${import.meta.env.BASE_URL}logos/clients/${filename}`;

const clients = [
  { name: 'Darnel', file: 'darnel.png', style: 'darnel', width: 600, height: 600 },
  { name: 'Cotecmar', file: 'cotecmar.svg', style: 'cotecmar', width: 40, height: 40 },
  { name: 'Grupo Oleoflores', file: 'oleoflores.png', style: 'oleoflores', width: 528, height: 162 },
  { name: 'Team Foods', file: 'team-foods.png', style: 'team', width: 3371, height: 2131 },
  { name: 'Panificadora del Litoral', file: 'panificadora-del-litoral-original.jpg', style: 'litoral', width: 1200, height: 755 },
  { name: 'Apolo Impresores', file: 'apolo-impresores.png', style: 'apolo', width: 350, height: 83 },
  { name: 'CSP de Colombia', file: 'csp-colombia.png', style: 'csp', width: 500, height: 500 },
];

export default function Clients() {
  return (
    <section className="clients" id="clientes" aria-labelledby="clients-title">
      <div className="container">
        <div className="clients-heading">
          <div>
            <div className="eyebrow"><span />CONFIANZA QUE NOS IMPULSA</div>
            <h2 id="clients-title">Clientes</h2>
            <p>Empresas que confían en nuestra ingeniería.</p>
          </div>
        </div>
        <div className="clients-viewport">
          <div className="clients-track" id="clients-track">
            {[false, true].map(duplicate => (
              <ul className="clients-group" key={String(duplicate)} aria-label={duplicate ? undefined : 'Nuestros clientes'} aria-hidden={duplicate ? true : undefined}>
                {clients.map(client => (
                  <li className="client-logo" key={client.name}>
                    <span className={`client-image client-image-${client.style}`}>
                      <img src={asset(client.file)} alt={duplicate ? '' : client.name} width={client.width} height={client.height} decoding="async" draggable="false" />
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
