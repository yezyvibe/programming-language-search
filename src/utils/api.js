const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (language) => {
  if (!language.trim()) {
    return [];
  }
  try {
    const response = await fetch(
      `${API_END_POINT}/languages?keyword=${language}`
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      console.log("해당 언어 없음");
      return [];
    }
  } catch (e) {
    console.log(e.message);
  }
};
