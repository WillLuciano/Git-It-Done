var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {

  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  console.log(repo);

  fetch(apiUrl).then(function(response) {

    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);
      });
    }
    else {
      alert("There was a problem with your request!");
    }
  });
};

var displayIssues = function(issues) {
  if (issues.length === 0 ){
    issuesContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  for (var i = 0; i < issues.length; i++) {

    var issuesEl = document.createElement("a");
    issuesEl.classList = "list-item flex-row justtify-space-between align-center";
    issuesEl.setAttribute("href", issues[i].html_url);
    issuesEl.setAttribute("target", "_blank");

    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    issuesEl.appendChild(titleEl);

    var typeEl = document.createElement("span");

    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    issuesEl.appendChild(typeEl);

    issuesContainerEl.appendChild(issuesEl);
  }
};

getRepoIssues("facebook/react");