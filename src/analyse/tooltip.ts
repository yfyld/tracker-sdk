import  Popper from 'popper.js';
import {isFunction} from '../utils/util';

const DEFAULT_OPTIONS = {
  container: false,
  delay: 0,
  html: false,
  placement: 'top',
  title: '',
  template:
    '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  offset: 0,
  arrowSelector: '.tooltip-arrow, .tooltip__arrow',
  innerSelector: '.tooltip-inner, .tooltip__inner',
};

export default class Tooltip {
  reference:any=null
  options:any={}
  _isOpen:boolean=false;
  _popperOptions:any={};
  _isOpening:boolean=false
  _tooltipNode:any=null;
  popperInstance:any=null;
  _showTimeout:any=null
  constructor(reference:any, options:any) {
    // apply user options over default ones
    options = { ...DEFAULT_OPTIONS, ...options };

    reference.jquery && (reference = reference[0]);

    // cache reference and options
    this.reference = reference;
    this.options = options;
  //  this.onUpdate=options.onUpdate||noop

    // get events list
    const events =
      typeof options.trigger === 'string'
        ? options.trigger
            .split(' ')
            .filter(
              (trigger:any) => ['click', 'hover', 'focus'].indexOf(trigger) !== -1
            )
        : [];

    // set initial state
    this._isOpen = false;
    this._popperOptions = {};

    // set event listeners
    this._setEventListeners(reference, events, options);
  }

  //
  // Public methods
  //

  /**
   * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
   * Tooltips with zero-length titles are never displayed.
   * @method Tooltip#show
   * @memberof Tooltip
   */
  show = () => this._show(this.reference, this.options);

  /**
   * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#hide
   * @memberof Tooltip
   */
  hide = () => this._hide();

  /**
   * Hides and destroys an element’s tooltip.
   * @method Tooltip#dispose
   * @memberof Tooltip
   */
  dispose = () => this._dispose();

  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#toggle
   * @memberof Tooltip
   */
  toggle = () => {
    if (this._isOpen) {
      return this.hide();
    } else {
      return this.show();
    }
  };

  /**
   * Updates the tooltip's title content
   * @method Tooltip#updateTitleContent
   * @memberof Tooltip
   * @param {String|HTMLElement} title - The new content to use for the title
   */
  updateTitleContent = (title:any) => this._updateTitleContent(title);

  //
  // Private methods
  //

  _events:any[] = [];

  /**
   * Creates a new tooltip node
   * @memberof Tooltip
   * @private
   * @param {HTMLElement} reference
   * @param {String} template
   * @param {String|HTMLElement|TitleFunction} title
   * @param {Boolean} allowHtml
   * @return {HTMLElement} tooltipNode
   */
  _create(reference:any, template:any, title:any, allowHtml:any) {
    // create tooltip element
    const tooltipGenerator = window.document.createElement('div');
    tooltipGenerator.innerHTML = template.trim();
    const tooltipNode = tooltipGenerator.childNodes[0];

    // add unique ID to our tooltip (needed for accessibility reasons)
    (tooltipNode as Element).id = `tooltip_${Math.random()
      .toString(36)
      .substr(2, 10)}`;

    // set initial `aria-hidden` state to `false` (it's visible!)
    (tooltipNode as Element).setAttribute('aria-hidden', 'false');

    // add title to tooltip
    const titleNode = tooltipGenerator.querySelector(this.options.innerSelector);
    this._addTitleContent(reference, title, allowHtml, titleNode);

    // return the generated tooltip node
    return tooltipNode;
  }

  _addTitleContent(reference:any, title:any, allowHtml:any, titleNode:any) {
    if (title.nodeType === 1 || title.nodeType === 11) {
      // if title is a element node or document fragment, append it only if allowHtml is true
      allowHtml && titleNode.appendChild(title);
    } else if (isFunction(title)) {
      // if title is a function, call it and set textContent or innerHtml depending by `allowHtml` value
      const titleText = title.call(reference);
      allowHtml
        ? (titleNode.innerHTML = titleText)
        : (titleNode.textContent = titleText);
    } else {
      // if it's just a simple text, set textContent or innerHtml depending by `allowHtml` value
      allowHtml ? (titleNode.innerHTML = title) : (titleNode.textContent = title);
    }
  }

  _show(reference:any, options:any) {
    // don't show if it's already visible
    // or if it's not being showed
    if (this._isOpen && !this._isOpening) {
      return this;
    }
    this._isOpen = true;

    // if the tooltipNode already exists, just show it
    if (this._tooltipNode) {
      this._tooltipNode.style.visibility = 'visible';
      this._tooltipNode.setAttribute('aria-hidden', 'false');
      this.popperInstance.update();
      return this;
    }

    // get title
    const title = reference.getAttribute('title') || options.title;

    // don't show tooltip if no title is defined
    if (!title) {
      return this;
    }

    // create tooltip node
    const tooltipNode:any = this._create(
      reference,
      options.template,
      title,
      options.html
    );

    // Add `aria-describedby` to our reference element for accessibility reasons
    reference.setAttribute('aria-describedby', tooltipNode.id);

    // append tooltip to container
    const container = this._findContainer(options.container, reference);

    this._append(tooltipNode, container);

    this._popperOptions = {
      ...options.popperOptions,
      placement: options.placement,
    };

    this._popperOptions.modifiers = {
      ...this._popperOptions.modifiers,
      arrow: {
        element: this.options.arrowSelector,
      },
      offset: {
        offset: options.offset,
      },
    };

    if (options.boundariesElement) {
      this._popperOptions.modifiers.preventOverflow = {
        boundariesElement: options.boundariesElement,
      };
    }

    this.popperInstance = new Popper(
      reference,
      (tooltipNode as Element),
      this._popperOptions
    );

    this._tooltipNode = tooltipNode;

    return this;
  }

  _hide() {
    // don't hide if it's already hidden
    if (!this._isOpen) {
      return this;
    }

    this._isOpen = false;

    // hide tooltipNode
    this._tooltipNode.style.visibility = 'hidden';
    this._tooltipNode.setAttribute('aria-hidden', 'true');

    return this;
  }

  _dispose() {
    // remove event listeners first to prevent any unexpected behaviour
    this._events.forEach(({ func, event }) => {
      this.reference.removeEventListener(event, func);
    });
    this._events = [];

    if (this._tooltipNode) {
      this._hide();

      // destroy instance
      this.popperInstance.destroy();

      // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element
      if (!this.popperInstance.options.removeOnDestroy) {
        this._tooltipNode.parentNode.removeChild(this._tooltipNode);
        this._tooltipNode = null;
      }
    }
    return this;
  }

  _findContainer(container:any, reference:any) {
    // if container is a query, get the relative element
    if (typeof container === 'string') {
      container = window.document.querySelector(container);
    } else if (container === false) {
      // if container is `false`, set it to reference parent
      container = reference.parentNode;
    }
    return container;
  }

  /**
   * Append tooltip to container
   * @memberof Tooltip
   * @private
   * @param {HTMLElement} tooltipNode
   * @param {HTMLElement|String|false} container
   */
  _append(tooltipNode:any, container:any) {
    container.appendChild(tooltipNode);
  }

  _setEventListeners(reference:any, events:any[], options:any) {
    const directEvents:any[] = [];
    const oppositeEvents:any[] = [];

    events.forEach(event => {
      switch (event) {
        case 'hover':
          directEvents.push('mouseenter');
          oppositeEvents.push('mouseleave');
          break;
        case 'focus':
          directEvents.push('focus');
          oppositeEvents.push('blur');
          break;
        case 'click':
          directEvents.push('click');
          oppositeEvents.push('click');
          break;
      }
    });

    // schedule show tooltip
    directEvents.forEach(event => {
      const func = (evt:any) => {
        if (this._isOpening === true) {
          return;
        }
        evt.usedByTooltip = true;
        this._scheduleShow(reference, options.delay, options, evt);
      };
      this._events.push({ event, func });
      reference.addEventListener(event, func);
    });

    // schedule hide tooltip
    oppositeEvents.forEach(event => {
      const func = (evt:any) => {
        if (evt.usedByTooltip === true) {
          return;
        }
        this._scheduleHide(reference, options.delay, options, evt);
      };
      this._events.push({ event, func });
      reference.addEventListener(event, func);
      if (event === 'click' && options.closeOnClickOutside) {
        document.addEventListener('mousedown', e => {
          if (!this._isOpening) {
            return;
          }
          const popper = this.popperInstance.popper;
          if (reference.contains(e.target) ||
              popper.contains(e.target)) {
            return;
          }
          func(e);
        }, true);
      }
    });
  }

  _scheduleShow(reference:any, delay:any, options:any , evt:any ) {
    this._isOpening = true;
    // defaults to 0
    const computedDelay = (delay && delay.show) || delay || 0;
    this._showTimeout = window.setTimeout(
      () => this._show(reference, options),
      computedDelay
    );
  }

  _scheduleHide(reference:any, delay:any, options:any, evt:any) {
    if(window._trackerAnalyseDisableDide){
      return;
    }
    this._isOpening = false;
    // defaults to 0
    const computedDelay = (delay && delay.hide) || delay || 0;
    window.setTimeout(() => {
      window.clearTimeout(this._showTimeout);
      if (this._isOpen === false) {
        return;
      }
      if (!document.body.contains(this._tooltipNode)) {
        return;
      }

      // if we are hiding because of a mouseleave, we must check that the new
      // reference isn't the tooltip, because in this case we don't want to hide it
      if (evt.type === 'mouseleave') {
        const isSet = this._setTooltipNodeEvent(evt, reference, delay, options);

        // if we set the new event, don't hide the tooltip yet
        // the new event will take care to hide it if necessary
        if (isSet) {
          return;
        }
      }

      this._hide();
    }, computedDelay);
  }

  _setTooltipNodeEvent = (evt:any, reference:any, delay:any, options:any) => {
    const relatedreference =
      evt.relatedreference || evt.toElement || evt.relatedTarget;

    const callback = (evt2:any) => {
      const relatedreference2 =
        evt2.relatedreference || evt2.toElement || evt2.relatedTarget;

      // Remove event listener after call
      this._tooltipNode.removeEventListener(evt.type, callback);

      // If the new reference is not the reference element
      if (!reference.contains(relatedreference2)) {
        // Schedule to hide tooltip
        this._scheduleHide(reference, options.delay, options, evt2);
      }
    };

    if (this._tooltipNode.contains(relatedreference)) {
      // listen to mouseleave on the tooltip element to be able to hide the tooltip
      this._tooltipNode.addEventListener(evt.type, callback);
      return true;
    }

    return false;
  };

  _updateTitleContent(title:any) {
    if(typeof this._tooltipNode === 'undefined') {
      if(typeof this.options.title !== 'undefined') {
        this.options.title = title;
      }
      return;
    }
    const titleNode = this._tooltipNode.parentNode.querySelector(this.options.innerSelector);
    this._clearTitleContent(titleNode, this.options.html, this.reference.getAttribute('title') || this.options.title)
    this._addTitleContent(this.reference, title, this.options.html, titleNode);
    this.options.title = title;
    this.popperInstance.update();
  }

  _clearTitleContent(titleNode:any, allowHtml:any, lastTitle:any) {
    if(lastTitle.nodeType === 1 || lastTitle.nodeType === 11) {
      allowHtml && titleNode.removeChild(lastTitle);
    } else {
      allowHtml ? titleNode.innerHTML = '' : titleNode.textContent = '';
    }
  }

}

/**
 * Title function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback TitleFunction
 * @return {String} placement - The desired title.
 */
