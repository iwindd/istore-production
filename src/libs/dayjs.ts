import dayjs, { Dayjs as DJ } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import locale from 'dayjs/locale/th';

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale(locale)

export { DJ as Dayjs }; // Exporting the Dayjs type
export default dayjs; // Exporting the dayjs object
