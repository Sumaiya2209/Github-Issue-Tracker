const all_issues = () => {
  manageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then((json) => {
      displayIssues(json.data);
       manageSpinner(false);
    });
};

const manageSpinner = (status) =>{
  if (status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("issues").classList.add("hidden");
  }
  else{
     document.getElementById("spinner").classList.add("hidden");
    document.getElementById("issues").classList.remove("hidden");
  }
}

const displayIssues = (issues) => {

  const issuesPage = document.getElementById('issues');
  issuesPage.innerHTML = "";

  for (let issue of issues) {
    const issueCard = document.createElement("div");
    issueCard.innerHTML = `
    <div class="shadow-sm p-6 space-y-4 rounded h-full ${issue.status === 'open'
        ? 'border-t-4 border-[#00A96E]'
        : 'border-t-4 border-[#A855F7]'
      }">
          <div class="flex justify-between items-center">
         <img src="${issue.status === 'closed'
        ? './assets/Closed- Status .png'
        : './assets/Open-Status.png'
      }" alt="Status">
            <button class="uppercase ${issue.priority}" === 'HIGH'
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
          <div class=""> ${createElement(issue.labels)}
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

    issueCard.addEventListener('click', async function () {
      const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issue.id}`
      const res = await fetch(url);
      const details = await res.json();
      displayDetails(details);
    });

    issuesPage.appendChild(issueCard);
  }
  const updateCount = document.getElementById("count_issues");
  updateCount.textContent = issues.length;

}

all_issues();


const filterButtons = document.querySelectorAll("#all, #open, #closed");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    document.getElementById("search_box").value = "";

    filterButtons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    if (btn.id === "all") all_issues();
    else if (btn.id === "open") filterIssues("open");
    else if (btn.id === "closed") filterIssues("closed");
  });
});

function filterIssues(status) {
  manageSpinner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(data => {
      const filtered = data.data.filter(issue => issue.status === status);
      displayIssues(filtered);
       manageSpinner(false);

      const count = filtered.length;
      const updateCount = document.getElementById("count_issues");
      updateCount.textContent = count;

    });
}


const displayDetails = (issues) => {
  const detailsBox = document.getElementById("details");
  detailsBox.innerHTML = `
    <dialog id="details_modal" class="modal">
      <div class="modal-box max-w-3xl">
        <h3 class="text-2xl font-bold mb-2">
          ${issues.data.title}
        </h3>
        <div class="flex items-center gap-3 text-sm mb-4">
          <span class="badge badge-success text-white rounded-full uppercase">${issues.data.status}</span>
          <span class="text-gray-500">• Opened by ${issues.data.author}</span>
          <span class="text-gray-500">• ${new Date(issues.data.createdAt).toLocaleDateString()}</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          ${createElement(issues.data.labels)}
        </div>
        <p class="text-gray-500 mb-6">
          ${issues.data.description}
        </p>
        <div class="bg-base-200 rounded-lg p-5 grid grid-cols-2 mb-8">
          <div>
            <p class="text-gray-500 text-sm">Assignee:</p>
            <p class="font-semibold">${issues.data.assignee || "Not found"}</p>
          </div>
          <div>
            <p class="text-gray-500 text-sm mb-1">Priority:</p>
            <span class="badge px-4 py-3 uppercase ${
              issues.data.priority.toLowerCase() === 'high'
                ? 'bg-red-500 text-white'
                : issues.data.priority.toLowerCase() === 'low'
                ? 'bg-gray-200 text-black'
                : 'bg-yellow-200 text-yellow-700'
            }">
              ${issues.data.priority}
            </span>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;

  document.getElementById("details_modal").showModal();
}


const createElement = (arr) => {
  return arr.map(el =>
    `<span class="mr-2 uppercase ${
      el === "bug"
        ? "high"
        : el === "help wanted"
        ? "enhancement"
        : "help"
    }"> 
      ${
        el === "bug"
          ? '<i class="fa-solid fa-bug"></i>'
          : el === "help wanted"
          ? '<i class="fa-solid fa-life-ring"></i>'
          : '<i class="fa-solid fa-wand-magic-sparkles"></i>'
      }  ${el}
    </span>`
  ).join("");
};


document.getElementById("search_box").addEventListener('keyup', function(event){

  const input = event.target.value;
  const searchValue = input.trim().toLowerCase();

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then((json) => {
      const allIssues = json.data;
      displayIssues(allIssues);
    });
    
});