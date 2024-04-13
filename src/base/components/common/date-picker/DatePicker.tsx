import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { ChangeEvent } from "react";

type DatePickerProps = {
  className?: string;
  value?:
    | string
    | number
    | Date
    | readonly (string | number | Date)[]
    | undefined;
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  enableTime?: boolean | undefined;
  noCalendar?: boolean | undefined;
  disabled?: boolean;
};

const DatePicker: React.FC<DatePickerProps> = ({
  className = "",
  value,
  enableTime,
  onChange,
  noCalendar,
  disabled = false,
}) => {
  return (
    <div className="flex items-center relative">
      <Flatpickr
        value={value}
        disabled={disabled}
        placeholder="Tarih Seçin"
        // onChange is taking these as a parameter (dates: Date[], currentDateString: string, self: Instance, data?: any)
        onChange={(dates: Date[]) => {
          if (onChange) {
            onChange({
              target: {
                value: dates[0].toISOString() ?? undefined,
              },
            } as ChangeEvent<HTMLInputElement>);
          }
        }}
        options={{
          dateFormat: noCalendar ? "H:i" : "d.m.Y",
          enableTime: enableTime,
          time_24hr: enableTime,
          noCalendar: noCalendar,
          locale: {
            weekdays: {
              longhand: [
                "Pazar",
                "Pazartesi",
                "Salı",
                "Çarşamba",
                "Perşembe",
                "Cuma",
                "Cumartesi",
              ],
              shorthand: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            },
            months: {
              longhand: [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık",
              ],
              shorthand: [
                "Oca",
                "Şub",
                "Mar",
                "Nis",
                "May",
                "Haz",
                "Tem",
                "Ağu",
                "Eyl",
                "Eki",
                "Kas",
                "Ara",
              ],
            },
          },
        }}
        className={className}
      />
    </div>
  );
};

export default DatePicker;
