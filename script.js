let url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986";
let question = document.querySelector("#question");
let btns = document.querySelectorAll(".btn");
let nextBtn = document.querySelector("#next-btn");
let count = 1;
let countCorrect = 0;

async function getQuestion() {
    try {
        let response = await fetch(url);
        let data = await response.json();
        let randomNo = Math.floor(Math.random() * data.results.length);
        let selectedQuestion = data.results[randomNo];

        question.innerHTML = `Q.No(${count}) ` + decodeURIComponent(selectedQuestion.question);
        count++;
        
        if (count==data.results.length-1) {
            alert(`Correct answers: ${countCorrect}/10`);
        }

        // Prepare answers
        let answers = [...selectedQuestion.incorrect_answers];
        let correctAnswer = selectedQuestion.correct_answer;
        let correctAnswerIndex = Math.floor(Math.random() * (answers.length + 1));
        answers.splice(correctAnswerIndex, 0, correctAnswer);

        // Assign answers to buttons
        btns.forEach((element, index) => {
            element.innerHTML = decodeURIComponent(answers[index]);
            element.style = ""; // Reset style
            element.disabled = false; // Enable buttons

            element.onclick = () => {
                // Block all options after one is clicked
                btns.forEach(btn => {
                    btn.disabled = true;
                });

                if (element.textContent === correctAnswer) {
                    element.style = `background-color: #001e4d; color: #fff;`;
                    countCorrect++;
                    console.log(countCorrect);
                } else {
                    element.style = `background-color: rgba(221, 222, 255, 0.719); border:1px solid red`;
                    console.log("wrong answer");

                    // Highlight the correct answer
                    btns.forEach(btn => {
                        if (btn.textContent === correctAnswer) {
                            btn.style = `background-color: #001e4d; color: #fff;`;
                        }
                    });
                }
            };
        });

        console.log(data);
        console.log(randomNo);
    } catch (error) {
        console.error('Error fetching the data:', error);
    }
}

nextBtn.style.display = "block";
nextBtn.addEventListener("click", () => {
    getQuestion();
});

// Initial call to load the first question
getQuestion();
