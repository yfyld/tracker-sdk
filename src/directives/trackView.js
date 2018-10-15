import actionTracker from '../core/actionTracker'
import { notChanged, isEmpty } from '../utils/util'

export let watch = []

const trackView = {
  bind (el, binding) {
    let index = watch.findIndex(element => element === el)
    let isWatched = index !== -1
    if (el.style.display === 'none') {
      if (!isWatched) watch.push(el)
      return
    } else {
      if (isWatched) watch.splice(index, 1)
    }

    if (!isWatched && (notChanged(binding) || isEmpty(binding))) return

    let info = {}

    if (typeof binding.value === 'object') {
      info = binding.value
      //if (value.pageURL) args.push(value.pageURL)
    } else if (typeof binding.value === 'string' && binding.value) {
      info.trackId = binding.value
    }
    actionTracker.trackPage(info)
  },
  unbind (el, binding) {
    let index = watch.findIndex(element => element === el)
    if (index !== -1) watch.splice(index, 1)
  }
}

trackView.update = trackView.bind

export default trackView
