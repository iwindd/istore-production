import dayjs, { Dayjs as DJ } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import locale from 'dayjs/locale/th';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale(locale)
dayjs.tz.setDefault("Asia/Bangkok")

export { DJ as Dayjs }; // Exporting the Dayjs type
export default dayjs; // Exporting the dayjs object
