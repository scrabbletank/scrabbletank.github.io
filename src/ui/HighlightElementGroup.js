export class HighlightElementGroup {
    constructor(highlightClr, baseClr, highTextClr, baseTextClr) {
        this.highlightClr = highlightClr;
        this.baseClr = baseClr;
        this.highTextClr = highTextClr;
        this.baseTextClr = baseTextClr;

        this.elements = [];
    }

    addElement(element) {
        this.elements.push(element);
        var idx = this.elements.length - 1;
        element.onClickHandler(() => { this._updateHighlights(idx); });
    }

    _updateHighlights(idx) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].setBackgroundColor(this.baseClr);
            this.elements[i].setTextColor(this.baseTextClr);
        }
        this.elements[idx].setBackgroundColor(this.highlightClr);
        this.elements[idx].setTextColor(this.highTextClr);
    }
}