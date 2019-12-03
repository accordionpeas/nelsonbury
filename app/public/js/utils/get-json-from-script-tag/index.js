export default ({ id }) => {
  try {
    return JSON.parse(document.querySelector(`#${id}`).textContent);
  } catch (err) {
    return {};
  }
};
