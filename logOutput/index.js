const randomHash = Math.random().toString(36).substr(2, 6);
const printHash = () => {
  const date = new Date();
  console.log(date, randomHash);

  setTimeout(printHash, 5000);
};
printHash();
