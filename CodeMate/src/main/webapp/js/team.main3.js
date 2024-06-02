$(document).ready(function() {
	const calendar = $(".calendar"),
		date = $(".date"),
		daysContainer = $(".days"),
		prev = $(".prev"),
		next = $(".next"),
		todayBtn = $(".today-btn"),
		gotoBtn = $(".goto-btn"),
		dateInput = $(".date-input"),
		eventDay = $(".event-day"),
		eventDate = $(".event-date"),
		eventsContainer = $(".events"),
		addEventBtn = $(".add-event"),
		addEventWrapper = $(".add-event-wrapper "),
		addEventCloseBtn = $(".close "),
		addEventTitle = $(".event-name "),
		addEventFrom = $(".event-time-from "),
		addEventTo = $(".event-time-to "),
		addEventSubmit = $(".add-event-btn ");

	let today = new Date();
	let activeDay;
	let month = today.getMonth();
	let year = today.getFullYear();

	const months = [
		"1월",
		"2월",
		"3월",
		"4월",
		"5월",
		"6월",
		"7월",
		"8월",
		"9월",
		"10월",
		"11월",
		"12월"
	];

	const eventsArr = [];

	// 달력 생성하는 함수
	function initCalendar() {
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const prevLastDay = new Date(year, month, 0);
		const prevDays = prevLastDay.getDate();
		const lastDate = lastDay.getDate();
		const day = firstDay.getDay();
		const nextDays = 7 - lastDay.getDay() - 1;

		date.html(year + "년 " + months[month]);

		let days = "";

		for (let x = day; x > 0; x--) {
			days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
		}

		for (let i = 1; i <= lastDate; i++) {
			let event = false;
			eventsArr.forEach((eventObj) => {
				if (
					eventObj.day == i &&
					eventObj.month == month + 1 &&
					eventObj.year == year
				) {
					event = true;
				}
			});
			if (
				i == new Date().getDate() &&
				year == new Date().getFullYear() &&
				month == new Date().getMonth()
			) {
				activeDay = i;
				getActiveDay(i);
				updateEvents(i);
				if (event) {
					days += `<div class="day today active event">${i}</div>`;
				} else {
					days += `<div class="day today active">${i}</div>`;
				}
			} else {
				if (event) {
					days += `<div class="day event">${i}</div>`;
				} else {
					days += `<div class="day ">${i}</div>`;
				}
			}
		}

		for (let j = 1; j <= nextDays; j++) {
			days += `<div class="day next-date">${j}</div>`;
		}
		daysContainer.html(days);
		addListner();
	}

	// 이전 달로 이동하는 함수
	function prevMonth() {
		month--;
		if (month < 0) {
			month = 11;
			year--;
		}
		initCalendar();
	}

	// 다음 달로 이동하는 함수
	function nextMonth() {
		month++;
		if (month > 11) {
			month = 0;
			year++;
		}
		initCalendar();
	}

	prev.on("click", prevMonth);
	next.on("click", nextMonth);

	// 캘린더 호출
	initCalendar();

	// 각각의 날짜를 클릭할 때 날짜가 활성화되면서 이벤트 보여줌
	function addListner() {
		const days = $(".day");
		days.each(function() {
			$(this).on("click", function(e) {
				getActiveDay($(this).text());
				updateEvents(Number($(this).text()));
				activeDay = Number($(this).text());
				days.removeClass("active");
				if ($(this).hasClass("prev-date")) {
					prevMonth();
					setTimeout(() => {
						$(".day").each(function() {
							if (!$(this).hasClass("prev-date") && $(this).text() === e.target.innerHTML) {
								$(this).addClass("active");
							}
						});
					}, 100);
				} else if ($(this).hasClass("next-date")) {
					nextMonth();
					setTimeout(() => {
						$(".day").each(function() {
							if (!$(this).hasClass("next-date") && $(this).text() === e.target.innerHTML) {
								$(this).addClass("active");
							}
						});
					}, 100);
				} else {
					$(this).addClass("active");
				}
			});
		});
	}

	todayBtn.on("click", () => {
		today = new Date();
		month = today.getMonth();
		year = today.getFullYear();
		initCalendar();
	});

	dateInput.on("input", (e) => {
		dateInput.val(dateInput.val().replace(/[^0-9/]/g, ""));
		if (dateInput.val().length == 2) {
			dateInput.val(dateInput.val() + "/");
		}
		if (dateInput.val().length > 7) {
			dateInput.val(dateInput.val().slice(0, 7));
		}
		if (e.inputType == "deleteContentBackward" && dateInput.val().length === 3) {
			dateInput.val(dateInput.val().slice(0, 2));
		}
	});

	gotoBtn.on("click", gotoDate);

	// 해당하는 달로 이동하는 함수
	function gotoDate() {
		const dateArr = dateInput.val().split("/");
		if (dateArr.length == 2 && dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
			month = dateArr[0] - 1;
			year = dateArr[1];
			initCalendar();
		} else {
			alert("유효하지 않은 날짜 형식입니다.");
		}
	}

	// 선택된 날짜의 세부 정보를 표시함 (이벤트 출력 되는 곳 윗 부분)
	function getActiveDay(date) {
		const day = new Date(year, month, date);
		const dayName = getKoreanDay(day.getDay());
		eventDay.html(dayName);
		eventDate.html(year + "년 " + months[month] + " " + date + "일");
	}


	// 한국어로 요일 표시하기
	function getKoreanDay(day) {
		switch (day) {
			case 0:
				return "일요일";
			case 1:
				return "월요일";
			case 2:
				return "화요일";
			case 3:
				return "수요일";
			case 4:
				return "목요일";
			case 5:
				return "금요일";
			case 6:
				return "토요일";
		}
	}


	// 이벤트(To-Do) 리스트 가져오는 함수 (활성화 된 날짜만 가져오도록 조건 설정)
	function updateEvents(date) {
    $.ajax({
        type: 'post',
        url: 'getTeamTodoList.do',
        data: {
            team_num: sessionStorage.getItem("team_num"),
            tt_date: `${year}-${month + 1}-${date}`
        },
        dataType: 'json',
        success: function(param) {
            console.log(param);  // 서버 응답 데이터 출력
            let events = "";
            const eventsArr = param.teamtodo; // 서버에서 받은 이벤트 배열

            // 해당 날짜의 이벤트만 필터링
            const filteredEvents = eventsArr.filter(event => {
                const eventDate = new Date(event.tt_date);
                return eventDate.getDate() == date &&
                    eventDate.getMonth() == month &&
                    eventDate.getFullYear() == year;
            });

            // tt_num 순서로 정렬 (내림차순)
            filteredEvents.sort((a, b) => b.tt_num - a.tt_num);

            filteredEvents.forEach((event) => {
                console.log(event);

                const startTime = event.tt_start ? event.tt_start.replace(/(..)/, '$1:') : '';
                const endTime = event.tt_end ? event.tt_end.replace(/(..)/, '$1:') : '';

                events += `<div class="event">
                    <div class="title">
                        <h3 class="event-title">${event.tt_content}</h3>
                    </div>
                    <div class="event-time">
                        <span class="event-time">${startTime} - ${endTime}</span>
                    </div>
                    <div class="event-buttons">
                        <button class="del-btn" data-event-id="${event.tt_num}">삭제</button>
                    </div>
                </div>`;
            });

            if (events === "") {
                events = `<div class="no-event">
                    <h3>예정된 이벤트 없음</h3>
                </div>`;
            }

            eventsContainer.html(events); // 이벤트 컨테이너 업데이트
        },
        error: function() {
            alert("이벤트를 불러오는 데 실패했습니다.");
        }
    });
}
	
	// 삭제 버튼은 아직 미구현됨
	$(document).on("click", ".del-btn", function() {
		const eventId = $(this).data("event-id");
		// 여기에서 삭제 요청을 서버로 보낼 수 있습니다.
		console.log(`이벤트 ID: ${eventId} 삭제 요청`);
	});



	
    function addNewEvent() {
        const eventTitle = addEventTitle.val().trim();
        const eventTimeFrom = addEventFrom.val().trim();
        const eventTimeTo = addEventTo.val().trim();
        const teamNum = sessionStorage.getItem("team_num");

        if (!teamNum) {
            alert("팀 번호가 설정되지 않았습니다. 다시 로그인해 주세요.");
            return;
        }

        if (eventTitle === "") {
            alert("To-Do 내용을 작성하세요");
            return;
        }

        // 시간 검증 (옵션)
        if (eventTimeFrom !== "" && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(eventTimeFrom)) {
            alert("시작 시간이 올바르지 않습니다. 형식: HH:MM");
            return;
        }
        if (eventTimeTo !== "" && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(eventTimeTo)) {
            alert("종료 시간이 올바르지 않습니다. 형식: HH:MM");
            return;
        }

        // 새로운 이벤트를 서버로 전송합니다.
        $.ajax({
            type: 'post',
            url: 'AddTeam_Todo.do',
            data: {
                team_num: teamNum,
                tt_content: eventTitle,
                tt_date: `${year}-${month + 1}-${activeDay}`,
                tt_start: eventTimeFrom,
                tt_end: eventTimeTo
            },
            dataType: 'json',
            success: function(param) {
                console.log(param); // 서버 응답 데이터 출력
                if (param.result == "success") {
                    alert("이벤트가 추가되었습니다.");
                    initCalendar();
                } else if (param.result == "logout") {
                    alert("로그인 후 사용해주세요.");
                } else {
                    alert("오류가 발생하였습니다.");
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: ", status, error);
                console.error(xhr.responseText);
                alert("네트워크 오류가 발생하였습니다.");
            }
        });

        console.log(`새로운 이벤트 추가: ${eventTitle} | ${eventTimeFrom} - ${eventTimeTo}`);

        // 폼 초기화
        addEventTitle.val("");
        addEventFrom.val("");
        addEventTo.val("");
        addEventWrapper.removeClass("active");
    }


	// add-event-btn 클릭시 addNewEvent 함수 실행
	$(document).on("click", ".add-event-btn", addNewEvent);

	addEventBtn.on("click", () => {
		addEventWrapper.addClass("active");
	});

	addEventCloseBtn.on("click", () => {
		addEventWrapper.removeClass("active");
	});

});
