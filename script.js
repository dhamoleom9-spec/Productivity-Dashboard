
function openFeatures() {
    let allCards = document.querySelectorAll('.saperator')
    let allfullCards = document.querySelectorAll('.full-elem')
    let allfullCardsbackbut = document.querySelectorAll('.back')

    allCards.forEach(function (elem) {
        elem.addEventListener('click', function () {
            allfullCards[elem.id].style.display = 'block'
        })
    })

    allfullCardsbackbut.forEach(function (back) {
        back.addEventListener('click', function () {
            allfullCards[back.id].style.display = 'none'
        })
    })
}
openFeatures()

function ToDoList() {
    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is empty');
    }

    function renderTasks() {
        let allTask = document.querySelector('.allTask')
        let sum = ''
        currentTask.forEach(function (elem, idx) {
            sum += ` <div class="task">
                        <div class="text">
                            <h1>${elem.task} <span class=${elem.important}>imp</span></h1>
                            <p>${elem.Description}</p>
                        </div>
                        <button id=${idx}>mark as completed</button>
                    </div>`
        })
        allTask.innerHTML = sum
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        let taskbutton = document.querySelectorAll('.task button')
        taskbutton.forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTasks()
            })
        })
    }
    renderTasks()

    let formHandler = document.querySelector('.full-todolists .bottom .addTask form')
    let taskInput = document.querySelector('.full-todolists .bottom .addTask form #task-input')
    let taskTextarea = document.querySelector('.full-todolists .bottom .addTask form textarea')
    let taskCheckbox = document.querySelector('.full-todolists .bottom .addTask form #check')

    formHandler.addEventListener('submit', function (e) {
        e.preventDefault()
        currentTask.push(
            {
                task: taskInput.value,
                Description: taskTextarea.value,
                important: taskCheckbox.checked
            }
        )
        localStorage.setItem('currentTask', JSON.stringify(currentTask))

        renderTasks()

        taskInput.value = ''
        taskTextarea.value = ''
        taskCheckbox.checked = ''
    })
}
ToDoList()

function dailyplanner() {
    let dataContainer = document.querySelector('.full-dailyplanner .bottom')

    var hours = Array.from({ length: 18 }, (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`)

    let dayPlannerData = JSON.parse(localStorage.getItem('dayPlannerData')) || {}

    let wholeDate = ''

    hours.forEach(function (elem, idx) {

        let saveData = dayPlannerData[idx] || ''

        wholeDate += `   <div class="dayplane">
                    <p>${elem}</p>
                    <input id=${idx} type="text" placeholder="..."
                    value=${saveData}
                    >
                </div>`
    })
    dataContainer.innerHTML = wholeDate

    let dataContainerinput = document.querySelectorAll('.full-dailyplanner .bottom input')

    dataContainerinput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayPlannerData[elem.id] = elem.value

            localStorage.setItem('dayPlannerData', JSON.stringify(dayPlannerData))
        })

    })
}
dailyplanner()

async function motivationDataFetch() {
    let quote = document.querySelector('.motivation-container .motivation-data .motivation-2 p')
    let auther = document.querySelector('.motivation-container .motivation-data .motivation-3 h1')

    let unrealData = await fetch('https://dummyjson.com/quotes')
    let realData = await unrealData.json()

    let rendomeNumber = Math.floor(Math.random() * 30)

    quote.innerHTML = realData.quotes[rendomeNumber].quote
    auther.innerHTML = realData.quotes[rendomeNumber].author
}
motivationDataFetch()

function pomodoroTimer() {

    let totalTimer = 25 * 60
    let isworkSession = true

    let timer = document.querySelector('.full-pomodorotimer .bottom .container h1')
    let startBtn = document.querySelector('.full-pomodorotimer .bottom .container .but .Start')
    let pauseBtn = document.querySelector('.full-pomodorotimer .bottom .container .but .pause')
    let RestartBtn = document.querySelector('.full-pomodorotimer .bottom .container .but .Restart')



    function updateTimer() {
        let minutes = Math.floor(totalTimer / 60)
        let seconds = totalTimer % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`

    }

    function startTimer() {

        if (isworkSession) {
            totalTimer = 25 * 60
            timerPauser = setInterval(function () {
                if (totalTimer > 0) {
                    totalTimer--
                    updateTimer()
                } else {
                    isworkSession = false
                    clearInterval(timerPauser)
                    timer.innerHTML = '05:00'
                }
            }, 1000)
        } else {
            totalTimer = 5 * 60
            timerPauser = setInterval(function () {
                if (totalTimer > 0) {
                    totalTimer--
                    updateTimer()
                } else {
                    isworkSession = true
                    clearInterval(timerPauser)
                    timer.innerHTML = '25:00'
                }
            }, 1000)
        }
    }

    function stopstarttimer() {
        clearInterval(timerPauser)
        timerPauser = null;
    }

    function resettimer() {
        clearInterval(timerPauser)
        timerPauser = null;
        totalTimer = 25 * 60
        updateTimer()
    }

    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', stopstarttimer)
    RestartBtn.addEventListener('click', resettimer)




}
pomodoroTimer()




