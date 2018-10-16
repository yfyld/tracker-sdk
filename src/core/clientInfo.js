export default function () {
		return {
			cleintWidth: window.screen.height,
			cleintHeight: window.screen.width,
			title: document.title || '',
			referrer: document.referrer || '',
			domain: document.domain || '',
		}
}
