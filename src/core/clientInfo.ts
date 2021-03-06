export default function () {
  return {
    clientWidth: window.screen.height,
    clientHeight: window.screen.width,
    radio: window.devicePixelRatio || 1,
    domain: document.domain || '',
    appId: null,
    appVersion: null,
    appType: 'H5'
  };
}
