const log        = console.log;
const port       = 2000;
const URL 		 = require('url');
const express    = require('express');
const app        =  express();

app.set('view engine', 'pug');
app.listen(port);

const monthNames = Object.freeze([
	"January", "February", "March",
	"April", "May", "June",
	"July", "August", "September",
	"October", "November", "December",
]);

function dateString (dateObj) {
	return monthNames[dateObj.getMonth()] +
		' ' + dateObj.getDate() +
		', ' + dateObj.getFullYear();
}
app.get('/', (req, res) => {
	res.render('form');
	res.end();
});

app.get(/^\/\S/, (req, res) => {
	const data = URL.parse(req.url).pathname.slice(1);
	var date = new Date(isNaN(data)? data: +data * 1000);

	res.json(date.toString() !== 'Invalid Date'?
		{
			unix: date.getTime() / 1000 | 0,
			natural: dateString(date),
		}:
		{unix: null, natural: null});
	res.end();
});