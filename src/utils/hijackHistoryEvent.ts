import { getLocationHref ,setFlag, getFlag } from './util'

export default function() {
  if (getFlag('historyInjected')) return
  function historyEventTrigger(event:string, data:any) {
    const fetchEvent = new CustomEvent(event, { detail: data })
    window.dispatchEvent(fetchEvent)
  }

  function spellUrl(oldURL:string, newURL:string) {
    if (/:\/\//.test(newURL)) {
      return newURL
    }
    let host = oldURL.match(/^.*:\/\/[^/]+/)[0]
    return host + (/^\//.test(newURL) ? '' : '/') + newURL
  }

  let globalData = {
    url: getLocationHref()
  }

  const oldOnpopstate = window.onpopstate
  window.onpopstate = function() {
    let data = {
      newURL: window.location.href,
      oldURL: globalData.url
    }
    globalData.url = window.location.href
    historyEventTrigger.apply(this, ['historyPopstate', data])
    if (oldOnpopstate) {
      return oldOnpopstate.apply(this, arguments)
    }
  }

  const oldPushState = window.history.pushState
  oldPushState &&
    (window.history.pushState = function(state:any, title:string, url:string) {
      let data = {
        newURL: spellUrl(globalData.url, url),
        oldURL: globalData.url
      }
      globalData = {
        url: data.newURL
      }
      historyEventTrigger.apply(this, ['historyPushState', data])
      if (oldPushState) {
        return oldPushState.apply(this, arguments)
      }
    })

  setFlag('historyInjected', true)
}
