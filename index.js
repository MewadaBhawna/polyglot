import OpenAI from "openai";

const translateBtn = document.querySelector(".translate-button");
translateBtn.addEventListener("click", translateData);
const startOverBtn = document.querySelector(".start-over-button");
startOverBtn.addEventListener("click", addDisplayNone);
let text = "";
const languageInput = document.getElementsByName("language");
let selectedLanguage = "French";
const openai = new OpenAI({
  dangerouslyAllowBrowser: true,
});

function translateData() {
  try {
    const textInput = document.getElementById("textToTranslate");
    text = textInput.value;
    if (text.length > 0) {
      for (let i = 0; i < languageInput.length; i++) {
        if (languageInput[i].checked) selectedLanguage = languageInput[i].value;
      }
      callTranslateAPI();
    } else {
      alert("enter text to translate");
    }
  } catch (err) {
    console.error(err);
  }
}
async function callTranslateAPI() {
  try {
    const messages = [
      {
        role: "system",
        content: `you are a expert language translator. you translate given data into ${selectedLanguage} language`,
      },
      { role: "user", content: text },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 1.1,
    });
    document.getElementById("inputScreen").classList.add("displayNone");
    document.getElementById("resultScreen").classList.remove("displayNone");
    document.getElementById("originalData").innerHTML = text;
    document.getElementById("translatedData").innerHTML =
      response.choices[0].message.content;
  } catch (err) {
    console.error(err);
  }
}

function addDisplayNone() {
  document.getElementById("inputScreen").classList.remove("displayNone");
  document.getElementById("resultScreen").classList.add("displayNone");
  document.getElementById("textToTranslate").value = "";
  document.getElementById("originalData").innerHTML = "";
  document.getElementById("translatedData").innerHTML = "";
  languageInput[0].checked = true;
}
