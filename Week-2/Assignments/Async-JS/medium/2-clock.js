// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats -

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

setInterval(() => {
	let time = new Date();
	let hour = time.getHours();
	if (hour < 10) hour = "0" + hour;
	let minutes = time.getMinutes();
	if (minutes < 10) minutes = "0" + minutes;
	let seconds = time.getSeconds();
	if (seconds < 10) seconds = "0" + seconds;

    if(hour>=12){
        if(hour>13){
            hour = hour-12
            hour = "0" + hour;
        }
        console.log(`${hour}:${minutes}:${seconds} PM`);
    }
    else
	console.log(`${hour}:${minutes}:${seconds} AM`);
}, 1000);
