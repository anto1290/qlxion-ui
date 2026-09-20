import * as React from "react";
import { cn } from "@qlxion-ui/utils";

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue = new Date(),
  onChange,
  minDate,
  maxDate,
  className,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date>(defaultValue);
  const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleSelectDate = (day: number) => {
    const newDate = new Date(year, month, day);
    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    if (controlledValue === undefined) {
      setUncontrolledValue(newDate);
    }
    onChange?.(newDate);
  };

  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  const isDayDisabled = (day: number) => {
    const d = new Date(year, month, day);
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true;
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true;
    return false;
  };

  return (
    <div className={cn("p-3 bg-card rounded-lg border border-border inline-block shadow-xs", className)}>
      <div className="flex items-center justify-between pb-3">
        <h3 className="font-semibold text-sm text-foreground">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="h-7 w-7 flex items-center justify-center rounded-md border border-input hover:bg-accent text-muted-foreground"
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="h-7 w-7 flex items-center justify-center rounded-md border border-input hover:bg-accent text-muted-foreground"
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        </div>
      </div>
      <table className="w-full text-center text-xs border-collapse" aria-label={`Kalender ${monthNames[month]} ${year}`}>
        <thead>
          <tr>
            {daysOfWeek.map((d) => (
              <th key={d} className="font-medium text-muted-foreground py-1 p-1">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((firstDayIndex + daysInMonth) / 7) }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const dayNumber = weekIdx * 7 + dayIdx - firstDayIndex + 1;
                const isValidDay = dayNumber >= 1 && dayNumber <= daysInMonth;
                const day = isValidDay ? dayNumber : null;
                const selected = day !== null && isSelected(day);
                const today = day !== null && isToday(day);
                const disabled = day !== null && isDayDisabled(day);

                return (
                  <td key={dayIdx} className="p-1">
                    {isValidDay ? (
                      <button
                        type="button"
                        disabled={disabled}
                        onClick={() => handleSelectDate(day!)}
                        className={cn(
                          "h-8 w-8 rounded-md text-sm font-normal transition-colors flex items-center justify-center",
                          today && !selected && "border border-primary text-primary font-medium",
                          selected && "bg-primary text-primary-foreground font-semibold hover:bg-primary/90",
                          !selected && !today && "hover:bg-accent hover:text-accent-foreground",
                          disabled && "opacity-30 cursor-not-allowed pointer-events-none"
                        )}
                      >
                        {day}
                      </button>
                    ) : (
                      <span className="h-8 w-8" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
