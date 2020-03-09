class Move3d {
    constructor(id, deg) {
      this.oDiv = id;
      this.disX = 0;
      this.disY = 0;
      this.oldDisX = 0;
      this.oldDisY = 0;
      this.init();
      this.once = true;
      this.deg = deg;
    }
    init() {
      this.oDiv.style.transition = "all 0.7s cubic-bezier(0.03,0.98,0.52,0.99)";
      let timeOut;
      this.oDiv.onmousemove = ev => {
        ev.stopPropagation();
        const scale = parseFloat(this.oDiv.offsetHeight) / this.deg;
        this.disX += (this.once ? 0 : ev.clientX) - this.oldDisX;
        this.disY += (this.once ? 0 : ev.clientY) - this.oldDisY;
        if (this.once) {
          this.oDiv.style.transition =
            "all 0.7s cubic-bezier(0.03,0.98,0.52,0.99)";
          setTimeout(() => {
            this.oDiv.style.transition = null;
          }, 1000);
        }
        this.oDiv.style.transform = `perspective(1000px) rotateX(${this.disY /
          scale}deg) rotateY(${this.disX / scale}deg) scale3d(0.94, 0.94, 0.94)`;
        this.oldDisX = ev.clientX;
        this.oldDisY = ev.clientY;
        this.once = false;
        clearTimeout(timeOut);
      };
      this.oDiv.onmouseleave = ev => {
        timeOut = setTimeout(() => {
          this.disX = 0;
          this.disY = 0;
          this.oldDisX = 0;
          this.oldDisY = 0;
          this.once = true;
          this.oDiv.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }, 100);
      };
    }
  }

export default Move3d