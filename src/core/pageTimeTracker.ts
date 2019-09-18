import { send } from './send'
import { ACTION_TYPE } from '../constant'
import { getConfig } from './config'
import { Config, TrackerData } from '../types'
class PageTimeTracker {
  static instance: PageTimeTracker = null
  startTime = Date.now()
  endTime = Date.now()
  invalidStartTime = Date.now()
  invalidEndTime = Date.now()
  totalInvalidTime = 0
  config: Config = null
  info: TrackerData = {}

  static getInstance() {
    if (!PageTimeTracker.instance) {
      PageTimeTracker.instance = new PageTimeTracker()
    }
    return PageTimeTracker.instance
  }

  start() {
    this.startTime = Date.now()
    this.config = getConfig()
    window.addEventListener('visibilitychange', () => {
      var isHidden = document.hidden
      if (isHidden) {
        this.invalidStartTime = Date.now()
      } else {
        this.invalidEndTime = Date.now()
        this.totalInvalidTime += this.invalidEndTime - this.invalidStartTime
      }
    })
  }

  end() {
    this.endTime = Date.now()
    let data = {
      actionType: ACTION_TYPE.PAGE,
      startTime: this.startTime,
      endTime: this.endTime,
      durationTime: this.endTime - this.startTime - this.totalInvalidTime,
      ...this.info
    }
    if (this.config.autoTrakerPage) {
      send(data)
    }
  }

  change() {
    this.invalidEndTime = this.invalidStartTime = this.endTime = Date.now()
    let data = {
      actionType: ACTION_TYPE.PAGE,
      startTime: this.startTime,
      endTime: this.endTime,
      trackId: this.info.trackId,
      durationTime: this.endTime - this.startTime - this.totalInvalidTime,
      ...this.info
    }
    if (this.config.autoTrakerPage || this.info.trackId) {
      send(data)
      this.info = {}
    }
    this.startTime = this.endTime
  }
}

let instance = PageTimeTracker.getInstance()
export default instance
