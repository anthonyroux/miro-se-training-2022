const { board } = window.miro;

async function init() {
  board.ui.on("icon:click", async () => {
    await board.ui.openModal({ url: "app.html" });
  });
}

// Initialize board
init();

export {};
