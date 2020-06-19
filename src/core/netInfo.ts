export default function () {
  const connection =
    (window as any).navigator.connection ||
    (window as any).navigator.mozConnection ||
    (window as any).navigator.webkitConnection ||
    {};

  if (connection) {
    return {};
  }
  const type = connection.type || connection.effectiveType;
  if (!type) {
    return {};
  }
  return {
    netType: type
  };
}
