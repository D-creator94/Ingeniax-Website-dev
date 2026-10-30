import { PanelsTopLeft, Workflow, Settings2, Ship, Zap } from 'lucide-react';

// Source: current Experiencia Ingeniax S.A.S..docx. Images are generated illustrations.
export const projects = [
  {
    "id": "01",
    "categories": [
      "Automatización",
      "IIoT"
    ],
    "label": "SUPERVISIÓN SCADA",
    "title": "Optimización del SCADA del proceso de compuestos",
    "name": "Optimización del sistema de supervisión SCADA del proceso de compuestos",
    "client": "Ajover - Darnel",
    "sector": "Plásticos y manufactura",
    "location": "Cartagena, Colombia",
    "description": "Modernización de la supervisión y el control del proceso, con históricos y reportes automáticos para analizar la producción y detectar lotes fuera de especificación.",
    "tags": [
      "FactoryTalk View SE",
      "Modicon M580",
      "SQL Server",
      "Python"
    ],
    "color": "cyan",
    "icon": PanelsTopLeft,
    "image": "scada-compuestos-interfaz-v2",
    "alt": "Interfaz SCADA ilustrativa con equipos identificados por códigos, mezclador, enfriador y panel de tendencias",
    "detail": "INGENIAX desarrolló una solución integral de supervisión para el proceso de compuestos de la planta Películas. El proyecto combinó una interfaz SCADA bajo los lineamientos ISA-101, mejoras en la lógica de control y gestión de datos para fortalecer la operación y la trazabilidad de la producción.",
    "scope": [
      "Ingeniería de detalle y desarrollo del SCADA en FactoryTalk View SE V16, con arquitectura distribuida.",
      "Optimización del PLC Modicon M580 e integración de equipos mediante un servidor OPC KEPServer.",
      "Registro de históricos en SQL Server e integración de datos con FactoryTalk Transaction Manager.",
      "Reportes en Python de producción por referencia, lotes fuera de especificación, consumo de materias primas y capacidad del proceso.",
      "Pruebas FAT y SAT, puesta en servicio, estabilización del proceso y capacitación del personal."
    ],
    "results": [
      "Modernización de la plataforma de supervisión con una arquitectura que facilita su mantenimiento y refuerza la confiabilidad del sistema.",
      "Mejor control de calidad mediante herramientas para identificar condiciones fuera de especificación y apoyar la reducción de lotes no conformes.",
      "Mayor trazabilidad de las variables e indicadores, con reportes automáticos que facilitan el análisis operativo y la toma de decisiones.",
      "Fortalecimiento de la continuidad operativa al reducir paradas asociadas a posibles defectos del proceso de compuestos."
    ],
    "context": "La solución se orientó a facilitar la supervisión del proceso y la identificación oportuna de condiciones anormales. Además del desarrollo gráfico, se intervino la programación del PLC principal y se incorporaron herramientas para consultar históricos y evaluar el comportamiento de la producción por referencia y por lote.",
    "technologies": [
      "FactoryTalk View SE V16: aplicación SCADA con arquitectura de red distribuida y pantallas desarrolladas bajo los lineamientos ISA-101.",
      "Schneider Modicon M580 y servidor OPC KEPServer: lógica de control e intercambio de información entre los equipos y la supervisión.",
      "Microsoft SQL Server 2012 y FactoryTalk Transaction Manager V14: almacenamiento de históricos y transferencia de datos de proceso.",
      "Python: procesamiento de información y generación de reportes de toneladas producidas, consumo de materias primas y lotes fuera de especificación."
    ]
  },
  {
    "id": "02",
    "categories": [
      "Automatización",
      "Eléctrica",
      "IIoT"
    ],
    "label": "AUTOMATIZACIÓN & TABLEROS",
    "title": "Automatización de extrusora y embobinadora de película stretch",
    "name": "Automatización y puesta en servicio de una extrusora y una embobinadora de película stretch",
    "client": "Ajover - Darnel",
    "sector": "Plásticos y manufactura",
    "location": "Cartagena, Colombia",
    "description": "Ingeniería, fabricación de tableros y programación de control para dos máquinas, con ajuste de temperaturas, sincronización de velocidades y adquisición de datos de producción.",
    "tags": [
      "S7-1500",
      "ET200SP",
      "HMI Unified",
      "Eplan"
    ],
    "color": "blue",
    "icon": Workflow,
    "image": "extrusion-stretch",
    "alt": "Ilustración de una línea de extrusión y embobinado de película plástica con tableros de control",
    "detail": "INGENIAX ejecutó la automatización de una extrusora y una embobinadora para fabricar película stretch. El alcance abarcó desde la ingeniería de detalle y los tableros eléctricos hasta la puesta en marcha, la estabilización de las máquinas y su conexión con una plataforma de análisis de producción.",
    "scope": [
      "Diseño, fabricación y conexionado de tres tableros eléctricos, conformados por diez módulos de potencia, maniobra y control.",
      "Programación por bloques de un PLC S7-1500, tres periferias ET200SP y tres paneles HMI Unified Comfort.",
      "Pruebas FAT y SAT, puesta en marcha, sintonización de temperatura y sincronización de velocidades.",
      "Adquisición de variables mediante Modbus TCP/IP para el seguimiento de indicadores de producción.",
      "Capacitación del personal operativo y de mantenimiento."
    ],
    "results": [
      "Operación estable y confiable de la extrusora y la embobinadora después de la puesta en marcha y el ajuste de las variables de control.",
      "Estandarización de potencia, maniobra, control y supervisión bajo una arquitectura común que facilita el diagnóstico, el mantenimiento y futuras intervenciones.",
      "Disponibilidad de datos para seguir el desempeño de las máquinas y desarrollar iniciativas de análisis de productividad y optimización del proceso."
    ],
    "context": "El desarrollo de control se estructuró mediante programación por bloques, con funcionalidades para facilitar la operación, el diagnóstico de fallas y el mantenimiento preventivo. Durante la puesta en marcha se ajustaron los lazos de temperatura y la sincronización de velocidades; la adquisición de datos permitió llevar las variables relevantes de ambas máquinas a un servidor de la compañía.",
    "technologies": [
      "Eplan y TIA Selection Tool: diseño de los tableros eléctricos de potencia, maniobra y control.",
      "Siemens S7-1500 y tres periferias ET200SP: control de las máquinas mediante una arquitectura con entradas y salidas descentralizadas.",
      "Tres paneles HMI Unified Comfort: operación, gestión de usuarios, consulta de históricos y funcionalidades de mantenimiento.",
      "Modbus TCP/IP: comunicación de variables operativas con el servidor de la compañía para el cálculo de indicadores de producción."
    ]
  },
  {
    "id": "03",
    "categories": [
      "Automatización"
    ],
    "label": "SOPORTE & MANTENIMIENTO",
    "title": "Soporte de ingeniería para una planta de producción de pan",
    "name": "Soporte de ingeniería para el mantenimiento y la estabilización de una planta de producción de pan",
    "client": "Panificadora del Litoral",
    "sector": "Alimentos y bebidas",
    "location": "Barranquilla, Colombia",
    "description": "Soporte especializado a la línea Termopan: diagnóstico de fallas, mejoras de control y respaldo de programas para fortalecer la operación y el mantenimiento.",
    "tags": [
      "Siemens",
      "Rockwell Automation",
      "SEW Eurodrive"
    ],
    "color": "purple",
    "icon": Settings2,
    "image": "soporte-panificadora",
    "alt": "Ilustración de una línea industrial de panificación con horno y transportador de panes",
    "detail": "Mediante un contrato de horas mensuales de ingeniería, INGENIAX atendió el mantenimiento y la optimización de los sistemas de automatización de la línea Termopan. El servicio combinó soporte preventivo y correctivo, ajustes de programación y entrenamiento del equipo de mantenimiento.",
    "scope": [
      "Diagnóstico de fallas y atención de requerimientos de mantenimiento en equipos Siemens, Rockwell Automation y SEW Eurodrive.",
      "Respaldo de programas de PLC, HMI y variadores, con documentación de redes y listas de partes.",
      "Revisión de programas originales y ajustes en la cámara de fermentación y los perfiles de temperatura del horno.",
      "Entrenamiento en TIA Portal para identificar fallas de hardware y problemas de control."
    ],
    "results": [
      "Mayor estabilidad operativa mediante ajustes a los sistemas de control de las máquinas, contribuyendo a una operación más confiable de la línea.",
      "Fortalecimiento de las capacidades del personal de mantenimiento para reconocer fallas de hardware y problemas de control con herramientas de programación.",
      "Estandarización de los respaldos de PLC, HMI y variadores, junto con documentación de redes y partes, para disponer de información ante fallas de los equipos."
    ],
    "context": "El contrato contempló la disponibilidad de un ingeniero especialista en automatización y control para atender los requerimientos de la planta. La revisión de los programas suministrados por los fabricantes permitió identificar anomalías y oportunidades de mejora, con intervenciones en la cámara de fermentación y en los perfiles de temperatura del horno.",
    "technologies": [
      "Siemens y TIA Portal V16: revisión de programas, diagnóstico de fallas y entrenamiento en herramientas de programación.",
      "Rockwell Automation: análisis de equipos mediante Studio 5000, RSLogix 5000, RSLogix 500, FactoryTalk View ME y Connected Components Workbench (CCW).",
      "SEW Eurodrive: diagnóstico y análisis de los equipos de control presentes en la línea de producción."
    ]
  },
  {
    "id": "04",
    "categories": [
      "IIoT"
    ],
    "label": "DATOS & MANTENIMIENTO NAVAL",
    "title": "Plataforma de gestión de datos para un navío",
    "name": "Desarrollo de una plataforma de gestión de datos para un navío",
    "client": "Reservado",
    "sector": "Naval",
    "location": "Cartagena, Colombia",
    "description": "Plataforma web que centraliza variables de operación, registra horas de equipos y organiza el mantenimiento, con reportes automáticos para la tripulación.",
    "tags": [
      "JavaScript",
      "MongoDB",
      "Python",
      "PROFINET"
    ],
    "color": "cyan",
    "icon": Ship,
    "image": "datos-navio",
    "alt": "Ilustración de una sala de control naval con visualización de datos y mantenimiento",
    "detail": "INGENIAX diseñó e implementó una plataforma local para adquirir, procesar y visualizar datos del navío en tiempo real. La solución incorporó un módulo de mantenimiento planificado (PMS) y reportes que facilitan la integración de información con SAP.",
    "scope": [
      "Definición de la arquitectura, las variables, los contadores de horas y los niveles de seguridad de la aplicación.",
      "Integración de equipos mediante PROFINET, interfaz web en JavaScript e históricos en MongoDB.",
      "Configuración de cinco reportes y automatización del procesamiento de datos con Python.",
      "Asignación diaria de mantenimiento según el plan anual, seguimiento de actividades y reportes mensuales de cumplimiento.",
      "Capacitación de la tripulación y del personal de mantenimiento."
    ],
    "results": [
      "Centralización de variables operativas y datos de equipos críticos, con información disponible en tiempo real para apoyar la toma de decisiones.",
      "Mejor planificación del mantenimiento preventivo a partir del registro automático de horas de funcionamiento y el seguimiento de las actividades asignadas.",
      "Mayor trazabilidad administrativa mediante cinco reportes de consulta y reportes de cumplimiento del mantenimiento, junto con la automatización de información destinada a SAP."
    ],
    "context": "La tripulación dispone de una interfaz web para consultar indicadores y variables de operación, mientras el sistema registra automáticamente las horas de funcionamiento de los equipos. El módulo PMS organiza las actividades diarias según la planificación anual del navío, asigna responsables y permite dar seguimiento a su ejecución y al cumplimiento mensual.",
    "technologies": [
      "PROFINET: comunicación entre los equipos de control del navío y la plataforma, con centralización de información en un servidor local.",
      "JavaScript: desarrollo de la interfaz web adaptada a las necesidades de consulta de la tripulación.",
      "MongoDB y JSON: almacenamiento y administración de registros históricos en una base de datos NoSQL.",
      "Python: procesamiento de información y generación automatizada de reportes para la consulta operativa y la integración de información con SAP."
    ]
  },
  {
    "id": "05",
    "categories": [
      "Automatización",
      "Eléctrica"
    ],
    "label": "MODERNIZACIÓN DE CONTROL",
    "title": "Retrofit de control de posicionadoras de envases",
    "name": "Retrofit del sistema de control de las posicionadoras de envases de la línea de envasado de aceite",
    "client": "Alianza Team – Team Foods",
    "sector": "Alimentos y bebidas",
    "location": "Barranquilla, Colombia",
    "description": "Modernización del control de dos posicionadoras Posymat, con gestión de recetas, alarmas y ajustes de velocidad para mejorar el diagnóstico y la estabilidad operativa.",
    "tags": [
      "S7-1200",
      "HMI Unified 7”",
      "TIA Portal V17",
      "Eplan"
    ],
    "color": "blue",
    "icon": Zap,
    "image": "retrofit-posicionadoras",
    "alt": "Ilustración de una posicionadora de botellas vacías conectada a un transportador y un tablero de control",
    "detail": "INGENIAX actualizó la plataforma de control de dos posicionadoras de envases de una línea de envasado de aceite. Se conservaron las funciones del programa original y se incorporaron herramientas de operación y diagnóstico compatibles con la arquitectura de automatización de la línea.",
    "scope": [
      "Ingeniería de detalle, selección de equipos y migración de la lógica de control a PLC Siemens S7-1200.",
      "Desarrollo del HMI Unified de 7 pulgadas con recetas por referencia, condiciones de seguridad y diagnóstico de fallas.",
      "Programación en TIA Portal V17 y actualización de planos de conexionado en Eplan.",
      "Pruebas FAT y SAT, puesta en marcha, sincronización de velocidades y capacitación del personal."
    ],
    "results": [
      "Actualización de la plataforma con equipos actuales, favoreciendo la disponibilidad de repuestos y facilitando las actividades de mantenimiento.",
      "Identificación más ágil de condiciones anormales mediante las alarmas y las herramientas de diagnóstico incorporadas en el HMI.",
      "Condiciones estables de operación después de validar la lógica y ajustar la sincronización de velocidades de las máquinas.",
      "Base tecnológica compatible con futuras iniciativas de supervisión SCADA o gestión de datos industriales."
    ],
    "context": "La intervención partió de una ingeniería de detalle para seleccionar la nueva plataforma según las funciones de las máquinas y los requerimientos de modernización. La actualización del HMI incorporó recetas por referencia de producto, condiciones de seguridad y herramientas de diagnóstico; la puesta en marcha incluyó la validación de la lógica y la sincronización de velocidades.",
    "technologies": [
      "Siemens S7-1200: migración de la lógica del PLC, homologando las funcionalidades del programa original.",
      "Panel HMI Unified de 7 pulgadas: interfaz de operación con gestión de recetas, alarmas y diagnóstico.",
      "TIA Portal V17: programación del PLC y desarrollo de la aplicación gráfica del HMI.",
      "Eplan: actualización de planos eléctricos con las modificaciones de conexionado del PLC y el panel HMI."
    ]
  },
  {
    "id": "06",
    "categories": [
      "Automatización",
      "Eléctrica"
    ],
    "label": "POTENCIA & MODERNIZACIÓN",
    "title": "Retrofit de potencia de ranuradoras de tubos",
    "name": "Retrofit del sistema de potencia de las máquinas ranuradoras de tubos",
    "client": "CSP de Colombia (Steel City)",
    "sector": "Metalúrgico",
    "location": "Barranquilla, Colombia",
    "description": "Sustitución de 36 variadores de velocidad en dos ranuradoras de tubos, con adaptación del PLC y el HMI para conservar las funciones de operación.",
    "tags": [
      "CompactLogix",
      "RSLogix 5000",
      "PanelView Plus",
      "Eplan"
    ],
    "color": "cyan",
    "icon": Zap,
    "image": "retrofit-ranuradoras",
    "alt": "Ilustración de máquinas ranuradoras de tubos de acero y tableros con variadores de velocidad",
    "detail": "INGENIAX modernizó el sistema de potencia de dos máquinas de la planta de Ranurado, reemplazando dieciocho variadores por máquina. La intervención respondió a la limitada disponibilidad de repuestos e integró los nuevos equipos con el sistema de automatización existente.",
    "scope": [
      "Análisis de la lógica original y homologación de variadores para conservar la comunicación y los comandos operativos.",
      "Adaptación del PLC CompactLogix con RSLogix 5000: registros, comandos y formatos de intercambio de datos.",
      "Actualización del PanelView Plus en FactoryTalk View ME y de los planos de conexionado en Eplan.",
      "Pruebas FAT y SAT, puesta en marcha y capacitación del personal operativo y de mantenimiento."
    ],
    "results": [
      "Mitigación de la obsolescencia tecnológica mediante equipos de una familia activa, reduciendo la dependencia de dispositivos con repuestos de disponibilidad limitada.",
      "Continuidad de la integración industrial gracias a la adaptación de la lógica y de los registros de comunicación entre el PLC y los nuevos variadores.",
      "Operación estable de ambas máquinas tras las pruebas y la puesta en marcha, preservando las funciones operativas con la nueva plataforma de potencia."
    ],
    "context": "El reto consistió en sustituir 36 variadores sin perder las funciones de operación de las dos ranuradoras. Para ello se analizaron las diferencias entre las familias de equipos y se adaptaron los registros de lectura y escritura, los comandos de control y los formatos de intercambio de datos, conservando la integración con la automatización existente.",
    "technologies": [
      "Rockwell Automation CompactLogix y RSLogix 5000: actualización de la lógica del PLC para integrar los nuevos variadores.",
      "PanelView Plus y FactoryTalk View ME: adaptación de la interfaz gráfica a los cambios de control y a la nueva plataforma de potencia.",
      "Eplan: actualización de los planos eléctricos con las modificaciones de conexionado de los variadores de velocidad."
    ]
  }
];
