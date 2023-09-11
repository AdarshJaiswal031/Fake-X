export const handleClickTabs = (
  idclicked,
  id,
  idTabActive,
  idTab,
  activeColor,
  color,
  textColor
) => {
  const elementClicked = document.getElementById(idclicked);
  const element = document.getElementById(id);
  const TabActive = document.getElementById(idTabActive);
  const Tab = document.getElementById(idTab);
  elementClicked.style.display = "contents";
  element.style.display = "none";
  TabActive.style.background = activeColor;
  TabActive.style.color = color;
  Tab.style.background = color;
  Tab.style.color = textColor;
};

export function copyToClipboard(event) {
  // Get the text to be copied
  const textToCopy = evnet.target.textContent;

  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text inside the textarea
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the textarea from the document
  document.body.removeChild(textarea);

  // Optionally, you can provide some feedback to the user indicating that the text is copied.
  alert("Text copied to clipboard: " + textToCopy);
}
