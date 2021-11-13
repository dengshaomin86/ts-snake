// 定义食物类
class Food {
  // 定义一个属性表示食物对应的元素
  private _el: HTMLElement;
  private _stageSize: number;
  private _size: number;
  constructor({ stageSize, size }: { stageSize: number; size: number }) {
    this._stageSize = stageSize;
    this._size = size;
    this._el = document.getElementById("food")!; // ! 表示不会为空
  }

  // 获取 x 轴坐标
  get X() {
    return this._el.offsetLeft;
  }
  // 获取 y 轴坐标
  get Y() {
    return this._el.offsetTop;
  }

  // 随机设置食物位置
  change() {
    const _per = this._stageSize / this._size;
    const left = Math.round(Math.random() * _per) * this._size;
    const top = Math.round(Math.random() * _per) * this._size;
    this._el.style.left = `${left}px`;
    this._el.style.top = `${top}px`;
  }
}

export default Food;
