const timer = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
export default timer;