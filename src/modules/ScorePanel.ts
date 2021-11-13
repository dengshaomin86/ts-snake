// 记分牌
class ScorePanel {
  score = 0;
  level = 1;
  private _scoreEl: HTMLElement;
  private _levelEl: HTMLElement;
  constructor(private _maxLevel: number = 10, private _scoreStep: number = 10) {
    this._scoreEl = document.getElementById("score")!;
    this._levelEl = document.getElementById("level")!;
  }

  addScore() {
    this._scoreEl.innerText = ++this.score + "";
    if (this.score % this._scoreStep === 0) this.levelUp();
  }

  // 升级
  levelUp() {
    if (this.level >= this._maxLevel) return;
    this._levelEl.innerText = ++this.level + "";
  }
}

export default ScorePanel;
