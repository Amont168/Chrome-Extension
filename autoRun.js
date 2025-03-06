window.setTimeout(startTimer, 30000)

fetch("timeSettings.txt")
  .then((res) => res.text())
  .then((text) => {
    console.log(text)
    // do something with "text"
   })
  .catch((e) => console.error(e));


function startTimer() {
    window.setInterval(startClickLoop, 10000)
}

function startClickLoop() {

}

console.log("Tester!")