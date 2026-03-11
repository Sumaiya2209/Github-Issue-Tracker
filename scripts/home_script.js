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
        issue.priority.toLowerCase() === 'low'
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
            <h1>${issue.assignee}</h1>
            <h1>Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</h1>
          </div>
        </div>
    `;

    issuesPage.appendChild(issueCard);
  }
}

all_issues();


document.getElementById("all").addEventListener('click', function(){
  all_issues();
  const btn = document.getElementById("all");
  btn.classList.add("bg-primary", "text-white")
});

