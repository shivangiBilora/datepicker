(function() {
    console.log("texting");

    let today = new Date();
    let monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];
    let monthsWith30Days = [1, 3, 5, 8, 10];
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let activeMonth = '';
    let activeDate = '';
    let calendarDateEle = $(".selected-date h1");
    calendarDateEle.text(today.getDate());
    let calendarDayEle = $(".selected-date h4");
    calendarDayEle.text(days[today.getDay() - 1]);

    let generateDateElements = function(date) {

        let month = date.getMonth();
        let year = date.getFullYear();
        let totalDays = monthsWith31Days.includes(month) ? 31 :
            (monthsWith30Days.includes(month) ? 30 : (year % 4 === 0 ? 29 : 28));

        activeMonth = month;
        activeDate = date;

        let firstDate = new Date(date.setDate(1));

        let firstDay = firstDate.getDay();
        let dateElements = '<div class="week">';

        if (firstDay === 0) {
            firstDay = 7;
        }

        // generate empty elements for initial dates, before the 1st of Month 
        for (let i = 1; i < firstDay; i++) {
            dateElements += '<h4></h4>';
        }

        // generate the rest of the date elements 
        for (let i = 0; i < totalDays; i++) {
            if ((firstDay + i - 1) % 7 === 0) {
                dateElements += '</div><div class="week">';
            }

            dateElements += `<h4>${i+1}</h4>`;
        }

        dateElements += '</div>';

        // append these elements into our main Div
        $('.week-dates').empty();
        $('.week-dates').append(dateElements);

        $('.month-name').text(`${months[month]} ${year}`);
    };


    $(".showNextMonth").on('click', function() {
        let currDate = activeDate;
        currDate.setMonth(activeMonth + 1);
        currDate = new Date(currDate);
        generateDateElements(currDate)
    });

    $(".showPrevMonth").on('click', function() {
        let currDate = activeDate;
        currDate.setMonth(activeMonth - 1);
        currDate = new Date(currDate);
        generateDateElements(currDate)
    });

    $(".week-dates").on('click', 'h4', function(evt) {
        let eleIndex = Array.prototype.indexOf.call(this.parentElement.children, this);
        calendarDateEle.text(evt.target.textContent);
        calendarDayEle.text(days[eleIndex]);
    });

    generateDateElements(today);

})();