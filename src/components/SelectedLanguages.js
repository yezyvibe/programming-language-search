export default function SelectedLanguages({ $target, initialState }) {
  const MAX_LENGTH = 5;
  const $component = document.createElement("div");
  $component.className = "SelectedLanguage";
  $target.appendChild($component);

  this.state = initialState;
  const local = JSON.parse(localStorage.getItem("searchItems"));
  if (local) {
    this.state = local.selectedLanguages;
  }
  this.setState = (nextState) => {
    this.state = nextState;
    if (this.state.length >= MAX_LENGTH) {
      this.state = this.state.slice(this.state.length - MAX_LENGTH);
    }
    this.render();
  };

  this.render = () => {
    $component.innerHTML = `
      <ul>
        ${this.state.map((language) => `<li>${language}</li>`).join("")}
      </ul>
    `;
  };
  this.render();
}
