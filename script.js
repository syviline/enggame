API_ENDPOINT = 'http://127.0.0.1:8000/api/'

let backgroundImage = new Image();
backgroundImage.src = 'imgs/floor1.png';

let ahshitSound = new Audio('sounds/ahshit.mp3');
let platonovSound = new Audio('sounds/platonov.mp3');
let diningroomSound = new Audio('sounds/diningroom.mp3');
let horrorSound = new Audio('sounds/horror.mp3');
// ahshitSound.play()
// ahshitSound.pause()
// platonovSound.play()
// platonovSound.pause()
// diningroomSound.play()
// diningroomSound.pause()

var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "imgs/ahshit.png",
    "imgs/arab.jpg",
    "imgs/areyousure.png",
    "imgs/background.png",
    "imgs/bogatyr.png",
    "imgs/diningseller.png",
    "imgs/eminem.png",
    "imgs/eminemthrow.jpg",
    "imgs/floor1.png",
    "imgs/floor2.png",
    "imgs/floor3.png",
    "imgs/floor4.png",
    "imgs/gigachad.jpg",
    "imgs/guyLeft.png",
    "imgs/guyRight.png",
    "imgs/kirill.jpg",
    "imgs/lostappeal.jpg",
    "imgs/mathfuck.png",
    "imgs/npc1.png",
    "imgs/npc2.png",
    "imgs/npc3.png",
    "imgs/npc4.png",
    "imgs/platonov.png",
    "imgs/platonovCombo.jpg",
    "imgs/player.jpeg",
    "imgs/player.png",
    "imgs/room.png",
    "imgs/snoopdogg.png",
    "imgs/Чучело.png",
)

let platonovNPCImage = new Image();
platonovNPCImage.src = 'imgs/npc1.png';
let npc2 = new Image()
npc2.src = 'imgs/npc2.png'
let npc3 = new Image()
npc3.src = 'imgs/npc3.png'
let npc4 = new Image()
npc4.src = 'imgs/npc4.png'

let npcs = [[npc2, 4421, 2160, 0], [npc3, 3557, 1332, 0], [npc4, 2549, 1764, 0],
    [npc2, 1397, 3024, 0], [npc3, 1577, 3384, 0],
    [npc4, 1095, 1739, 1],
    [npc2, 1030, 3170, 2],
    [platonovNPCImage, 1230, 377, 3]
] // img, x, y, floor

let currentFloor = 0;

// Get a reference to the canvas element
let canvas = document.querySelector('canvas');

// Get the drawing context
let context = canvas.getContext('2d');

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let floorsSettings = {
    0: {
        image: 'imgs/floor1.png',
        worldWidth: 6000,
        worldHeight: 3565,
    },
    1: {
        image: 'imgs/floor2.png',
        worldWidth: 4629,
        worldHeight: 4000,
    },
    2: {
        image: 'imgs/floor3.png',
        worldWidth: 4629, // 2639
        worldHeight: 15382, // 2280
    },
    3: {
        image: 'imgs/room.png',
        worldWidth: 3132,
        worldHeight: 1860,
    }
}

function switchFloor(floor) {
    currentFloor = floor
    backgroundImage.src = floorsSettings[currentFloor].image;
    worldWidth = floorsSettings[currentFloor].worldWidth;
    worldHeight = floorsSettings[currentFloor].worldHeight;
}

let worldWidth = floorsSettings[currentFloor].worldWidth; // The width of the world
let worldHeight = floorsSettings[currentFloor].worldHeight; // The height of the world

let devicePixelRatio = window.devicePixelRatio || 1;

// Set the canvas size in physical pixels
canvas.width = window.innerWidth * devicePixelRatio;
canvas.height = window.innerHeight * devicePixelRatio;

// Scale the canvas context
context.scale(devicePixelRatio, devicePixelRatio);

// Enable image smoothing
context.imageSmoothingEnabled = false;

function el(selector) {
    return document.querySelector(selector);
}

class Platform {
    constructor(x, y, width, height, script) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.script = script;
        this.currentlySteppedOn = false;
    }

    // Check if the player is on the platform
    isPlayerOn(player) {
        return player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y;
    }

    // Activate the script
    activateScript() {
        this.script();
    }

    // Draw the platform on the canvas
    draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent black
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

let platforms = {
    0: [
        new Platform(370, 2060, 170, 170, () => {
            switchFloor(1);
            player.x = 1265
            player.y = 2244
        }),
        new Platform(1560, 3000, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/eminem.png', "eminem");
        }),
        new Platform(5250, 2200, 200, 200, () => {
            openEvent("start");
        }),
        new Platform(5450, 2500, 200, 200, () => {
            openDialog('imgs/player.jpeg', 'imgs/platonov.png', "platonovTechniques")
        }),
        new Platform(1600, 3140, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/diningseller.png', "diningroom");
        }),
        new Platform(3780, 2120, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/mirror.png', "mirror");
        }),
        new Platform(2450, 1800, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/snoopdogg.png', "snoopdogg");
        }),
        new Platform(4350, 2150, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/Чучело.png', "trialguy");
        }),
        new Platform(3440, 1330, 100, 100, () => {
            openDialog('imgs/player.jpeg', 'imgs/gigachad.jpg', "gigachad");
        })
    ],
    1: [
        new Platform(1000, 1625, 200, 200, () => {
            openDialog('imgs/player.jpeg', 'imgs/arab.jpg', "arab");
        }),
        new Platform(3277, 839, 200, 200, () => {
            switchFloor(2)
        }),
    ],
    2: [
        new Platform(680, 15070, 200, 200, () => {
            openEvent("areyousure")
        }),
        new Platform(1000, 3150, 200, 200, () => {
            openDialog('imgs/player.jpeg', 'imgs/Чучело.png', "corridor")
        }),
    ],
    3: [
        new Platform(870, 414, 200, 200, () => {
            openDialog('imgs/player.jpeg', 'imgs/platonov.png', "platonovTechniques");
        }),
    ]
}


class Camera {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    update(player) {
        // Make the camera follow the player
        this.x = player.x - this.width / 2;
        this.y = player.y - this.height / 2;

        if (this.x < 0) this.x = 0
        if (this.y < 0) this.y = 0
        if (this.x + window.innerWidth > worldWidth) this.x = worldWidth - window.innerWidth
        if (this.y + window.innerHeight > worldHeight) this.y = worldHeight - window.innerHeight

        // Clamp the camera position to the world bounds
        // Clamp the camera position to the world bounds
        // this.x = Math.max(0, Math.min(this.x, worldWidth - this.width));
        // this.y = Math.max(0, Math.min(this.y, worldHeight - this.height));
    }
}

class Player {
    constructor() {
        this.x = 5285; // Start at the middle of the canvas
        this.y = 2304;
        this.speed = 0.4; // Speed of player movement
        this.width = 102; // Width of the player
        this.height = 78; // Height of the player
        this.vx = 0; // Velocity in the x direction
        this.vy = 0; // Velocity in the y direction

        this.images = [new Image(), new Image()];
        this.images[0].src = 'imgs/guyRight.png'; // Image for right step
        this.images[1].src = 'imgs/guyLeft.png'; // Image for left step

        this.currentImageIndex = 0; // Index of the current image
        this.frameNumber = 0; // Number of frames since the start
        this.message = null;
        this.messageTime = null;
    }

    setMessage(message, duration) {
        this.message = message;
        this.messageTime = Date.now() + duration;
    }

    // Draw the player on the canvas
    draw() {
        if (Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1) {
            this.frameNumber++;
            if (this.frameNumber % 10 === 0) {
                this.currentImageIndex = 1 - this.currentImageIndex;
            }
        }

        if (this.message && Date.now() < this.messageTime) {
            let messageWidth = context.measureText(this.message).width * 2;
            let padding = 10;
            let x = this.x - messageWidth / 2 - padding;
            let y = this.y - canvas.height / 2;
            let width = messageWidth + 2 * padding;
            let height = 30;
            let radius = 10;

            context.fillStyle = 'white';
            context.beginPath();
            context.moveTo(x + radius, y);
            context.arcTo(x + width, y, x + width, y + height, radius);
            context.arcTo(x + width, y + height, x, y + height, radius);
            context.arcTo(x, y + height, x, y, radius);
            context.arcTo(x, y, x + width, y, radius);
            context.closePath();
            context.fill();

            context.fillStyle = 'black';
            context.font = '20px Arial';
            context.fillText(this.message, this.x - messageWidth / 2, this.y - canvas.height / 2 + 20);
        }

        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);

        // // Flip the image horizontally if needed
        // if (this.flipImage) {
        //     context.scale(-1, 1);
        // }

        context.scale(1, -1)

        // Rotate the image based on the direction of movement
        let angle = Math.atan2(this.vx, this.vy);
        context.rotate(angle);

        context.drawImage(this.images[this.currentImageIndex], -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }

    // Update the player's position

    update() {
        // Change the player's velocity based on the keys pressed
        if (keys.up) {
            this.vy -= this.speed;
        }
        if (keys.down) {
            this.vy += this.speed;
        }
        if (keys.left) {
            this.vx -= this.speed;
        }
        if (keys.right) {
            this.vx += this.speed;
        }

        // Add the velocity to the player's position
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction to the player's velocity
        let friction = 0.9;
        this.vx *= friction;
        this.vy *= friction;

        // Prevent the player from moving off the world
        this.x = Math.max(0, Math.min(this.x, worldWidth - this.width));
        this.y = Math.max(0, Math.min(this.y, worldHeight - this.height));
    }
}

// Create an object to hold the state of the keys
let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Add event listeners for keydown and keyup events
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'p':
            player.speed = 1.2
            break;
        case 'o':
            player.speed = 0.4
            break;
        case 'l':
            horrorSound.play()
            break;
        case 'k':
            horrorSound.pause()
            break;
        case 'j':
            player.speed = 0.3
            break;
        case 'w':
            keys.up = true;
            break;
        case 'a':
            keys.left = true;
            break;
        case 's':
            keys.down = true;
            break;
        case 'd':
            keys.right = true;
            break;
    }
});

dialogs = {
    "corridor": {
        name: "corridor",
        steps: [
            () => addText('You: This is ????? (indication that you need a quick response)! Where is Platonov\'s class?'),
            () => makeCorrectAnswer('urgent'),
            () => addText('Bro: I know where it is. You should go through that long corridor. But remember, no one returned from there yet...'),
        ]
    },
    "eminem": {
        id: 0,
        name: "Eminem",
        steps: [
            () => addText('Eminem: Wassup, what do you want?'),
            () => addText('You: Yo bro, lemme have a samwich'),
            () => {
                addText('Eminem: Ofc bro, here you go!')
                el('.pic2').src = 'imgs/eminemthrow.jpg';
            }
        ]
    },
    "diningroom": {
        name: "diningroom",
        steps: [
            () => addText('You: Hello, what do you have for lunch?'),
            () => addText('Seller: We have...'),
            () => {
                diningroomSound.play()
                el('.pic2').src = 'imgs/bogatyr.png';
            },
            () => {
                el('.pic2').src = 'imgs/diningseller.png';
                addText("You: Sorry, I won't take anything, I'm ????? (avoiding eating foods high in fat)")
            },
            () => {
                makeCorrectAnswer('cutting down on fatty foods')
            }
        ]
    },
    "platonovTechniques": {
        name: "platonovTechniques",
        steps: [
            () => addText('Platonov: Why are you late?'),
            () => addText('Your thoughts: (i should only tell truth, i\'m under ?????)'),
            () => makeCorrectAnswer('oath'),
            () => {
                clearDialog()
                addText('You: sorry, I was ????? (relaxing) and eating burgers with my friends')
            },
            () => makeCorrectAnswer('chilling out'),
            () => {
                clearDialog()
                addText('Platonov: But in dining room you said that you are cutting on fatty foods')
                addText('You: I ????? her (lied to)')
            },
            () => makeCorrectAnswer('deceived'),
            () => addText('Platonov: Okay, now take the test.'),
            () => {
                clearDialog()
                addText('1st question: \n' +
                    'What phrase suggests that sometimes an image communicates better than a lengthy explanation?')
            },
            () => addText('1. A picture is worth a thousand words'),
            () => {
                clearDialog()
                addText('2nd question: What popular saying suggests that being ahead of schedule or acting promptly leads to success?')
            },
            () => addText('2. The early bird catches the worm'),
            () => {
                clearDialog()
                addText('3rd question: What phrase encourages people to defend what they believe in, even if others disagree?')
            },
            () => addText('3. To stand up for your beliefs'),
            () => {
                clearDialog()
                addText('Platonov: You are doing really bad...')
            },
            () => addText('You: I was preparing all night, but ????? (it takes time to achieve something significant)'),
            () => makeCorrectAnswer('Rome wasn\'t built in a day'),
            () => {
                addText('Platonov: Rome wasn\'t build in a day? No cap Sherlock')
            },
            () => {
                clearDialog()
                addText('You: I beg you for a good mark')
            },
            () => addText('Platonov: ????? (phrase that REALLY SUITS HERE)'),
            () => makeCorrectAnswer('Beggars can\'t be choosers'),
            () => {
                clearDialog()
                addText('Platonov: Can you tell me, why have you chosen UTMN?')
            },
            () => addText('You: I chose it ?????'),
            () => makeCorrectAnswer('at random'),
            () => addText('Platonov: You know I can expell you from here, right?'),
            () => addText('You: Come on, what can you do?'),
            () => {
                clearDialog()
                addText('Platonov: У меня есть много малоизвестных приёмов чтобы тебя отчислить')
            },
            () => addText('You: Какие же малоизвестные приемы у тебя есть?'),
            () => {
                clearDialog()
                platonovSound.play()
                el('.pic2').remove()
                el('.pic1').style.width = '100%';
                el('.pic1').src = 'imgs/platonovCombo.jpg'
                el('.dialog').style.backgroundColor = '#000';
                el('.dialog').style.color = '#FFF'
            },
            () => {
                addText('МАЛОИЗВЕСТНЫЕ ПРИЁМЫ ПЛАТОНОВА')
            },
            () => {
                clearDialog()
                addText('ДРЕВНЕРУССКОЕ ОТЧИСЛЕНИЕ ВО ВРЕМЯ ОБЕДА В БУРГЕР КИНГ')
            },
            () => {
                clearDialog()
                addText('ВЕЛИКОРУССКОЕ САЖАНИЕ НА КОЛ ЗА ОПОЗДАНИЕ')
            },
            () => {
                clearDialog()
                addText('НЕОБРАТИМАЯ КРАЖА АТТЕСТАТА')
            },
            () => {
                clearDialog()
                addText('ДРЕВНЕЙШЕЕ ПОНИЖЕНИЕ ДО АБИТУРИЕНТА')
            },
            () => {
                clearDialog()
                addText('СОКРУШИТЕЛЬНЫЙ ТЕЛЕПОРТ В ПРИЕМНУЮ КОМИССИЮ ДРУГОГО ВУЗА')
            },
            () => {
                clearDialog()
                addText('СТАРОСЛАВЯНСКОЕ ИСЧЕЗНОВЕНИЕ БАЛЛОВ ИЗ МОДЕУСА')
            },
            () => {
                clearDialog()
                addText('СОЗДАТЕЛЬ: АНТОН ТРЕГУБОВ')
                addText('ХУДОЖНИК: ВЯЧЕСЛАВ КОЧУРИН (больше его не найму)')
            }
        ]
    },
    "mirror": {
        name: "mirror",
        steps: [
            () => addText('You: This guy has definitely lost ????? (lost his attractiveness)'),
            () => {
                makeCorrectAnswer('his appeal')
            }
        ]
    },
    "trialguy": {
        name: "trialguy",
        steps: [
            () => addText('You: Oh hi Roma! Do you know how my friend Andrey is doing?'),
            () => addText('Roma: Oh, unfortunately he made a felony and has been on ????? (he is tried in court) since'),
            () => makeCorrectAnswer('trial')
        ]
    },
    "snoopdogg": {
        name: "snoopdogg",
        steps: [
            () => addText('You: Oh my god, it\'s Snoop Dogg!'),
            () => addText('You: Hi Snoop, can you help me find Platonov\'s class?'),
            () => addText('Snoop: Sorry, can\'t help you, i\'m really high right now'),
            () => {
                clearDialog()
                addText('QUIZ: What does it mean to be high?')
            },
            () => addText('1. To be tall'),
            () => addText('2. To be on a hill'),
            () => addText('3. To be under the influence of drugs'),
            () => addText('4. To be very happy and excited'),
            () => {
                makeCorrectAnswer('3. To be under the influence of drugs', '3. To be under the influence of drugs')
            },
            () => addText('You: You really don\'t remember?'),
            () => addText('Snoop: Yeah, I\'m having a bad trip right now...'),
            () => {
                clearDialog()
                addText('QUIZ: What does it mean to have a bad trip?')
            },
            () => addText('1. A journey has gone wrong'),
            () => addText('2. A vacation with unfortunate events'),
            () => addText('3. An unpleasant or distressing adventure'),
            () => addText('4. A negative psychedelic experience caused by hallucinogens'),
            () => {
                makeCorrectAnswer('4. A negative psychedelic experience caused by hallucinogens', '4. A negative psychedelic experience caused by hallucinogens')
            },
        ]
    },
    "gigachad":
        {
            name: "gigachad",
            steps:
                [
                    () => addText('You: Hello, I\'ve been searching ????? (for a really long time) for a Platonov\'s class, can you help me?'),
                    () => makeCorrectAnswer('extensively'),
                    () => addText('Gigachad: Да, иди на 4 этаж и найди 429 кабинет'),
                    () => addText('You: Sorry, I don\'t speak Russian.'),
                    () => addText('Gigachad: lmao cringe clown bb')
                ]
        }
    ,
    "start":
        {
            id: 1,
            name:
                "Start",
            steps:
                [
                    () => addText("UTMN, again, when I was here last time is a ????? (a memory from a long time ago that is hard to remember)"),
                    () => {
                        makeCorrectAnswer('distant memory')
                    },
                    () => {
                        clearDialog()
                        addText('You: I need to find Platonov\'s class')
                    }
                ]
        }
    ,
    "arab":
        {
            name: "arab",
            steps:
                [
                    () => addText('You: Hello, I\'m searching for Platonov\'s class to ????? (with no success), can you help me?'),
                    () => makeCorrectAnswer('no avail'),
                    () => addText('Arab: لقد ألقيت مشروعًا في زافودوكوفسكي طوال دقائق على الأقل دون أن يكون هناك أي إيدي في أي مكان في أي مكان'),
                    () => addText('You: sorry, I didn\'t ????? (didn\'t understand what you said)'),
                    () => makeCorrectAnswer('catch you')
                ]
        }
}

function makeCorrectAnswer(correctAnswer, replace) {
    if (replace === undefined) {
        replace = '?????'
    }
    let d = el('.dialog')
    d.innerHTML = d.innerHTML.replace(replace, `<span class='correctAnswer'>${correctAnswer}</span>`)
}

events = {
    "start": {
        id: 1,
        name: "Start",
        steps: [
            () => {
                fullTextImg('imgs/ahshit.png')
                ahshitSound.play()
            },
            () => {
                hideFullTextImg()
                closeEvent()
                openDialog('imgs/player.jpeg', 'imgs/mathfuck.png', "start");
            }
        ]
    },
    "areyousure": {
        name: "areyousure",
        steps: [
            () => fullTextImg('imgs/areyousure.png'),
            () => {
                hideFullTextImg()
                closeEvent()
                switchFloor(3)
                player.x = 690
                player.y = 414
            }
        ],
    }
}

function fullTextImg(imgPath, text) {  // TODO TEXT
    let e = el('.fullscreenImg')
    let img = el('.fullscreenImg img')
    e.style.display = 'block'
    img.src = imgPath
}

function hideFullTextImg() {
    let e = el('.fullscreenImg')
    e.style.display = 'none'
}

// function that gradually adds text to .dialog (new div), symbol by symbol, each symbol takes 0.05sec
function addText(text) {
    let dialog = document.querySelector('.dialog');
    let newDiv = document.createElement('div');
    dialog.appendChild(newDiv);
    let i = 0;
    let intervalId = setInterval(function () {
        newDiv.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(intervalId);
        }
    }, 50);
}

let isDialogOpened = false;
let currentDialogId = null;
let currentDialogStep = 0;

window.addEventListener('keyup', function (event) {
    if (isDialogOpened || isEventOpened) {
        if (isDialogOpened) {
            if (event.key === ' ') {
                console.log(isDialogOpened)
                if (isDialogOpened) {
                    console.log('space')
                    dialogNextStep();
                }
            }
        }
        if (isEventOpened) {
            if (event.key === ' ') {
                console.log(isEventOpened)
                if (isEventOpened) {
                    console.log('space')
                    eventNextStep();
                }
            }
        }
        return
    }
    switch (event.key) {
        case 'w':
            keys.up = false;
            break;
        case 'a':
            keys.left = false;
            break;
        case 's':
            keys.down = false;
            break;
        case 'd':
            keys.right = false;
            break;
        case 'e':
            if (currentPlatform) {
                currentPlatform.activateScript();
            }
            break;
    }
});

// Create a new player instance
let player = new Player();

// Draw the player for the first time
player.draw();

let camera = new Camera(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio);

function dialogNextStep() {
    if (currentDialogStep >= dialogs[currentDialogId].steps.length) {
        closeDialog();
        return
    }
    dialogs[currentDialogId].steps[currentDialogStep]();
    currentDialogStep++;
}

isEventOpened = false;
currentEventId = null;
currentEventStep = 0;

function openEvent(eventId) {
    isEventOpened = true;
    currentEventId = eventId;
    currentEventStep = 0;
    eventNextStep()
}

function closeEvent() {
    isEventOpened = false;
}

function eventNextStep() {
    if (currentEventStep >= events[currentEventId].steps.length) {
        closeEvent();
        return
    }
    events[currentEventId].steps[currentEventStep]();
    currentEventStep++;
}

function openDialog(img1Path, img2Path, dialogId) {
    isDialogOpened = true;
    currentDialogId = dialogId;
    currentDialogStep = 0;
    clearDialog()
    el('.dialogBox').style.display = 'flex';
    el('.dialogBox .pic1').src = img1Path;
    el('.dialogBox .pic2').src = img2Path;
    el('canvas').style.display = 'none';
}

function clearDialog() {
    el('.dialogBox .dialog').innerHTML = ''
}

function closeDialog() {
    isDialogOpened = false;
    el('.dialogBox').style.display = 'none';
    el('canvas').style.display = 'block';
}

// openDialog('imgs/player.jpeg', 'imgs/floor2.png', 0);
// addText('Дарова, как делааааааааааа')

let currentPlatform = null;

let totalElapsedTime = 0;
let frameCount = 0;
let lastFrameTime = Date.now();

let fps = 60

let fpsInterval = 1000 / fps;
let then = Date.now();
let startTime = then;

function animate() {
    requestAnimationFrame(animate);

    let now = Date.now();
    let elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        let frameStartTime = Date.now();
        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.drawImage(backgroundImage, -camera.x, -camera.y, worldWidth, worldHeight);

        // Update the camera and player
        camera.update(player);
        player.update();

        // Translate the context by the negative of the camera position
        context.save();
        context.translate(-camera.x, -camera.y);

        // Draw the player and other game objects
        player.draw();

        let isOnPlatform = false;

        for (let platform of platforms[currentFloor]) { // TODO current floor
            platform.draw();
            let isPlayerOn = platform.isPlayerOn(player);
            if (isPlayerOn) {
                currentPlatform = platform;
                isOnPlatform = true;
            }
        }

        if (!isOnPlatform) {
            currentPlatform = null;
        }

        context.fillStyle = 'black';
        context.font = '20px Arial';

        npcs.forEach(npc => {
            if (npc[3] === currentFloor) {
                context.drawImage(npc[0], npc[1], npc[2], 100, 76)
            }
        })

        // context.fillText('Player X: ' + player.x.toFixed(2) + ', Player Y: ' + player.y.toFixed(2), camera.x + 10, camera.y + 90);

        let frameElapsedTime = Date.now() - frameStartTime;
        totalElapsedTime += frameElapsedTime;

        // Increment the frame count
        frameCount++;

        // Calculate the average time per frame
        let averageFrameTime = totalElapsedTime / frameCount;

        // Display the average time per frame
        // context.fillText('Average frame time: ' + averageFrameTime.toFixed(2) + ' ms', camera.x + 10, camera.y + 110);

        context.restore();

        // Request the next animation frame

        // Record the end time of the frame
        lastFrameTime = Date.now();
    }
}

// Start the animation
animate();