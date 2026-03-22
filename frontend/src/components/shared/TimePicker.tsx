import { useState, useEffect } from "react";

type Props = {
  value?: string;
  onChange: (time: string) => void;

  stepOptions?: number[];
  minTime?: string;
  maxTime?: string;
};

export default function TimePicker({
  value = "18:00",
  onChange,
  stepOptions = [5, 10, 15],
  minTime,
  maxTime,
}: Props) {

  
  useEffect(() => {
    if (value) {
      setMinutes(timeToMinutes(value));
    }
  }, [value]);

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (minutes: number) => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");

    const m = (minutes % 60).toString().padStart(2, "0");

    return `${h}:${m}`;
  };

  const [minutes, setMinutes] = useState(() => timeToMinutes(value));

  const min = minTime ? timeToMinutes(minTime) : 0;
  const max = maxTime ? timeToMinutes(maxTime) : 24 * 60 - 1;

  const changeTime = (delta: number) => {
    setMinutes((prev) => {
      let next = prev + delta;

      if (next < min) next = min;
      if (next > max) next = max;

      onChange(minutesToTime(next));
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Display */}
      <div className="text-3xl font-bold">{minutesToTime(minutes)}</div>

      {/* Increment */}
      <div className="flex gap-2">
        {stepOptions.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => changeTime(step)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            +{step}
          </button>
        ))}
      </div>

      {/* Decrement */}
      <div className="flex gap-2">
        {stepOptions.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => changeTime(-step)}
            className="px-3 py-1 bg-gray-500 text-white rounded"
          >
            -{step}
          </button>
        ))}
      </div>
    </div>
  );
}
