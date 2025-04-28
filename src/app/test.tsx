"use client";

const Test = () => {
  const test = async () => {
    const test = await fetch("https://api.example.com/example/user").then(
      (res) => res.json()
    );

    console.log(test);
  };

  return <button onClick={test}>Test</button>;
};

export default Test;
