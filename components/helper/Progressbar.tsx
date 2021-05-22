import React, { useEffect, useState } from "react";
import CSS from "csstype";

type ProgressbarProps = {
  progress: number;
  limit: number;
  className?: string;
};

function Progressbar({ progress, limit, className }: ProgressbarProps) {
  const [progressBar, setProgressBar] = useState<CSS.Properties>();
  useEffect(() => {
    setProgressBar({ width: `${(100 / limit) * progress}%` });
  }, [progress, limit]);
  return (
    <div
      className={
        "w-full h-3 rounded-full overflow-hidden bg-gray-200 " + className
      }
    >
      <div
        className="h-full bg-gradient-to-br from-green-500 to-blue-500"
        style={progressBar}
      ></div>
    </div>
  );
}

export default Progressbar;
