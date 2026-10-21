const asset = (filename) => `${import.meta.env.BASE_URL}logos/${filename}`;

export const brandLogo = asset('ingeniax.png');
export const brandLogoLight = brandLogo;

export const technologies = [
  { name: 'Siemens', logo: asset('siemens.svg'), description: 'Automatización y digitalización', className: 'logo-siemens' },
  { name: 'Schneider Electric', logo: asset('schneider-electric.svg'), description: 'Energía y control industrial', className: 'logo-schneider' },
  { name: 'Rockwell Automation', logo: asset('rockwell-automation.svg'), description: 'Control y conectividad', className: 'logo-rockwell' },
];
