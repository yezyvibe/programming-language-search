import SelectedLanguage from "./SelectedLanguage.js";

export default function SearchResult({ $target, initialState }) {
  this.state = initialState;
  const $component = document.createElement("div");
  $component.className = "Suggestion";
  $target.appendChild($component);
  console.log("시작", this.state);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $component.innerHTML = `
    ${
      this.state.inputResult.length > 0
        ? `<ul>
    ${this.state.inputResult
      .map(
        (language, index) =>
          `<li class="${
            index === this.state.currentIndex
              ? "Suggestion__item--selected"
              : ""
          }" data-selected-id="${index}">${language}</li>`
      )
      .join("")}
    </ul >`
        : ""
    }`;
    $component.style.display =
      this.state.inputResult.length > 0 ? "block" : "none";
  };

  $target.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      this.state.currentIndex--;
    } else if (e.key === "ArrowDown") {
      this.state.currentIndex++;
    }
    if (this.state.currentIndex >= this.state.inputResult.length) {
      this.state.currentIndex = 0; // 배열 길이 넘은 경우 초기화
    } else if (this.state.currentIndex < 0) {
      this.state.currentIndex = this.state.inputResult.length - 1; // 맨 밑으로 이동
    }
    this.setState({
      ...this.state,
      currentIndex: this.state.currentIndex,
    });
  });

  $target.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    if ($li) {
      const { selectedId } = $li.dataset;
      const selectedLanguage = this.state.inputResult.find(
        (language, index) => index === parseInt(selectedId)
      );
      console.log(selectedLanguage, "선택한 언어 출력까지 완료");
    }
  });

  // 엔터 누른 경우 언어 선택 이벤트 발생하기

  this.render();
}
