export class SpriteAnimation {
    constructor(sceneContext, x, y, sprite, animInfo, onAnimComplete) {
        this.animInfo = animInfo;
        this.frameIdx = 0;
        this.duration = 0;
        this.onCompleteCallback = onAnimComplete;

        this.spriteObj = sceneContext.add.image(x, y, sprite, animInfo[0].frameId);
        this.spriteObj.displayWidth = 128;
        this.spriteObj.displayHeight = 128;
    }

    update(delta) {
        this.duration += delta;
        if (this.duration > this.animInfo[this.frameIdx].duration) {
            this.duration -= this.animInfo[this.frameIdx].duration;
            this.frameIdx++;

            if (this.frameIdx >= this.animInfo.length) {
                this.frameIdx = this.frameIdx % this.animInfo.length;
                if (this.onCompleteCallback !== undefined) {
                    this.onCompleteCallback();
                }
            }
            this.spriteObj.setFrame(this.animInfo[this.frameIdx].frameId);
        }
    }

    destroy() {
        this.spriteObj.destroy();
    }
}