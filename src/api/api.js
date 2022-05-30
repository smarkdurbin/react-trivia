import axios from "axios";

// Define rest base.
const restBase = "https://opentdb.com";

/**
 * Returns questions
 *
 * @param {number} numQuestions
 *
 * @returns {array} questions
 */
export const getQuestions = async (amount = 5) => {
  const questions = await axios
    .get(`${restBase}/api.php`, {
      params: {
        amount,
        category: 9,
      },
    })
    .then((res) => {
      // Define questions.
      const questions = Object.values(res.data.results);

      return questions;
    });

  return questions;
};
