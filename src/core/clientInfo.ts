export default function() {
  return {
    clientWidth: window.screen.height,
    clientHeight: window.screen.width,
    title: document.title || '',
    referrer: document.referrer || '',
    domain: document.domain || ''
  };
}
