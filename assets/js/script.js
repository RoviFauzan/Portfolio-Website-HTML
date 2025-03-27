$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Rovi Fauzan";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["frontend development", "backend development", "web designing", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

const skillsData = [
    {
        category: "Frontend",
        skills: [
            { name: "ReactJS", icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/48/000000/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png", proficiency: 65 },
            { name: "TailwindCSS", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/48px-Tailwind_CSS_Logo.png", proficiency: 70 },
            { name: "Bootstrap", icon: "https://img.icons8.com/color/48/000000/bootstrap.png", proficiency: 85 },
            { name: "HTML5", icon: "https://img.icons8.com/color/48/000000/html-5--v1.png", proficiency: 95 },
            { name: "CSS3", icon: "https://img.icons8.com/color/48/000000/css3.png", proficiency: 95 },
            { name: "JavaScript", icon: "https://img.icons8.com/color/48/000000/javascript--v1.png", proficiency: 90 },
            { name: "jQuery", icon: "https://img.icons8.com/ios-filled/48/1169ae/jquery.png", proficiency: 80 }
        ]
    },
    {
        category: "Backend",
        skills: [
            {name: "ExpressJS", icon: "https://img.icons8.com/fluency/48/000000/node-js.png", proficiency: 60},
            {name: "NodeJS", icon: "https://img.icons8.com/color/48/000000/nodejs.png", proficiency: 70},
            {name: "PHP", icon: "https://img.icons8.com/offices/48/000000/php-logo.png", proficiency: 95},
            {name: "Java", icon: "https://img.icons8.com/color/48/000000/java-coffee-cup-logo--v1.png", proficiency: 85},
            {name: "Python", icon: "https://img.icons8.com/color/48/000000/python--v1.png", proficiency: 95},
            {name: "C++", icon: "https://img.icons8.com/color/48/000000/c-plus-plus-logo.png", proficiency: 80}
        ]
    },
    {
        category: "Database",
        skills: [
            {name: "MySQL", icon: "https://img.icons8.com/color/48/000000/mysql-logo.png", proficiency: 95 },
            {name: "PostgreSQL", icon: "https://img.icons8.com/color/48/000000/postgreesql.png", proficiency: 60}
        ]
    },
    {
        category: "Dev Tools",
        skills: [
            {name: "GitHub", icon: "https://img.icons8.com/glyph-neue/48/ffffff/github.png", proficiency: 95 },
            {name: "Linux", icon: "https://img.icons8.com/color/48/000000/linux.png", proficiency: 85 },
            {name: "WordPress", icon: "https://img.icons8.com/color/48/000000/wordpress.png", proficiency: 60}
        ]
    },
    {
        category: "Soft Skills",
        skills: [
            {name: "Problem Solving", icon: "https://img.icons8.com/fluency/48/brain.png", proficiency: 90 },
            {name: "Communication", icon: "https://img.icons8.com/fluency/48/chat.png", proficiency: 85},
            {name: "Teamwork", icon: "https://img.icons8.com/fluency/48/teamwork.png", proficiency: 80},
            {name: "Adaptability", icon: "https://img.icons8.com/fluency/48/synchronize.png", proficiency: 75}
        ]
    }
];

function showSkills(category) {
    let skillsContainer = document.getElementById("skillsContainer");
    
    skillsContainer.classList.remove("active");

    setTimeout(() => {
        let selectedCategory = skillsData.find(cat => cat.category === category);
        if (!selectedCategory) return;

        let skillHTML = "";
        selectedCategory.skills.forEach(skill => {
            let color = skill.proficiency < 50 ? "#dc3545" : skill.proficiency < 80 ? "#ff7b00" : "#28a745";

            skillHTML += `
            <div class="bar">
                <div class="skill-card">
                    <div class="skill-info">
                        <img src="${skill.icon}" alt="${skill.name}" />
                        <span>${skill.name}</span>
                    </div>
                    <div class="skill-progress-container">
                        <div class="skill-progress">
                            <div class="progress-bar" style="--width: ${skill.proficiency}%; --color: ${color};"></div>
                        </div>
                        <span class="proficiency-text">${skill.proficiency}%</span>
                    </div>
                </div>
            </div>`;
        });

        skillsContainer.innerHTML = skillHTML;

        // Trigger animation after a short delay
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                bar.classList.add('animate');
            });
            skillsContainer.classList.add("active");
        }, 50);
    }, 300);
}

document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        showSkills(this.dataset.category);
    });
});

// Tampilkan Frontend terlebih dahulu
showSkills("Frontend");

function showProjects(projects) {
    let projectsContainer = document.querySelector("#portfolio .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.portfolio .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.portfolio .box', { interval: 200 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

const aboutData = {
    identity: {
        title: "Identity",
        items: [
            "Full Name: Rovi Fauzan",
            "Birth: June 10, 2004",
            "Nationality: Indonesian",
            "Location: Tasikmalaya",
            "Email: rovifauzan24@gmail.com",
            "University: Siliwangi University"
        ]
    },
    interests: {
        title: "Interests",
        items: [
            "Web Development",
            "Mobile Development",
            "UI/UX Design",
            "Cloud Computing",
            "System Architecture",
            "Open Source"
        ]
    },
    expertise: {
        title: "Expertise",
        items: [
            "Frontend Development",
            "Backend Development",
            "REST API Development",
            "Database Design",
            "Cloud Services",
            "Version Control"
        ]
    }
};

function showAboutContent(category) {
    const contentDiv = document.getElementById('aboutContent');
    const data = aboutData[category];
    
    contentDiv.style.opacity = '0';
    
    setTimeout(() => {
        let html = `<h3>${data.title}</h3><ul>`;
        data.items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
        
        contentDiv.innerHTML = html;
        contentDiv.style.opacity = '1';
    }, 300);
}

document.querySelectorAll('.about-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.about-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        showAboutContent(this.dataset.tab);
    });
});

// Show Identity content by default
document.addEventListener('DOMContentLoaded', () => {
    showAboutContent('identity');
});