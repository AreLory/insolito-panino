import { useEffect } from "react";

interface Props {
  reqTime: string;
  onChange: (date: Date) => void;
}

export default function TimeSlotSelector({ reqTime, onChange }: Props) {
  const OPEN_TIME = 18 * 60 + 30; // 18:30
  const CLOSE_TIME = 21 * 60 + 30; // 21:30
  const SLOT_INTERVAL = 10;
  const PREP_TIME = 10;

  const slotToDate = (minutes: number) => {
    const date = new Date();
    date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
    return date;
  };

  const nowMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  const formatSlot = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const dateToMinutes = (date: Date) =>
    date.getHours() * 60 + date.getMinutes();

  const generateSlots = () => {
    const slots: number[] = [];

    const minStart = Math.max(OPEN_TIME, nowMinutes() + PREP_TIME);

    for (let t = minStart; t <= CLOSE_TIME; t += SLOT_INTERVAL) {
      slots.push(t);
    }

    return slots;
  };

  const slots = generateSlots();

  const requestedTimeDate: Date = reqTime
    ? new Date(reqTime)
    : slotToDate(slots[0] ?? OPEN_TIME);

  const selectedSlot = dateToMinutes(requestedTimeDate);

  useEffect(() => {
    if (!reqTime && slots.length > 0) {
      onChange(slotToDate(slots[0]));
    }
  }, [reqTime, slots]);

  return (
    <div className="w-full flex flex-col items-center py-4 px-8">
      <h2 className="text-lg font-semibold mb-3">Seleziona orario</h2>

      <div className="grid grid-cols-4 gap-2 w-full">
        {slots.map((slot: any) => {
          const isSelected = slot === selectedSlot;

          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange(slotToDate(slot))}
              className={`
                          py-2 rounded-xl border text-sm font-medium transition
                          ${
                            isSelected
                              ? "bg-orange-600 text-white border-orange-600"
                              : "bg-white text-gray-700 border-gray-200"
                          }
                        `}
            >
              {formatSlot(slot)}
            </button>
          );
        })}
      </div>

      <span className="text-sm text-gray-500 mt-2">
        Orario selezionato: {formatSlot(selectedSlot)}
      </span>
    </div>
  );
}
