import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import type { BoardWidgets, DropEvent } from "@mirohq/websdk-types";

const { board } = miro;
let stickyNote: BoardWidgets;

function App() {
  const images = [
    "https://static-website.miro.com/static/images/page/mr-features-1/tour-m-projects.svg",
    "https://static-website.miro.com/static/images/page/mr-features-1/tour-m-account.svg",
    "https://static-website.miro.com/static/images/page/mr-features-1/tour-m-product.svg",
    "https://static-website.miro.com/static/images/page/mr-features-1/tour-m-ux-research.svg",
    "https://static-website.miro.com/static/images/page/mr-features-1/tour-m-learn.svg",
  ];

  // What is that???
  const hardCodedURL = "https://www.idlememe.com/wp-content/uploads/2022/04/wtf-meme-idlememe-14.jpg";

  const drop = async (e: DropEvent) => {
    const { x, y, target } = e;

    if (target instanceof HTMLImageElement) {
      const image = await board.createImage({ x: 0, y: 300, url: hardCodedURL });
      await board.viewport.zoomTo(stickyNote);
    }
  };

  // Register the drop event handler once.
  useEffect(() => {
    board.ui.on("drop", drop);
    // Why will we need to create a sticky note here?
    addSticky();
  });

  // A sticky note? Why?
  async function addSticky() {
    stickyNote = await miro.board.createStickyNote({
      content: 'Hello, SE!',
    });
  }

  return (
    <div className="main">
      {images.map((image, index) => {
        return (
          <img
            src={image}
            draggable={false}
            className="miro-draggable draggable-item"
            key={index}
          />
        );
      })}
    </div>
  );
}

// Render App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
