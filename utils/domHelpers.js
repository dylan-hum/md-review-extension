/**
 * domHelpers.js — Utility functions for querying and manipulating the DOM.
 * Shared across all modules in the extension.
 */

// eslint-disable-next-line no-var
var DomHelpers = (() => {
  "use strict";

  /**
   * Shorthand for querySelector scoped to a root element.
   * @param {string} selector
   * @param {Element|Document} root
   * @returns {Element|null}
   */
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  /**
   * Shorthand for querySelectorAll, returned as a real Array.
   * @param {string} selector
   * @param {Element|Document} root
   * @returns {Element[]}
   */
  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  /**
   * Create an element with optional attributes and children.
   * @param {string} tag
   * @param {Object<string,string>} [attrs]
   * @param {(string|Node)[]} [children]
   * @returns {HTMLElement}
   */
  function createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "className") {
        el.className = value;
      } else if (key === "textContent") {
        el.textContent = value;
      } else if (key.startsWith("data-") || key.startsWith("data_")) {
        el.setAttribute(key.replace(/_/g, "-"), value);
      } else {
        el.setAttribute(key, value);
      }
    }
    for (const child of children) {
      if (typeof child === "string") {
        el.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        el.appendChild(child);
      }
    }
    return el;
  }

  /**
   * Remove an element from the DOM if it exists.
   * @param {string} selector
   * @param {Element|Document} root
   */
  function removeIfExists(selector, root = document) {
    const el = qs(selector, root);
    if (el) el.remove();
  }

  /**
   * Check whether the current page is a GitHub PR "Files changed" page.
   * @returns {boolean}
   */
  function isPRFilesPage() {
    return /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+\/(files|changes)/.test(
      window.location.href
    );
  }

  /**
   * Debounce helper.
   * @param {Function} fn
   * @param {number} ms
   * @returns {Function}
   */
  function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  return { qs, qsa, createElement, removeIfExists, isPRFilesPage, debounce };
})();
