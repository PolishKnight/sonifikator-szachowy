class ThemeSwitcher {
  static STORAGE_KEY = "sonifikator-theme";

  constructor(buttons) {
    this.buttons = buttons;
    this.buttons.forEach((btn) =>
      btn.addEventListener("click", () => this.apply(btn.dataset.themeChoice)),
    );
    this.apply(localStorage.getItem(ThemeSwitcher.STORAGE_KEY) ?? "");
  }

  apply(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(ThemeSwitcher.STORAGE_KEY, theme);
    this.buttons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.themeChoice === theme),
    );
  }
}
