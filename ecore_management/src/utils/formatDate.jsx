import moment from "moment";

export function formatDate(dateStr,format)
{
	let dateFormatted = moment(dateStr).format(format);
	if(dateFormatted === 'Invalid date')
		return '';
	return dateFormatted;
}