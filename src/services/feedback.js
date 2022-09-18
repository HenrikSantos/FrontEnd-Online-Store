export const SaveFeedbackInLocalStorage = (feedbacks, productKey) => {
  localStorage.setItem(productKey, JSON.stringify(feedbacks));
};

export const getFeedbacks = (productKey) => JSON.parse(localStorage.getItem(productKey));

// if (!getFeedbacks()) {
//   localStorage.setItem(FEEDBACK_KEY, JSON.stringify([]));
// }

export const addFeedback = (feedback, productKey) => {
  const currentFeedbacks = getFeedbacks(productKey);
  SaveFeedbackInLocalStorage([...currentFeedbacks, feedback], productKey);
};
