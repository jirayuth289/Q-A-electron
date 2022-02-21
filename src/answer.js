
const questionRef = document.getElementById('question')

const answerList = [
  {
    questionId: 1,
    answer: "answer 1"
  },
  {
    questionId: 2,
    answer: "answer 2"
  },
  {
    questionId: 3,
    answer: "answer 3"
  },
]
window.answerApi.handleAnswer((event, questionId) => {
  const answer = answerList.find(item => item.questionId == questionId);
  questionRef.innerText = answer.answer;
})
