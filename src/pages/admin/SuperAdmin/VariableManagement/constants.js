export const SECTION_LABELS = {
  HERO: "Hero",
  INDUSTRIES: "Áreas de Atuação",
  PARTNERS: "Empresas Parceiras",
};

export const VIEW_TABS = [
  {
    id: "home",
    label: "Home",
    description: "Hero autenticado + hero público, áreas e parceiros.",
  },
  {
    id: "weeklyTips",
    label: "Dicas da semana",
    description: "Sugestões rápidas para destacar na plataforma.",
  },
  {
    id: "globalVars",
    label: "Variáveis globais",
    description: "Texto e links reutilizados em várias páginas.",
  },
];

export const DEFAULT_GLOBAL_OPTIONS = {
  functions: [],
  competences: [],
  geoAreas: [],
  activitySectors: [],
};

export const OPTION_LABELS = {
  functions: "função",
  competences: "competência",
  geoAreas: "área geográfica",
  activitySectors: "setor de atividade",
};

export const EMPTY_FORMS = {
  industry: {
    name: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    active: true,
  },
  partner: {
    name: "",
    description: "",
    imageUrl: "",
    websiteUrl: "",
    active: true,
  },
};
