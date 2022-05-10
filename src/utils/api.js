const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const cache = {};

export const request = async (language) => {
  if (!language.trim()) {
    return [];
  }
  if (cache[language]) {
    return cache[language];
  }
  try {
    const response = await fetch(
      `${API_END_POINT}/languages?keyword=${language}`
    );
    if (response.ok) {
      const json = await response.json();
      if (json.length > 0) {
        cache[language] = json;
        console.log(cache, "캐시 저장");
      }
      return json;
    } else {
      console.log("해당 언어 없음");
      return [];
    }
  } catch (e) {
    console.log(e.message);
  }
};
