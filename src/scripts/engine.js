const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardsSprits: {
        avatar: document.getElementById("card_img"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCarts: {
        player: document.getElementById("Player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    button: document.getElementById("next-duel"),

};
const pathImages = "./src/assets/icons/"
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Rock",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Scissors",
        img: `${pathImages}magician.png`,
        winOf: [2],
        loseOf: [1],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Paper",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    }
];

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"

};

function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
};

function createCardImage(Idcard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", Idcard);
    cardImage.classList.add("card");


    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardField(cardImage.getAttribute("data-id"));
        });
    };

    cardImage.addEventListener("mouseover", () => {
        drawSelectCard(Idcard);
    });
    return cardImage;
};

async function removeAllCardsImgs() {
    let cards = document.querySelector("#computer-cards");
    let imgElements = document.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = document.querySelector("#player-cards");
    imgElements = document.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

function setCardField(cardId) {
    

    let computerCardId = getRandomCardId();
    state.fieldCarts.player.style.display = "block";
    state.fieldCarts.computer.style.display = "block";

    state.fieldCarts.player.src = cardData[cardId].img;
    state.fieldCarts.computer.src = cardData[computerCardId].img;
    
    removeAllCardsImgs();
    // let duelResult = checkDuelResults();

    // updateScore();
    // drawButton(duelResult)
}



function drawSelectCard(index) {
    state.cardsSprits.avatar.src = cardData[index].img;
    state.cardsSprits.name.innerText = cardData[index].name;
    state.cardsSprits.type.innerText = "atriute: " + cardData[index].type;
}

function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdcard = getRandomCardId();
        const cardImage = createCardImage(randomIdcard, fieldSide);


        document.getElementById(fieldSide).appendChild(cardImage);
    };
};

function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
};
init();