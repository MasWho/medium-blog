'use client'

import { createPortal } from "react-dom";
import { ToastIntent } from "./context";
import { useEffect, useState } from "react";

const intentColorMap = {
  success: "rgb(34, 197, 94)",
  error: "rgb(239, 68, 68)",
  warning: "rgb(234, 179, 8)",
  info: "rgb(59, 130, 246)",
};

function ToastBody(props: {
  message: string;
  intent: ToastIntent;
}) {
  const [slide, setSlide] = useState<boolean>(false);
  const { message, intent } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlide(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const color = intentColorMap[intent];

  return (
    <aside
      className={`flex justify-center w-full fixed bottom-0 left-0 opacity-0 text-center transition-all duration-[200ms] ${slide ? "-translate-y-10 opacity-100" : ""}`}
    >
      <p className={`bg-white py-[1rem] px-[5%] rounded-md relative blue-500`} style={{color: color}}>
        <span className={`absolute top-0 left-0 rounded-l-md h-full w-[10%]`} style={{backgroundColor: color}}/>
        {message}
      </p>
    </aside>
  );
}

export default function Toast(props: {
  message: string;
  intent: ToastIntent;
}) {
  const portal = createPortal(
    <ToastBody {...props} />,
    document.body
  );

  return <>{portal}</>;
}
