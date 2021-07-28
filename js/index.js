let n = 2;

setInterval(function() {
  const projects = document.getElementById('projects');
  n = n < 6 ? n + 1 : 2;
  console.log(n);
  projects.src = `img/projects/00${n}.png`;
}, 5000);
