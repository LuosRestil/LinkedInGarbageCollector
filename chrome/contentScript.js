let loadButton;

document.addEventListener("scroll", () => {
  if (!loadButton) {
    findLoadButton();
    return;
  }
  const buttonPosition =
    loadButton.getBoundingClientRect().top + window.scrollY;
  const userScrollPosition = window.scrollY + window.innerHeight;
  const delta = buttonPosition - userScrollPosition;
  if (delta < 100) {
    loadButton.click();
    loadButton = findLoadButton();
  }
});

function findLoadButton() {
  loadButton = Array.from(document.querySelectorAll("button")).find((btn) =>
    btn.textContent.includes("Show more feed updates")
  );
}

const nonoWords = new Set([
  "promoted",
  "promoted by",
  "likes this",
  "loves this",
  "commented on this",
  "finds this funny",
  "celebrates this",
  "supports this",
  "finds this insightful",
]);

const nonoRootSelectorList = [
  "div.update-components-header",
  "div.update-components-actor",
];

const nonoRootParentSelector = "div.relative";

function filterUnwantedPosts() {
  const spans = Array.from(document.querySelectorAll("span")).filter(
    (span) =>
      // span.childNodes[0].nodeValue represents the opening text of a span
      span.childNodes[0]?.nodeValue &&
      nonoWords.has(span.childNodes[0].nodeValue.trim().toLowerCase())
  );
  spans.forEach((span) => removeRootElement(span));
}

function removeRootElement(elem) {
  let curr = elem;
  while (
    curr !== null &&
    !nonoRootSelectorList.some((selector) => curr.matches(selector))
  ) {
    curr = curr.parentElement;
  }

  if (curr) {
    while (curr !== null && !curr.matches(nonoRootParentSelector)) {
      curr = curr.parentElement;
    }
    curr.parentElement.remove();
  }
}

const observer = new MutationObserver(() => {
  filterUnwantedPosts();
});
observer.observe(document.body, { childList: true, subtree: true });
filterUnwantedPosts();

