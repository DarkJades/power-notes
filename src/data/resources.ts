export const resourceTypes = {
  standard: '标准与规范',
  datasheet: '数据手册',
  'application-note': '应用笔记',
  'design-template': '设计模板',
  'test-report': '测试与案例',
  tool: '工具与软件',
  other: '其他资料',
} as const;

export const resourceTypeOrder = Object.keys(resourceTypes) as Array<keyof typeof resourceTypes>;

export const displayFileName = (path: string) => path.split('/').at(-1) || '下载资料';
