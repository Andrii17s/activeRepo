class Game {
  #clickCount = 0; //лічильник спроб комп`ютера
  #currAvgValue; //поточне значення середини діапазону
  #currRangeStart = 0; //поточне значення початку діапазону
  #currRangeEnd = 1000; //поточне значення кінця діапазону
  #inputSource = document.querySelector('.block');

  avgValueInRange(a, b) {
    return Math.round((a + b) / 2);
  }

  #captureInput() {
    this.#inputSource.addEventListener('click', (e) => {

      if (e.target.id === 'start') {
        this._toggleBtns(false);
        this.#clickCount++;
        this.#currAvgValue = this.avgValueInRange(
          this.#currRangeStart,
          this.#currRangeEnd,
        );
        this.#displayQuestion(this.#currAvgValue, this.#clickCount);
      }
      if (e.target.id === 'lower') {
        this.#clickCount++;
        this.#currRangeEnd = this.#currAvgValue;
        this.#currAvgValue = this.avgValueInRange(
          this.#currRangeStart,
          this.#currRangeEnd,
        );
        if (this.#clickCount === 11) {
          this.#inputSource.querySelector(
            '.display',
          ).innerHTML = `<span class="success">Ти ж чесно граєш?</span>`;
        } else {
          this.#displayQuestion(this.#currAvgValue, this.#clickCount);
        }
      }

      if (e.target.id === 'higher') {
        this.#clickCount++;
        this.#currRangeStart = this.#currAvgValue;
        this.#currAvgValue = this.avgValueInRange(
          this.#currRangeStart,
          this.#currRangeEnd,
        );
        if (this.#clickCount === 11) {
          this.#inputSource.querySelector(
            '.display',
          ).innerHTML = `<span class="success">Ти ж чесно граєш?</span>`;
        } else {
          this.#displayQuestion(this.#currAvgValue, this.#clickCount);
        }
      }
      if (e.target.id === 'correct') {
        document.querySelector('#lower').disabled = true;
        document.querySelector('#higher').disabled = true;
        document.querySelector('#correct').disabled = true;
        this.#inputSource.querySelector(
          '.display',
        ).innerHTML = `<span class="success">Комп\`ютер вгадав твоє число з ${
          this.#clickCount
        } спроб! Твоє число ${this.#currAvgValue}</span>`;
      }

      if (e.target.id === 'reset') {
        e.preventDefault();
        this.#reset();
      }
    });
  }

  #reset() {
    this.#clickCount = 0;
    this.#currAvgValue = undefined;
    this.#currRangeStart = 0;
    this.#currRangeEnd = 1000;
    this.#inputSource.querySelector('.display').innerHTML = `<span class="success">Загадай випадкове число <br/> від 1 до 1000</span>`;
    this._toggleBtns(true);
  }

  #displayQuestion(value, att) {
    this.#inputSource.querySelector(
      '.display',
    ).innerHTML = `<span class="success">Твоє число ${value}? (cпроба ${att})</span>`;
  }

  _toggleBtns(value) {
    document.querySelector('#start').disabled = !value;
    document.querySelector('#lower').disabled = value;
    document.querySelector('#higher').disabled = value;
    document.querySelector('#correct').disabled = value;
    document.querySelector('#reset').disabled = value;
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.#captureInput();
    });
    this._toggleBtns(true);
    this.#inputSource.querySelector('.display').innerHTML = `<span class="success">Загадай випадкове число <br/> від 1 до 1000</span>`;
  }
}

new Game().init();
