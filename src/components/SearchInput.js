import SearchResult from "./SearchResult.js";

export default function SearchInput({ $target, onChange }) {
  const $component = document.createElement("form");
  $component.className = "SearchInput";
  $target.appendChild($component);

  this.state = {
    inputValue: null,
  };
  this.setState = (nextState) => {
    this.state = nextState;
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
  };

  $component.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $component.addEventListener("keyup", (e) => {
    onChange(e);
  });

  this.render();
}
