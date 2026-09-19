export const site = {
  name: '电源拾光',
  description: '把电力电子中的原理、设计与工程经验，整理成可检索、可验证、可持续修订的技术笔记。',
  email: 'powersg@126.com',
  url: 'https://www.powershiguang.com',
};

export const baseUrl = import.meta.env.BASE_URL;
export const resolveUrl = (path: string) => {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.replace(/^\/+/, '');
  return `${base}${cleanPath}`;
};

export const categories = {
  'power-electronics': '电力电子',
  components: '元器件',
  analog: '模拟电路',
  pcb: 'PCB',
  engineering: '工程经验',
  'ai-hardware': 'AI 与硬件',
} as const;
