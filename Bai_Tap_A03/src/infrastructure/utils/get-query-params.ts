const getQueryParams = (url: string): Record<string, string> => {
  const query = url.split("?")[1];
  if (!query) return {};
  const queryParams = query.split("&");
  const result: Record<string, string> = {};
  queryParams.forEach((param) => {
    const [key, value] = param.split("=");
    result[key] = value;
  });
  return result;
};

export default getQueryParams;
