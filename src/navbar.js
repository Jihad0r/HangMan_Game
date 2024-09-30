export function Navbar({ cate, correct }) {
  return (
    <div class="game-info">
      <h4 class="game-name">Hangman</h4>
      <div class="score">
        Your Score: <span>{correct}</span>
      </div>
      <div class="category">
        Word From: <span>{cate}</span>
      </div>
    </div>
  );
}
