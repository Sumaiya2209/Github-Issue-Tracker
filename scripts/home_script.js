const all_issues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then((json) => displayIssues(json.data));
};

const displayIssues = (issues) => {
  const issuesPage = document.getElementById('issues');
  issuesPage.innerHTML = "";

  /* 
"id": 1,

"status": "open",
"labels": [
"bug",
"help wanted"
],

},

 */
  for (let issue of issues) {
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
    <div class="shadow-sm p-6 space-y-4 rounded h-full ${
  issue.status === 'open'
    ? 'border-t-4 border-[#00A96E]'
    : 'border-t-4 border-[#A855F7]'
}">
          <div class="flex justify-between items-center">
         <img src="${
        issue.status === 'closed'
          ? './assets/Closed- Status .png'
          : './assets/Open-Status.png'
      }" alt="Status">
            <button class="uppercase ${
              issue.priority}" === 'HIGH'
                ? 'high'
                : issue.priority === 'LOW'
                ? 'low'
                : 'medium'
              >
              ${issue.priority}
            </button>
          </div>
          <div class="space-y-2">
            <h1 class=" font-semibold"> ${issue.title}</h1>
            <p class="text-[#64748B] text-xs">${issue.description}</p>
          </div>
          <div>
            <button class="high"><i class="fa-solid fa-bug"></i>Bug</button>
            <button class="help"><i class="fa-solid fa-life-ring"></i>Help Wanted</button>
          </div>
          <div class="flex justify-between text-[#64748B] text-xs pt-6 mb-2 border-t-1">
           <h1>#1 by ${issue.author}</h1>
           <h1>${new Date(issue.createdAt).toLocaleDateString()}</h1>
          </div>
          <div class="flex justify-between text-[#64748B] text-xs">
            <h1>${issue.assignee || "Not found"} </h1>
            <h1>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</h1>
          </div>
        </div>
    `;

    issuesPage.appendChild(issueCard);
  }
  const updateCount = document.getElementById("count_issues");
  updateCount.textContent = issues.length;
}

all_issues();


const filterButtons = document.querySelectorAll("#all, #open, #closed");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    filterButtons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if (btn.id === "all") all_issues();
    else if (btn.id === "open") filterIssues("open");
    else if (btn.id === "closed") filterIssues("closed");
  });
});

function filterIssues(status) {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      const filtered = data.data.filter(issue => issue.status === status);
      displayIssues(filtered);

      const count = filtered.length;
      console.log(`${status} count:`, count);
      const updateCount = document.getElementById("count_issues");
      updateCount.textContent = count;

    });
}

