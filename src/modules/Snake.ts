class Snake {
  // 蛇容器
  private _el: HTMLElement;
  // 蛇头
  private _head: HTMLElement;
  // 蛇身（包括蛇头）
  private _bodies: HTMLCollection;
  private _stageSize: number;
  constructor({ stageSize }: { stageSize: number }) {
    this._stageSize = stageSize;
    this._el = document.getElementById("snake")!;
    this._head = document.querySelector("#snake>div")!;
    // querySelectorAll 返回的是 NodeList；getElementsByTagName 返回的是 HTMLCollection
    this._bodies = this._el.getElementsByTagName("div");
  }

  get X() {
    return this._head.offsetLeft;
  }

  set X(value: number) {
    if (this.X === value) return;
    if (value < 0 || value > this._stageSize) throw new Error("蛇撞墙了！");
    this.moveBody();
    this._head.style.left = `${value}px`;
    this.checkHeadBody();
  }

  get Y() {
    return this._head.offsetTop;
  }

  set Y(value: number) {
    if (this.Y === value) return;
    if (value < 0 || value > this._stageSize) throw new Error("撞墙了！");
    this.moveBody();
    this._head.style.top = `${value}px`;
    this.checkHeadBody();
  }

  addBody() {
    this._el.insertAdjacentHTML("beforeend", "<div></div>");
  }

  /**
   * 将后边身体位置设置为前一节的位置，从后往前设置位置
   */
  moveBody() {
    for (let i = this._bodies.length - 1; i > 0; i--) {
      // 前边身体的位置
      const prev = this._bodies[i - 1] as HTMLElement;
      const X = prev.offsetLeft;
      const Y = prev.offsetTop;
      const current = this._bodies[i] as HTMLElement;
      current.style.left = `${X}px`;
      current.style.top = `${Y}px`;
    }
  }

  /**
   * 检查头、身体相撞
   */
  checkHeadBody() {
    for (let i = 1; i < this._bodies.length; i++) {
      const current = this._bodies[i] as HTMLElement;
      if (this.X === current.offsetLeft && this.Y === current.offsetTop) {
        throw new Error("撞到自己了！");
      }
    }
  }
}

export default Snake;
