(function () {
    let initialized = false;

    function seededRandom(seed) {
        let value = seed;
        return function () {
            value = (value * 9301 + 49297) % 233280;
            return value / 233280;
        };
    }

    function generateSchedule(staffId) {
        const random = seededRandom(staffId.charCodeAt(0) * 1000 + staffId.length);
        const schedule = {
            shifts: {
                0: [],
                1: [],
                2: []
            }
        };

        for (let day = 0; day < 7; day++) {
            schedule.shifts[0].push(random() < 0.6 ? 1 : 0);
            schedule.shifts[1].push(random() < 0.6 ? 1 : 0);
            schedule.shifts[2].push(random() < 0.2 ? 1 : 0);
        }

        return schedule;
    }

    function initSchedules() {
        if (initialized) return;
        initialized = true;

        const scheduleContainers = document.querySelectorAll(".staff-schedule");

        scheduleContainers.forEach((container) => {
            const cells = container.querySelectorAll(".schedule-cell");
            const staffId = container.getAttribute("data-staff");
            const schedule = generateSchedule(staffId);

            cells.forEach((cell) => {
                const dayAttr = cell.getAttribute("data-day");
                const shiftAttr = cell.getAttribute("data-shift");

                if (dayAttr === null || shiftAttr === null) {
                    return;
                }

                const day = parseInt(dayAttr, 10);
                const shift = parseInt(shiftAttr, 10);

                if (isNaN(day) || isNaN(shift)) {
                    return;
                }

                cell.innerHTML = "";

                let isWorking = false;
                if (schedule && schedule.shifts && schedule.shifts[shift] !== undefined && schedule.shifts[shift][day] === 1) {
                    isWorking = true;
                }

                if (isWorking) {
                    cell.classList.add("is-working");
                    cell.classList.remove("is-not-working");
                    cell.textContent = "〇";
                } else {
                    cell.classList.add("is-not-working");
                    cell.classList.remove("is-working");
                    cell.textContent = "×";
                }
            });
        });
    }

    function initToggleButtons() {
        const toggleButtons = document.querySelectorAll(".schedule-toggle-btn");

        toggleButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const staffProfile = button.closest(".staff-profile");
                const schedule = staffProfile.querySelector(".staff-schedule");
                const isExpanded = button.getAttribute("aria-expanded") === "true";

                if (isExpanded) {
                    schedule.style.display = "none";
                    button.setAttribute("aria-expanded", "false");
                    button.textContent = "出勤時間を見る";
                } else {
                    schedule.style.display = "block";
                    button.setAttribute("aria-expanded", "true");
                    button.textContent = "出勤時間を閉じる";
                }
            });
        });
    }

    function init() {
        initSchedules();
        initToggleButtons();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
