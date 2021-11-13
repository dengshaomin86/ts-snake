/**
 * snake
 */
import "./style/index.less";
import GameControl from "./modules/GameControl";

console.log("欢迎体验贪吃蛇小游戏！");

new GameControl();

document.getElementById("reset")?.addEventListener("click", () => {
  location.reload();
});
