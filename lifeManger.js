function toggleSidebar() {
 const side = document.getElementById('sidebar');
 side.classList.toggle('active');

}

function showSection(id) {
   const section = document.querySelectorAll('section');
    section.forEach(element => {
        element.style.display = 'none';
        document.getElementById(id).style.display = 'block';
    });
    
}

    //For the Mood
    function saveMood(mood) {
    const time = new Date().toLocaleString();
    const display = `You Felt ${mood} at ${time}`;
    localStorage.setItem('lastMood',display);

    document.getElementById('moodDisplayBox').innerText = display;
    }

//GOAL CODES
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
function addGoal() {
    const goalText = document.getElementById('goalInput').value.trim();
    if(goalText === '') return;
        goals.push({text:goalText, done:false});
            localStorage.setItem('goals',JSON.stringify(goals));
                document.getElementById('goalInput').value = '';
                displayGoals();
}

function displayGoals() {
    const display =  document.getElementById('goalList');
    display.innerHTML = '';
        goals.forEach((goal, index) => {
    const li = document.createElement('li');
        if (goal.done) {
            li.classList.add('completed');
        }
        li.innerHTML = `<span>${goal.text}</span>
        <div>
        <button onclick ='toggleDone(${index})'>✅</button>
        <button onclick ='editBtn(${index})'>🖌</button>
        <button onclick ='deleteBtn(${index})'>❌</button>
        </div>`
        display.appendChild(li);
});
}
function toggleDone(index) {
    goals[index].done = !goals[index].done;
        localStorage.setItem('goals',JSON.stringify(goals));
            displayGoals();
}
function editBtn(index) {
    const edit = prompt('Edit your Goal: ',goals[index].text);
    if (edit) {
        goals[index].text = edit;
            localStorage.setItem('goals',JSON.stringify(goals));
                displayGoals();
    }
}
function deleteBtn(index) {
    goals.splice(index,1);
    localStorage.setItem('goals',JSON.stringify(goals));
        displayGoals();
}

displayGoals();

//For the Timetable
const timetable = JSON.parse(localStorage.getItem('timetable')) || [];
function addTimetable() {
    const day = document.getElementById('dayInput').value;
    const subject = document.getElementById('subjectInput').value.trim();
    const time = document.getElementById('timetableList').value;
        if (subject === '' || time === '') {
            return;
        }
            timetable.push({ day, subject, time});
    localStorage.setItem('timetable',JSON.stringify(timetable));
    document.getElementById('subjectInput').value = '';
    document.getElementById('timetableList').value = '';
    displayTimetable();

}

function displayTimetable() {
    const show = document.getElementById('timetableList');
    show.innerHTML = '';
    timetable.forEach((element,index) => {
        const li = document.createElement('li');
            li.innerHTML = `<span><strong>${element.day}<strong>: ${element.subject} at ${element.time}</span>
            <div>
                <button onclick ='edit(${index})'>🖌</button>
                <button onclick ='deleteb(${index})'>❌</button>
            </div>
            `
        show.appendChild(li);
    });
        };
function edit(index) {
            const editSub = prompt('Edit your Subject',timetable[index].subject);
            const editTim = prompt('Edit your Subject',timetable[index].time);
            if (editSub && editTim) {
                timetable[index].subject = editSub;
                timetable[index].time = editTim;
                    localStorage.setItem('timetable',JSON.stringify(timetable));
                    displayTimetable();
            }
        }
function deleteb(index) {
    timetable.splice(index,1);
    localStorage.setItem('timetable',JSON.stringify(timetable));
    displayTimetable();
    
}
  displayTimetable();

window.addEventListener('DOMContentLoaded', ()=>{
    const load = localStorage.getItem('lastMood');
    if (load) {
        document.getElementById('moodDisplayBox').innerText = load;      
    }
})
function checkTimeForAlert() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const today = now.toLocaleDateString('en-US',{ weekday: 'long'});

    timetable.forEach(item => {
        if (item.day === today && item.time === currentTime) {
            alert(`Time for ${item.subject} class!!`)
        }
    });
}

setInterval(checkTimeForAlert, 60000);

















