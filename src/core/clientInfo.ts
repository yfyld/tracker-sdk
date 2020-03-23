export default function() {
  return {
    clientWidth: window.screen.height,
    clientHeight: window.screen.width,
    domain: document.domain || ''
  };
}
