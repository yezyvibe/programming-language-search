export default function SelectedLanguages({ $target, initialState }) {
  const $component = document.createElement("div");
  $component.className = "SelectedLanguage";
  $target.appendChild($component);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $component.innerHTML = `
      <ul>
        ${this.state
          ?.map((language) => {
            `<li>${language}</li>`;
          })
          .join("")}
      </ul>
    `;
  };

  this.render();
}
