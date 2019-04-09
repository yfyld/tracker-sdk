interface Window {
  Event: any
  CustomEvent: any
  _trackerFlag: { [propName: string]: any },
  _trackerPageId:string
  _trackerAnalyseDisableDide:boolean
}

interface HTMLElement {
  _trackerInfo: any
  _isWatchTrack: boolean
}


interface Element{
  content:string
}