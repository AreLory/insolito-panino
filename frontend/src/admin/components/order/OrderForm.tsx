import React, { useState } from "react";
import type { Order, OrderStatus } from "../../../types/order";
import TimePicker from "../../../components/shared/TimePicker";

type Props = {
  initialValues?: Order | null;
  onSubmit: (data: Partial<Order>) => void;
  onClose: () => void;
};

export default function OrderForm({ initialValues, onClose, onSubmit }: Props) {
  const [confirmedTime, setConfirmedTime] = useState(() => {
    if (initialValues?.confirmedTime) {
      return new Date(initialValues.confirmedTime).toTimeString().slice(0, 5);
    }

    if (initialValues?.requestedTime) {
      return new Date(initialValues.requestedTime).toTimeString().slice(0, 5);
    }

    return "18:00";
  });
  const [status, setStatus] = useState<OrderStatus>(
    initialValues?.status || "pending",
  );

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  let finalConfirmedTime = null;

  if (initialValues?.requestedTime) {
    const baseDate = new Date(initialValues.requestedTime);
    const [hours, minutes] = confirmedTime.split(":").map(Number);

    baseDate.setHours(hours, minutes, 0, 0);

    finalConfirmedTime = baseDate.toISOString();
  }

  onSubmit({
    confirmedTime: finalConfirmedTime,
    status,
  });
};

  const requestedTimeDate = initialValues?.requestedTime
    ? new Date(initialValues.requestedTime)
    : null;

  return (
    <div>
      <div className="fixed inset-0 z-40">
        <div className="w-full h-full bg-black opacity-20"></div>
      </div>
      <div className="fixed top-[40vh] inset-0 flex justify-center items-start z-50">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg space-y-4 w-[50vw] max-w-3xl shadow-lg"
        >
          <div>
            {requestedTimeDate && (
              <h2>
                Orario scelto dal cliente:{" "}
                {requestedTimeDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h2>
            )}
          </div>
          <TimePicker
            value={confirmedTime}
            onChange={(time) => setConfirmedTime(time)}
            stepOptions={[5, 10, 15]}
            minTime="10:00"
            maxTime="23:00"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OrderStatus)}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="in_preparation">In preparation</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>

          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Salva
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Annulla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
