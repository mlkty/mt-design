export default function transformImportExt(extMap) {

  const extMapKeys = Object.keys(extMap);

  return {
    visitor: {
      ImportDeclaration(path) {
        const { value } = path.node.source;
        const ext = extMapKeys.find(ext => value.endsWith(ext));
        if (ext) {
          const newSource = value.replace(ext, extMap[ext]);
          source.value = newSource;
        }
      },
    },
  };
}
