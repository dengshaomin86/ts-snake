import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

interface Options {
  speed?: number;
  increaseSpeed?: number;
  maxLevel?: number;
  scoreStep?: number;
}

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  // 方向
  direction: string = "";
  // 是否存活
  isLive: boolean = true;
  // 是否暂停
  isPause: boolean = false;
  // 蛇身宽度
  private _size: number = 0;
  // 初始速度
  private _speed: number = 300;
  // 递增速度
  private _increaseSpeed: number = 30;
  // 最高等级
  private _maxLevel: number = 10;
  // 升级步长
  private _scoreStep: number = 10;
  constructor(options?: Options) {
    this.setOptions(options);
    const stageEl: HTMLElement = document.getElementById("stage")!;
    const foodEl: HTMLElement = document.getElementById("food")!;
    const stageSize = stageEl.clientWidth - foodEl.clientWidth;
    this._size = foodEl.clientWidth;
    this.snake = new Snake({ stageSize });
    this.food = new Food({ stageSize, size: this._size });
    this.scorePanel = new ScorePanel(this._maxLevel, this._scoreStep);
    this.init();
  }

  setOptions(options?: Options) {
    if (!options) return;
    const { speed, increaseSpeed, maxLevel, scoreStep } = options;
    speed && (this._speed = speed);
    increaseSpeed && (this._increaseSpeed = increaseSpeed);
    maxLevel && (this._maxLevel = maxLevel);
    scoreStep && (this._scoreStep = scoreStep);
  }

  init() {
    // keydownHandler this 指向了 document（js this 谁调用指向谁）
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }

  /**
   * 键盘事件句柄函数
   * @param event
   * ArrowUp
   * ArrowDown
   * ArrowLeft
   * ArrowRight
   * ie: Up/Down/Left/Right
   */
  keydownHandler({ key, code }: KeyboardEvent) {
    if (!this.isLive) return;

    // 空格切换暂停、继续
    if (key === "Spacebar" || code === "Space") {
      this.isPause = !this.isPause;
      if (!this.isPause) this.run();
      return;
    }

    if (this.isPause) return;

    const arr1 = ["ArrowUp", "Up", "ArrowDown", "Down"];
    const arr2 = ["ArrowLeft", "Left", "ArrowRight", "Right"];
    if (![...arr1, ...arr2].includes(key)) return;
    // 禁止调头
    const result = [arr1, arr2].find((item) => item.includes(this.direction) && item.includes(key));
    if (result) return;
    this.direction = key;
  }

  /**
   * 根据方向移动
   */
  run() {
    const size = this._size;
    let left = this.snake.X;
    let top = this.snake.Y;

    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        top -= size;
        break;
      case "ArrowDown":
      case "Down":
        top += size;
        break;
      case "ArrowLeft":
      case "Left":
        left -= size;
        break;
      case "ArrowRight":
      case "Right":
        left += size;
        break;
    }

    // 检查是否吃到食物
    this.checkEat(left, top);

    try {
      this.snake.X = left;
      this.snake.Y = top;
    } catch (e: any) {
      this.gameOver(e.message);
    }

    const time = this._speed - (this.scorePanel.level - 1) * this._increaseSpeed;
    this.isLive && !this.isPause && setTimeout(this.run.bind(this), time);
  }

  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.change();
      // 分数增加
      this.scorePanel.addScore();
      // 增加蛇身
      this.snake.addBody();
    }
  }

  gameOver(message: string) {
    this.isLive = false;
    console.log(message);
  }
}

export default GameControl;
