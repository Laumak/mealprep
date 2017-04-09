const getBaseUrl = () => {
  const inDevelopment = window.localtion.hostname === "localhost";
  return inDevelopment ? "http://localhost:3001/" : "/";
}

const baseUrl = getBaseUrl();

export default baseUrl;
