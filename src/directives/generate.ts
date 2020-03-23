import actionTracker from '../core/actionTracker';
import pageTimeTracker from '../core/pageTimeTracker';
import { notChanged, isEmpty } from '../utils/util';

const generate = function(type: string) {
  let watch: any[] = [];

  const track = {
    bind(el: HTMLElement, binding: any, vnode: any) {
      let index = watch.findIndex(element => element === el);
      let isWatched = index !== -1;
      if (el.style.display === 'none') {
        if (!isWatched) watch.push(el);
        return;
      } else {
        if (isWatched) watch.splice(index, 1);
      }

      if (!isWatched && (notChanged(binding) || isEmpty(binding))) return;

      let info: any = {};

      if (typeof binding.value === 'object') {
        info = binding.value;
        //if (value.pageURL) args.push(value.pageURL)
      } else if (typeof binding.value === 'string' && binding.value) {
        info.trackId = binding.value;
      }
      if (type === 'PAGE') {
        actionTracker.trackPage(info);
      } else {
        actionTracker.trackView(el, info);
      }
    },
    unbind(el: HTMLElement, binding: any) {
      let index = watch.findIndex(element => element === el);
      if (index !== -1) watch.splice(index, 1);
      pageTimeTracker.change();
    },
    update(el: HTMLElement, binding: any, vnode: any) {}
  };

  track.update = track.bind;
  return track;
};

export default generate;
