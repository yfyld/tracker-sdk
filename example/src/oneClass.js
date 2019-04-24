import { track, after, before, setConfig } from '../../dist/tracker.min';


class OneClass {
  constructor() {
    this.qqq = 'wode';
  }

  @track("fn1")
  fn1() {
    console.log('fn1', this);
  }
  @track({trackId:'fn2Id'})
  fn2() {
    console.log('fn2', this);
  }
  @track(() => ({ trackId: 'fn3Id'}))
  fn3() {
    console.log('fn3', this);
  }

  @track(
    after(function() {
      console.log(this)
      console.log('fn4 after')
      return {trackId:"fn4Id"}
    })
  )
  fn4() {
    console.log('fn4');
  }

  @track(
    before(() => {
      console.log('fn5 before')
      return { trackId: "fn5Id" }
    })
  )
  fn5() {
    console.log('fn5');
  }

  @track(
    after(() => {
      console.log('fn6 after')
      return { trackId: 'fn6Id' }
    })
  )
  fn6() {
    return new Promise((resolve, reject) => {
      console.log('fn6');
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  @track(after('fn7Id'))
  fn7() {
    console.log('fn7');
  }
}

window.test=new OneClass();
