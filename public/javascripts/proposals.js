// Filter functionality
document.getElementById("filter-status").addEventListener("change", function () {
    const statusFilter = this.value;
    const rows = document.querySelectorAll("#proposal-list tr");

    rows.forEach(row => {
        const status = row.children[2].innerText.toLowerCase();
        if (statusFilter === "all" || status === statusFilter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

// Search functionality
document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const rows = document.querySelectorAll("#proposal-list tr");

    rows.forEach(row => {
        const jobTitle = row.children[0].innerText.toLowerCase();
        const client = row.children[1].innerText.toLowerCase();
        if (jobTitle.includes(searchTerm) || client.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});
