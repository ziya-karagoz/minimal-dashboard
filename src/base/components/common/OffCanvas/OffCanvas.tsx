import React from "react";
type OffCanvasProps = {
  Title: string | undefined;
  children: React.ReactNode;
  placement: "start" | "end" | "top" | "bottom";
  show: boolean;
  onHide: () => void;
};

const OffCanvas = ({
  Title,
  children,
  placement,
  show,
  onHide,
}: OffCanvasProps) => {
  const closeModal = () => {
    if (onHide) {
      onHide();
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 ${placement === "end" ? "right-0" : "left-0"
          } h-full ${show ? "block" : "hidden"
          } overflow-y-auto bg-white shadow-lg w-1/2`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h5 className="text-lg font-semibold">{Title}</h5>
          <button onClick={closeModal} className="text-xl font-semibold">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default OffCanvas;
