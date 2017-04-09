const getBaseUrl = () => {
  const inDevelopment = process.env.NODE_ENV !== "production";

  return inDevelopment
    ? "http://api.mealprep.dev/v0"
    : "http://api-mealprep.ddns.net/v0";
};

const baseUrl = getBaseUrl();

export default baseUrl;
