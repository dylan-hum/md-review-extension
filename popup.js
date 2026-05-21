const SCROLL_BEHAVIOR_STORAGE_KEY = "md-review-scroll-behavior";
const THEME_MODE_STORAGE_KEY = "md-review-theme-mode";

function setOption(key, value) {
  chrome.storage.local.set({ [key]: value });
}

function loadState() {
  chrome.storage.local.get(
    {
      [SCROLL_BEHAVIOR_STORAGE_KEY]: "auto",
      [THEME_MODE_STORAGE_KEY]: "auto",
    },
    (items) => {
      const scrollCheckbox = document.getElementById("smooth-scroll");
      if (scrollCheckbox) {
        scrollCheckbox.checked = items[SCROLL_BEHAVIOR_STORAGE_KEY] === "smooth";
      }

      const themeSelect = document.getElementById("theme-mode");
      if (themeSelect) {
        themeSelect.value = items[THEME_MODE_STORAGE_KEY] === "light" || items[THEME_MODE_STORAGE_KEY] === "dark"
          ? items[THEME_MODE_STORAGE_KEY]
          : "auto";
      }
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const scrollCheckbox = document.getElementById("smooth-scroll");
  if (scrollCheckbox) {
    scrollCheckbox.addEventListener("change", () => {
      setOption(SCROLL_BEHAVIOR_STORAGE_KEY, scrollCheckbox.checked ? "smooth" : "auto");
    });
  }

  const themeSelect = document.getElementById("theme-mode");
  if (themeSelect) {
    themeSelect.addEventListener("change", () => {
      setOption(THEME_MODE_STORAGE_KEY, themeSelect.value);
    });
  }

  loadState();
});
