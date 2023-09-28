export const setupSql = async () => {
  const initSqlJs = (await import('sql.js')).default;
  const sql = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });

  return sql;
};
