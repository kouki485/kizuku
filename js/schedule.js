(function() {
  let initialized = false;
  
  function initSchedules() {
    if (initialized) return;
    initialized = true;
    
    const scheduleContainers = document.querySelectorAll(".staff-schedule");
    
    const fixedSchedules = [
      {
        shifts: {
          0: [1, 1, 1, 0, 1, 1, 0],
          1: [0, 1, 0, 1, 0, 1, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [0, 1, 1, 1, 0, 1, 1],
          1: [0, 0, 1, 0, 0, 0, 1],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 0, 1, 1, 1, 0, 1],
          1: [1, 0, 0, 1, 0, 0, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 1, 0, 1, 1, 1, 0],
          1: [0, 1, 0, 0, 1, 0, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [0, 1, 1, 0, 1, 1, 1],
          1: [0, 0, 1, 0, 0, 1, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 0, 1, 1, 0, 1, 1],
          1: [1, 0, 0, 1, 0, 0, 1],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 1, 0, 1, 1, 0, 1],
          1: [0, 1, 0, 0, 1, 0, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [0, 1, 1, 0, 1, 1, 1],
          1: [0, 0, 1, 0, 0, 1, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 0, 1, 1, 1, 1, 0],
          1: [1, 0, 0, 1, 0, 0, 0],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      },
      {
        shifts: {
          0: [1, 1, 1, 0, 0, 1, 1],
          1: [0, 1, 0, 0, 0, 0, 1],
          2: [0, 0, 0, 0, 0, 0, 0]
        }
      }
    ];

    scheduleContainers.forEach((container, staffIndex) => {
      const cells = container.querySelectorAll(".schedule-cell");
      const schedule = fixedSchedules[staffIndex % fixedSchedules.length];
      
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
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSchedules);
  } else {
    initSchedules();
  }
})();
