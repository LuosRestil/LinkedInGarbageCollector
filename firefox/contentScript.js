const nonoWordList = [
  'promoted',
  'promoted by ',
  'likes this',
  'loves this',
  'commented on this',
  'finds this funny',
  'celebrates this',
  'supports this',
  'finds this insightful',
];
const nonoWords = new Set(nonoWordList);

const nonoRootSelectorList = [
  'div.update-components-header',
  'div.update-components-actor',
];

function filterUnwantedPosts() {
  const spans = Array.from(document.querySelectorAll('span'))
    .filter(span => span.textContent && nonoWords.has(span.textContent.trim().toLowerCase()));
  spans.forEach(span => removeRootElement(span));
}

function removeRootElement(elem) {
  let curr = elem;
  while (curr !== null && !nonoRootSelectorList.some(selector => curr.matches(selector))) {
    curr = curr.parentElement;
  }
  if (curr) {
    curr.parentElement.remove();
  }
}

const observer = new MutationObserver(() => {
  filterUnwantedPosts();
});
observer.observe(document.body, { childList: true, subtree: true });
filterUnwantedPosts();