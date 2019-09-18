export default class Tooltip {
    reference: any;
    options: any;
    _isOpen: boolean;
    _popperOptions: any;
    _isOpening: boolean;
    _tooltipNode: any;
    popperInstance: any;
    _showTimeout: any;
    constructor(reference: any, options: any);
    /**
     * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
     * Tooltips with zero-length titles are never displayed.
     * @method Tooltip#show
     * @memberof Tooltip
     */
    show: () => this;
    /**
     * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#hide
     * @memberof Tooltip
     */
    hide: () => this;
    /**
     * Hides and destroys an element’s tooltip.
     * @method Tooltip#dispose
     * @memberof Tooltip
     */
    dispose: () => this;
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
     * @method Tooltip#toggle
     * @memberof Tooltip
     */
    toggle: () => this;
    /**
     * Updates the tooltip's title content
     * @method Tooltip#updateTitleContent
     * @memberof Tooltip
     * @param {String|HTMLElement} title - The new content to use for the title
     */
    updateTitleContent: (title: any) => void;
    _events: any[];
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
    _create(reference: any, template: any, title: any, allowHtml: any): ChildNode;
    _addTitleContent(reference: any, title: any, allowHtml: any, titleNode: any): void;
    _show(reference: any, options: any): this;
    _hide(): this;
    _dispose(): this;
    _findContainer(container: any, reference: any): any;
    /**
     * Append tooltip to container
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} tooltipNode
     * @param {HTMLElement|String|false} container
     */
    _append(tooltipNode: any, container: any): void;
    _setEventListeners(reference: any, events: any[], options: any): void;
    _scheduleShow(reference: any, delay: any, options: any, evt: any): void;
    _scheduleHide(reference: any, delay: any, options: any, evt: any): void;
    _setTooltipNodeEvent: (evt: any, reference: any, delay: any, options: any) => boolean;
    _updateTitleContent(title: any): void;
    _clearTitleContent(titleNode: any, allowHtml: any, lastTitle: any): void;
}
/**
 * Title function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback TitleFunction
 * @return {String} placement - The desired title.
 */
