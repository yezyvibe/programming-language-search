import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import SelectedLanguages from "./components/SelectedLanguages.js";
import { request } from "./utils/api.js";

export default function App($target) {
  let debounce = null;
  this.state = {
    fetchLanguages: [],
    selectedLanguages: [],
    inputValue: null,
    currentIndex: 0, // 현재 선택한 거 추가
  };

  this.setState = (nextState) => {
    this.state = nextState;
    searchResult.setState({
      suggestions: this.state.fetchLanguages,
      currentIndex: 0,
    });
    selectedLanguages.setState(this.state.selectedLanguages);
  };

  const searchInput = new SearchInput({
    $target,
    initialState: this.state.inputValue,
    onChange: async (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "Enter")
        return;
      const $input = e.target.closest("input");
      if (debounce) {
        clearTimeout(debounce);
      }
      debounce = setTimeout(async () => {
        const result = await request($input.value);
        this.setState({
          ...this.state,
          inputValue: $input.value,
          fetchLanguages: result,
        });
      }, 200);
    },
  });

  const searchResult = new SearchResult({
    $target,
    initialState: {
      suggestions: [],
      currentIndex: 0,
    },
    onClick: async (e) => {
      const $li = e.target.closest("li");
      if ($li) {
        const { selectedId } = $li.dataset;
        const selectedLanguage = this.state.fetchLanguages.find(
          (language, index) => index === parseInt(selectedId)
        );
        console.log(selectedLanguage, "click: 선택한 언어 출력까지 완료");
        // alert(selectedLanguage)
        this.setState({
          ...this.state,
          selectedLanguages: [
            ...this.state.selectedLanguages,
            selectedLanguage,
          ],
        });
      }
    },
    onSelect: async (e) => {
      if (e) {
        const selectedLanguage = this.state.fetchLanguages.find(
          (language, index) => index === e
        );
        console.log(selectedLanguage, "Enter: 선택한 언어 출력까지 완료");
        // alert(selectedLanguage)
        this.setState({
          ...this.state,
          selectedLanguages: [
            ...this.state.selectedLanguages,
            selectedLanguage,
          ],
        });
      }
    },
  });

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: this.state.selectedLanguages,
  });
}
