script.js
document.getElementById('questionnaire').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const portfolio = document.getElementById('portfolio').value;
    const projectType = document.getElementById('project-type').value;
    const availability = document.getElementById('availability').value;

    // You can send this data to your server or process it as needed
    console.log({ name, email, phone, skills, experience, portfolio, projectType, availability });

    alert('Thank you for your submission!');
    document.getElementById('questionnaire').reset();
});