(function() {

    let today = new Date();

    let monthsWith31Days, monthsWith30Days, months, days;
    let activeMonth, activeDate = '';

    let calendarDateEle, calendarDayEle;



    /**
     *
     * @method to initilise all the constants in the calendar
     *
     */
    let initConstants = function() {

        monthsWith31Days = [0, 2, 4, 6, 7, 9, 11];
        monthsWith30Days = [3, 5, 8, 10];
        months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    };



    /**
     *
     * @method to initilise all the elements required for manipulating content
     *
     */

    let initElements = function() {
        calendarDateEle = $(".selected-date .date");
        calendarDayEle = $(".selected-date .day");
    };



    /**
     *
     * @method to initilise all the elements to the initial state, ie today
     *
     */
    let initTodaysDate = function() {
        let date = today.getDate();
        let day = today.getDay();

        calendarDateEle.text(date);
        calendarDayEle.text(days[day - 1]);

        $($('.week-dates').find('h4')[date - 1]).addClass('active');

    };


    /**
     *
     * @method to generate calendar
     *
     */
    let generateDateElements = function(date) {

        let month = date.getMonth();
        let year = date.getFullYear();
        let totalDays = monthsWith31Days.includes(month) ? 31 :
            (monthsWith30Days.includes(month) ? 30 : (year % 4 === 0 ? 29 : 28));

        activeMonth = month;
        activeDate = date;

        let firstDate = new Date(date.getTime());
        firstDate.setDate(1);

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

        if (month === today.getMonth() - 1) {
            initTodaysDate();
        }
    };



    /**
     *
     * @method to generate calendar when next is clicked
     *
     */
    $(".showNextMonth").on('click', function() {
        let currDate = activeDate;
        currDate.setMonth(activeMonth + 1);
        currDate = new Date(currDate);
        generateDateElements(currDate)
    });


    /**
     *
     * @method to generate calendar when previous is clicked
     *
     */
    $(".showPrevMonth").on('click', function() {
        let currDate = activeDate;
        currDate.setMonth(activeMonth - 1);
        currDate = new Date(currDate);
        generateDateElements(currDate)
    });


    /**
     *
     * @method to show current clicked date on right side calendar
     *
     */
    $(".week-dates").on('click', 'h4', function(evt) {

        let eleIndex = Array.prototype.indexOf.call(this.parentElement.children, this);
        let target = evt.target;

        $(target).closest('.week-dates').find('h4').removeClass('active');
        $(target).addClass('active');

        calendarDateEle.text(target.textContent);
        calendarDayEle.text(days[eleIndex]);

        ((eleIndex + 1) % 7 === 0) ? $(".selected-date .inner-container").addClass("weekend"):
            $(".selected-date .inner-container").removeClass("weekend");
    });

    initConstants();
    generateDateElements(today);

    initElements();
    initTodaysDate();

})();