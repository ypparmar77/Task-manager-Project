document.addEventListener("DOMContentLoaded", function () {
    let file = JSON.parse(localStorage.getItem("file")) || [];

    const name = document.getElementById("addtask");
    const date = document.getElementById("task-date");
    const priority = document.getElementById("task-priority");
    const task_fliter = document.getElementById("task-fliter");
    const man_btn = document.getElementById("btn-t");

    const list = document.getElementById("task-list");

    const f_date = document.getElementById("data-fliter");
    const f_status = document.getElementById("fliter");
    const f_priority = document.getElementById("f-priorpty");
    const search = document.getElementById("search");

    man_btn.addEventListener("click", man);

    function man() {
        let abc = {
            name: name.value,
            date: date.value,
            priority: priority.value,
            task_fliter : task_fliter.value,
            status: "todo"
        };

        file.push(abc);
        one();
        two();
        name.value = "";
        date.value = "";
    }

    function one(file2 = file) {
        list.innerHTML = "";
        file2.forEach((abc, index) => {
            const tage = document.createElement("div");
            tage.className = `best ${abc.status}`;
            tage.innerHTML = `
    <span>${abc.name} - ${abc.date} - ${abc.priority} - ${abc.task_fliter}</span>
    <div>
        <button class="btn" onclick="edit(${index})">Edit</button>
        <button class="btn" onclick="listdelet(${index})">Delete</button>
    </div>`;
            list.appendChild(tage);
        });
    }

    function two() {
        localStorage.setItem("file", JSON.stringify(file));
    }

    window.listdelet = function (index) {
        file.splice(index, 1);
        one();
        two();
    }

    window.edit = function (index) {
        const abc = file[index];
        name.value = abc.name;
        date.value = abc.date;
        priority.value = abc.priority;
        task_fliter.value = abc.task_fliter;
        listdelet(index);
    }

    f_date.addEventListener("change", def);
    f_priority.addEventListener("change", def);
    f_status.addEventListener("change", def);
    search.addEventListener("input", def);

    function def() {
        const date = f_date.value;
        const priority = f_priority.value;
        const status = f_status.value;

        const search_work = search.value.toLowerCase();

        const flter_match = file.filter(file2 => {
            let match_date;
            let match_status;
            let match_priority;

            if (date) {
                match_date = file2.date === date;
            } else {
                match_date = true;
            }

            if (status !== "All") {
                match_status = file2.task_fliter === status;
            } else {
                match_status = true;
            }

            if (priority !== "all") {
                match_priority = file2.priority === priority;
            } else {
                match_priority = true;
            }

            const match_search = file2.name.toLowerCase().includes(search_work);

            return match_date && match_status && match_priority && match_search;
        });

        one(flter_match);
    }
    one();
});