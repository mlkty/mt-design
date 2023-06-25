import importVisitor from 'babel-plugin-import-visitor';

export default function transformImportExt(extMap = {}) {
  const extMapKeys = Object.keys(extMap);
  return importVisitor(node => {
    const ext = extMapKeys.find(ext => node.value.endsWith(ext));
    if (ext) {
      const transformExt = extMap[ext];
      node.value = node.value.replace(ext, transformExt);
    }
  });
}
