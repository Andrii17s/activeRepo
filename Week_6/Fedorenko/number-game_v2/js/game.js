class Game {
  #clickCount = 0; //лічильник спроб комп`ютера
  #continueGame = true; //токен завершення гри
  #currAvgValue; //поточне значення середини діапазону
  #currRangeStart = 0; //поточне значення початку діапазону
  #currRangeEnd = 1000; //поточне значення кінця діапазону
  #inputSource = document.querySelector('.block');

  avgValueInRange(a, b) {
    return Math.round((a + b) / 2);
  }

  #captureInput() {
    this.#inputSource.addEventListener('click', (e) => {
      if (this.#continueGame) {
        if (this.#clickCount === 0) {
          if (e.target.id === 'start') {
            this.#clickCount++;
            this.#currAvgValue = this.avgValueInRange(
              this.#currRangeStart,
              this.#currRangeEnd,
            );
            this.#displayQuestion(this.#currAvgValue, this.#clickCount);
          }
        } else {
          if (e.target.id === 'lower') {
            this.#clickCount++;
            this.#currRangeEnd = this.#currAvgValue;
            this.#currAvgValue = this.avgValueInRange(
              this.#currRangeStart,
              this.#currRangeEnd,
            );
            this.#displayQuestion(this.#currAvgValue, this.#clickCount);
          }

          if (e.target.id === 'higher') {
            this.#clickCount++;
            this.#currRangeStart = this.#currAvgValue;
            this.#currAvgValue = this.avgValueInRange(
              this.#currRangeStart,
              this.#currRangeEnd,
            );
            this.#displayQuestion(this.#currAvgValue, this.#clickCount);
          }
          if (e.target.id === 'correct') {
            this.#continueGame = false;
            this.#inputSource.querySelector(
              '.display',
            ).innerHTML = `<span class="success">Комп\`ютер вгадав ваше число з ${
              this.#clickCount
            } спроб!</span>`;
          }
        }
      }

      if (e.target.id === 'reset') {
        e.preventDefault();
        this.#reset();
      }
    });
  }

  #reset() {
    this.#clickCount = 0;
    this.#continueGame = true;
    this.#currAvgValue = undefined;
    this.#currRangeStart = 0;
    this.#currRangeEnd = 1000;
    this.#inputSource.querySelector('.display').innerHTML = '';
  }

  #displayQuestion(value, att) {
    this.#inputSource.querySelector(
      '.display',
    ).innerHTML = `<span class="success">Ваше число ${value}? (cпроба ${att})</span>`;
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.#captureInput();
    });
  }
}

new Game().init();
