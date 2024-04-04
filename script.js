let video = document.querySelector("#video");
let input = document.querySelector("#video-link");
let button = document.querySelector("#button");

button.addEventListener("click", () => {
  fetch("/api", {
    method: "POST",
    body: JSON.stringify({
      url: input.value,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((data) => {
      video.src = data.image.url;
      video.play();
      console.log(data.image.url);
    });
});
