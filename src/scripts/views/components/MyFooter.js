class MyFooter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
        <footer>
            <span>Copyright &copy; 2024 Restoas</span>
        </footer>
        `;
  }
}

customElements.define('my-footer', MyFooter);
