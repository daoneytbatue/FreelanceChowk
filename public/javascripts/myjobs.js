function showTab(tabId) {
    // Hide all sections
    const sections = document.querySelectorAll('.job-section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab and add active class to the button
    document.getElementById(tabId).classList.remove('hidden');
    event.target.classList.add('active');
}
