import { request } from "../utils/api.js";
import SearchResult from "./SearchResult.js";

export default function SearchInput($target) {
  const $component = document.createElement("form");
  $component.className = "SearchInput";
  $target.appendChild($component);
  let debounce = null;
  let searchResult = null;
  this.state = {
    inputValue: null,
    inputResult: [],
  };
  this.setState = (nextState) => {
    this.state = nextState;
    searchResult.setState({
      ...this.state,
      inputResult: this.state.inputResult,
      currentIndex: 0,
    });
    searchResult.render();
  };

  this.render = () => {
    $component.innerHTML = `
      <input
        class="SearchInput__input"
        type="text"
        placeholder="프로그램 언어를 입력하세요."
        value=""
      />
    `;
    if (!searchResult) {
      searchResult = new SearchResult({
        $target: $target,
        initialState: {
          inputResult: this.state.inputResult,
          currentIndex: 0,
        },
      });
    }
  };

  $component.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $component.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") return;
    const $input = e.target.closest("input");
    if (debounce) {
      clearTimeout(debounce);
    }
    debounce = setTimeout(async () => {
      const result = await request($input.value);
      this.setState({
        ...this.state,
        inputValue: $input.value,
        inputResult: result,
      });
    }, 200);
  });

  this.render();
}
