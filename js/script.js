document.addEventListener("DOMContentLoaded", function () {

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(this);
  
    fetch('https://formspree.io/f/xeoqjzze', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        this.reset();
        document.getElementById('reminder').style.display = 'block';
      } else {
        throw new Error('Something went wrong');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  const questions = [
    "Anh đẹp trai có ngiu chưaa?",
    "Mình thích bạn lâu rùi óoo",
    "Con nho nyc khong?",
    "Thợ săn hồng hài nhi",
    "Có khóa học lập trình nào cho người mới bắt đầu không?",
    "Anh có thích em hong?",
    "I miss you",
    "Cách hack facebook cờ rút",
    "Có thể làm quen không?",
    "Anh ơi, ngủ chưa mà đẹp trai dữ vậy?",
    "Nhìn anh mãi không chán luôn á, làm sao giờ?",
    "Có nyc nào mà không thích quay lại không?",
    "Bí kíp cua crush trong 7 ngày là gì ạ?",
    "Em nghĩ em lạc đường rồi, nhưng đường vào tim anh á!",
    "Thích lập trình hay thích lập gia đình với em hơn?",
    "Nếu em là gió, anh có nguyện làm mây không?",
    "Học lập trình xong có trở thành siêu nhân không ạ?",
    "Chơi game nhiều mà sao không 'chơi' em luôn?",
    "Một ngày đẹp trời như hôm nay, anh nghĩ gì về em?",
  ];

  let lastQuestionIndex = -1;

  document.getElementById('random-question-button').addEventListener('click', function() {
      let randomIndex;
      do {
          randomIndex = Math.floor(Math.random() * questions.length);
      } while (randomIndex === lastQuestionIndex);

      lastQuestionIndex = randomIndex;
      document.getElementById('message').value = questions[randomIndex];
  });
    

  // Typing Effects
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  var textArray = ["Hey there! I'm a coder from Vietnam", "My old nickname was DevGecko", "And that's all about me :)"];

  let typingDelay = 50;
  const erasingDelay = 25;
  var delayTime = 2500;
  const spanElement = document.querySelector(".cursor");
  let textArrayIndex = 0;
  let charIndex = 0;
  function type() {
    if (textArrayIndex > textArray.length - 1) {
      textArrayIndex = 0;
      delayTime = 2500;
    }
    if (textArrayIndex == textArray.length - 1) {
      delayTime = 5000;
    }

    if (charIndex < textArray[textArrayIndex].length) {
      spanElement.style.display = "inline-block";
      if (!cursorSpan.classList.contains("typing")) spanElement.style.width = "8px";
      cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      spanElement.style.width = "3.5px";

      setTimeout(function () {
        erase();
      }, delayTime);
    }
  }

  // Erase Effects
  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) spanElement.style.width = "3.5px";
      cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(function () {
        textArrayIndex++;
        type();
      }, 500);
    }
  }

  // Typing start
  setTimeout(function () {
    type();
  }, 500);

  // Project
  const projects = [
    {
      name: "AllReacts for Facebook Stories",
      url: "https://github.com/duckcit/AllReacts-for-Facebook-Stories",
      demoUrl: "https://github.com/duckcit/AllReacts-for-Facebook-Stories",
      visibility: "Public",
    },
    {
      name: "Image2ASCII",
      url: "https://github.com/duckcit/image2ascii",
      demoUrl: "https://duckcit.github.io/image2ascii",
      visibility: "Public",
    },
    {
      name: "DuckTV",
      url: "https://github.com/duckcit/DuckTV",
      demoUrl: "https://github.com/duckcit/DuckTV/releases/tag/v1.0",
      visibility: "Public",
    },
    {
      name: "Rank Score THPT2024",
      url: "https://github.com/duckcit/rank-thpt2024",
      demoUrl: "https://github.com/duckcit/rank-thpt2024/blob/main/main.py",
      visibility: "Public",
    },
    {
      name: "Pydroid3 Premium",
      url: "https://github.com/duckcit/pydroid3",
      demoUrl: "https://github.com/duckcit/pydroid3/releases/tag/v1.0",
      visibility: "Public",
    },
    {
      name: "Event Tet",
      url: "https://github.com/duckcit/eventTet",
      demoUrl: "https://duckcit.github.io/eventTet",
      visibility: "Private",
    },
  ];

  const projectsContainer = document.getElementById("projects-container");

  projects.forEach((project, index) => {
    const projectElement = document.createElement("div");
    projectElement.classList.add("projects");
  
    // Tạo animation xen kẽ giữa trái và phải
    const animationClass = index % 2 === 0 ? "project-left" : "project-right";
    projectElement.classList.add(animationClass);
  
    const displayUrl = project.demoUrl.replace(/^https?:\/\//, "");
  
    projectElement.innerHTML = `
      <div class="project-head">
        <a href="${project.url}">${project.name}</a>
        <span tooltip="${project.visibility === "Public" ? "Open source" : "Hidden"}">${project.visibility}</span>
      </div>
      <div class="project-body">
        <i class="fa fa-link"></i>
        <a target="_blank" href="${project.demoUrl}">${displayUrl}</a>
      </div>
    `;
  
    projectsContainer.appendChild(projectElement);
  
    // Tạo IntersectionObserver để chỉ thêm class khi projectElement vào khung nhìn
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Thêm class khi phần tử xuất hiện trong viewport
          setTimeout(() => {
            projectElement.classList.add("project-visible");
          }, index * 200); // Tăng dần delay cho từng project
          // Ngừng quan sát sau khi đã xuất hiện
          observer.unobserve(entry.target);
        }
      });
    });
  
    // Bắt đầu quan sát phần tử dự án
    observer.observe(projectElement);
  });
  
  
  const progressBars = document.querySelectorAll('.progress');

  progressBars.forEach((progress, index) => {
    const widthMatch = progress.getAttribute('style').match(/width:\s*(\d+)%/);
    
    if (widthMatch) {
      const width = widthMatch[1] + '%';
  
      // Đặt width về 0 để bắt đầu animation
      progress.style.width = '0';
  
      // Tạo IntersectionObserver để chỉ thực hiện khi progressBar xuất hiện trong viewport
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Khôi phục lại width ban đầu sau khi vào khung nhìn
            setTimeout(() => {
              progress.style.width = width;
              progress.classList.add('progress-visible');
            }, index * 500); // Tăng dần delay cho mỗi thanh tiến trình
  
            // Ngừng quan sát sau khi thanh tiến trình đã xuất hiện
            observer.unobserve(entry.target);
          }
        });
      });
  
      // Bắt đầu quan sát từng thanh tiến trình
      observer.observe(progress);
    } else {
      console.error('No width found for:', progress);
    }
  });
  
});
