function filterUnwantedPosts() {
  // nono selectors
  const nonoDivSelector = 'div.update-components-header'
  const nonoSpanSelector = `div > ${nonoDivSelector} > div.update-components-header__text-wrapper > span.update-components-header__text-view > div.update-components-text-view > span > span`;
  const nonos = [" likes this", " loves this", " commented on this", " finds this funny", " celebrates this", " supports this", " finds this insightful"];
  const promotedText = "Promoted";
  // promo selectors
  const promoDivSelector = 'div.update-components-actor';
  const promoSelectorBase = `div > ${promoDivSelector} > a > div.update-components-actor__meta`;
  const promoSelector1 = `${promoSelectorBase} > span.update-components-actor__sub-description > div.update-components-text-view > span`;
  const promoSelector2 = `${promoSelectorBase} > span.update-components-actor__description > span`;
  
  // selection
  const nonoSpans = Array.from(document.querySelectorAll(nonoSpanSelector));
  const nonoDivs = nonoSpans.filter(span => nonos.includes(span.textContent))
                            .map(span => span.closest(nonoDivSelector).parentNode);
  const promoSpans1 = Array.from(document.querySelectorAll(promoSelector1));
  const promoSpans2 = Array.from(document.querySelectorAll(promoSelector2));
  const promoSpans = [...promoSpans1, ...promoSpans2];
  const promoDivs = promoSpans.filter(span => span.textContent === promotedText)
                              .map(span => span.closest(promoDivSelector).parentNode);
  const toRemove = [...nonoDivs, ...promoDivs];
  
  // filtering
  toRemove.filter(div => div).forEach(div => div.style.display = "none");
}

const observer = new MutationObserver(() => {
  filterUnwantedPosts();
});
observer.observe(document.body, { childList: true, subtree: true });
filterUnwantedPosts();