
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

function weatherFunctionality() {

    let temp = document.querySelector('.daily-news .right h2')
    let tempDescription = document.querySelector('.daily-news .right #one')
    let tempHumidity = document.querySelector('.daily-news .right #three')
    let tempWind = document.querySelector('.daily-news .right #four')
    let time = document.querySelector('.daily-news .left h1')
    let newdate = document.querySelector('.daily-news .left h3')
    let cityweather = document.querySelector('.daily-news .left h2')
    let city = 'Khamgaon'
    async function Weather() {
        let = apikey = "8bf45140fa37195f00fb876af0b93e59";
        let rawdata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        let data = await rawdata.json()
        temp.innerHTML = `${Math.floor(data.main.temp - 277)} °C`
        tempDescription.innerHTML = `${data.weather[0].description}`
        tempHumidity.innerHTML = `Humidity: ${data.main.humidity} %`
        tempWind.innerHTML = `Wind: ${data.wind.speed} Km/Hr`
        cityweather.innerHTML = `${data.name}`

    }
    Weather()

    function timeDate() {
        const totalDaysofWeek = ['Sunday', 'Monday', 'Tuesday', 'wednesday', 'Thursday', 'Friday', 'Saturday']
        let date = new Date()
        let dayofWeek = totalDaysofWeek[date.getDay()]
        let hours = date.getHours()
        let minute = date.getMinutes()
        let seconds = date.getSeconds()
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()

        newdate.innerHTML = `${day}-${String(month + 1).padStart('2', '0')}-${year}`

        if (hours > 12) {
            time.innerHTML = `${dayofWeek}, ${hours - 12}:${String(minute).padStart('2', '0')}:${String(seconds).padStart('2', '0')} PM`
        } else {
            time.innerHTML = `${dayofWeek}, ${hours}:${String(minute).padStart('2', '0')}:${String(seconds).padStart('2', '0')} AM`
        }
    }
    setInterval(() => {
        timeDate()
    }, 1000);
}
weatherFunctionality()


let but = document.querySelector('.main-2 .but')
let rootElement = document.documentElement
let flag = 0
but.addEventListener('click', function () {
    if (flag == 0) {
        rootElement.style.setProperty('--pri', '#1B3C53')
        rootElement.style.setProperty('--sec', '#F63049')
        rootElement.style.setProperty('--tri', '#456882')
        rootElement.style.setProperty('--qua', '#E3E3E3')
        flag = 1
    } else if (flag == 1) {
        rootElement.style.setProperty('--pri', '#4E1F00')
        rootElement.style.setProperty('--sec', '#FEBA17')
        rootElement.style.setProperty('--tri', '#74512D')
        rootElement.style.setProperty('--qua', '#F8F4E1')
        flag = 2
    } else if (flag == 2) {
        rootElement.style.setProperty('--pri', '#36656B')
        rootElement.style.setProperty('--sec', '#DAD887')
        rootElement.style.setProperty('--tri', '#75B06F')
        rootElement.style.setProperty('--qua', '#F0F8A4')
        flag = 3
    }else if(flag == 3){
        rootElement.style.setProperty('--pri', '#E2852E')
        rootElement.style.setProperty('--sec', '#7B542F')
        rootElement.style.setProperty('--tri', '#F5C857')
        rootElement.style.setProperty('--qua', '#FFEE91')
        flag = 0
    }else{
        rootElement.style.setProperty('--pri', '#4E1F00')
        rootElement.style.setProperty('--tri', '#74512D')
        rootElement.style.setProperty('--qua', '#F8F4E1')
    }
})





