import "./css/Sidebar.css";
import React from "react";
import ChatMessageBox from './aside/ChatMessageBox/ChatMessageBox';

const Sidebar = ({ width, height }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button>
        <div className="content">
          <ChatMessageBox />
        </div>
      </div>
    </>
  );
};

export default Sidebar;