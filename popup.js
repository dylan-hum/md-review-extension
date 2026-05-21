const SCROLL_BEHAVIOR_STORAGE_KEY = "md-review-scroll-behavior";

function setSmoothEnabled(enabled) {
  const value = enabled ? "smooth" : "auto";
  chrome.storage.local.set({ [SCROLL_BEHAVIOR_STORAGE_KEY]: value });
}

function loadState() {
  chrome.storage.local.get({ [SCROLL_BEHAVIOR_STORAGE_KEY]: "auto" }, (items) => {
    const smooth = items[SCROLL_BEHAVIOR_STORAGE_KEY] === "smooth";
    const checkbox = document.getElementById("smooth-scroll");
    if (checkbox) checkbox.checked = smooth;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("smooth-scroll");
  if (!checkbox) return;

  checkbox.addEventListener("change", () => {
    setSmoothEnabled(checkbox.checked);
  });

  loadState();
});
