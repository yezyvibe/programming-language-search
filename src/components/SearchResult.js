export default function SearchResult({
  $target,
  initialState,
  onClick,
  onSelect,
}) {
  this.state = initialState;
  const $component = document.createElement("div");
  $component.className = "Suggestion";
  $target.appendChild($component);

  const local = JSON.parse(localStorage.getItem("searchItems"));
  if (local) {
    this.state.suggestions = local.fetchLanguages;
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.renderMatchedItem = (keyword, item) => {
    if (!item.includes(keyword)) {
      return item;
    }
    const matchedText = item.match(new RegExp(keyword, "gi"))[0];
    return item.replace(
      new RegExp(matchedText, "gi"),
      `<span class="Suggestion__item--matched">${matchedText}</span>`
    );
  };

  this.render = () => {
    $component.innerHTML = `
    ${
      this.state.suggestions.length > 0
        ? `<ul>
    ${this.state.suggestions
      .map(
        (language, index) =>
          `<li class="${
            index === this.state.currentIndex
              ? "Suggestion__item--selected"
              : ""
          }" data-selected-id="${index}">${this.renderMatchedItem(
            this.state.inputValue,
            language
          )}</li>`
      )
      .join("")}
    </ul >`
        : ""
    }`;
    $component.style.display =
      this.state.suggestions.length > 0 ? "block" : "none";
  };

  $target.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      this.state.currentIndex--;
    } else if (e.key === "ArrowDown") {
      this.state.currentIndex++;
    }
    if (this.state.currentIndex >= this.state.suggestions.length) {
      this.state.currentIndex = 0; // 배열 길이 넘은 경우 초기화
    } else if (this.state.currentIndex < 0) {
      this.state.currentIndex = this.state.suggestions.length - 1; // 맨 밑으로 이동
    }
    this.setState({
      ...this.state,
      currentIndex: this.state.currentIndex,
    });
  });

  $target.addEventListener("click", (e) => {
    onClick(e);
  });

  $target.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && this.state.suggestions.length > 0) {
      onSelect(this.state.currentIndex);
    }
  });
  this.render();
}
