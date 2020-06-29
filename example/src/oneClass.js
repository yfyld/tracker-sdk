import { tracker, after, before } from '../../dist/telescope.min';

class OneClass {
  constructor() {
    this.qqq = 'wode';
  }

  @tracker('fn1')
  fn1() {
    console.log('fn1', this);
  }
  @tracker({ trackId: 'fn2Id' })
  fn2() {
    console.log('fn2', this);
  }
  @tracker(function () {
    console.log(this);
    return { trackId: 'fn3Id' };
  })
  fn3() {
    console.log('fn3', this);
  }

  @tracker(
    after(function () {
      console.log(this);
      console.log('fn4 after');
      return { trackId: 'fn4Id' };
    })
  )
  fn4() {
    console.log('fn4');
  }

  @tracker(
    before(function () {
      console.log('fn5 before', this);
      return { trackId: 'fn5Id' };
    })
  )
  fn5() {
    console.log(this);
    console.log('fn5');
  }

  @tracker(
    after(() => {
      console.log('fn6 after');
      return { trackId: 'fn6Id' };
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

  @tracker(after('fn7Id'))
  fn7() {
    console.log('fn7');
  }

  @tracker(after('fn8Id'))
  fn8() {
    console.log('fn8');
  }
}

window.test = new OneClass();
