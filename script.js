const skills = [
  {
    name: "Leadership",
    level: "92%",
    text: "Vice Leader of Events Committee, Helper team work, and the habit of taking the first step when something must be done."
  },
  {
    name: "Organization",
    level: "95%",
    text: "Four MUN conferences, Student Council, and the STEAM Festival — planning, timing, details, and follow-through."
  },
  {
    name: "Communication",
    level: "90%",
    text: "Speaking with participants, teammates, and delegates. Clear words. Calm tone. Listening before answering."
  },
  {
    name: "Teamwork",
    level: "94%",
    text: "A conference is a group effort. I know how to share work, support others, and keep the goal bigger than myself."
  },
  {
    name: "Problem-solving",
    level: "88%",
    text: "When the schedule shifts or a participant is lost, I look for the next useful action instead of the panic."
  },
  {
    name: "Responsibility",
    level: "96%",
    text: "Three years as a Helper taught me that people remember who showed up, who finished the task, and who stayed until the end."
  }
];

const reasons = [
  {
    title: "Contribute to the conference",
    text: "I do not want a seat for the photograph. I want to do the work that makes the conference better for chairs, helpers, and every delegate in the room."
  },
  {
    title: "Use my previous MUN experience",
    text: "Four conferences gave me a map of MUN. Three years as a Helper and one year as a Delegate mean I already understand both the backstage and the floor."
  },
  {
    title: "Develop my leadership skills",
    text: "Student Council and the Events Committee started this path. The Secretariat is the next serious place to lead through service, not through noise."
  },
  {
    title: "Gain more organizational experience",
    text: "I already organize events. I want a larger, more precise environment — one where timing, communication, and teamwork decide the quality of the whole day."
  },
  {
    title: "Communicate with participants",
    text: "Helpers live next to questions. I want to keep that contact: welcome people, explain clearly, and make sure nobody feels left outside the conference."
  },
  {
    title: "Help create a successful conference",
    text: "Success is not luck. It is preparation, responsibility, and respect for participants. That is the conference I want to help build."
  }
];

const skillsGrid = document.getElementById("skillsGrid");
skills.forEach((skill) => {
  const el = document.createElement("article");
  el.className = "skill reveal";
  el.style.setProperty("--level", skill.level);
  el.innerHTML = `<b>${skill.name}</b><p>${skill.text}</p>`;
  skillsGrid.appendChild(el);
});

const reasonsList = document.getElementById("reasons");
reasons.forEach((reason, i) => {
  const el = document.createElement("li");
  el.className = "reason reveal";
  el.innerHTML = `<i>0${i + 1}</i><div><strong>${reason.title}</strong><p>${reason.text}</p></div>`;
  reasonsList.appendChild(el);
});

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

const counters = document.querySelectorAll("[data-count]");
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const duration = 1200;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

counters.forEach((el) => io.observe(el));

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

const resize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  stars = Array.from({ length: 90 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + 0.2,
    s: Math.random() * 0.35 + 0.05
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#d4b26a";
  stars.forEach((star) => {
    star.y -= star.s;
    if (star.y < 0) star.y = canvas.height;
    ctx.globalAlpha = 0.15 + star.r * 0.25;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
};

addEventListener("resize", resize);
resize();
draw();
