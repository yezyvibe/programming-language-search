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
      ...this.state,
      suggestions: this.state.fetchLanguages,
      currentIndex: 0,
    });
    selectedLanguages.setState(this.state.selectedLanguages);

    localStorage.setItem("searchItems", JSON.stringify(this.state));
  };

  const selectedLanguages = new SelectedLanguages({
    $target,
    initialState: this.state.selectedLanguages,
  });

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
      keyword: this.state.inputValue,
    },
    onClick: async (e) => {
      const $li = e.target.closest("li");
      if ($li) {
        const { selectedId } = $li.dataset;
        const selectedLanguage = this.state.fetchLanguages.find(
          (language, index) => index === parseInt(selectedId)
        );
        alert(selectedLanguage);
        let nextSelectedLanguages = removeSameLangs(selectedLanguage);
        this.setState({
          ...this.state,
          selectedLanguages: nextSelectedLanguages,
        });
      }
    },
    onSelect: async (e) => {
      if (e >= 0) {
        const selectedLanguage = this.state.fetchLanguages.find(
          (language, index) => index === e
        );
        alert(selectedLanguage);
        let nextSelectedLanguages = removeSameLangs(selectedLanguage);
        this.setState({
          ...this.state,
          selectedLanguages: nextSelectedLanguages,
        });
      }
    },
  });

  // 중복된 언어 처리
  const removeSameLangs = (selectedLang) => {
    const nextSelectedLangs = [...this.state.selectedLanguages];
    const index = nextSelectedLangs.findIndex(
      (language) => language === selectedLang
    );
    if (index >= 0) {
      nextSelectedLangs.splice(index, 1); // 해당 index에 있는 요소 1개만 제거
    }
    nextSelectedLangs.push(selectedLang);
    return nextSelectedLangs;
  };
}
