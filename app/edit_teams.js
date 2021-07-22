const fs = require('fs');


const div_teams = document.getElementById('div_teams');
const button_teams = document.getElementById('button_teams');
const button_cancel_teams = document.getElementById('button_cancel_teams');
const button_add_team = document.getElementById('button_add_team');


// JSON variable
var teams = null;


/////////////////////////////////////////////
//////////    Loading panels   //////////////
/////////////////////////////////////////////

// <div id='team'> - edit teams
function create_team(team) {
  var div_team = document.createElement("div");
  div_team.setAttribute("id", "team");
  var div_html_string = "<textarea class=\'divedit_str\'>" + team.name + "</textarea>"
  div_html_string += "<textarea class=\'divedit\'>" + team.gold + "</textarea>";
  div_html_string += "<textarea class=\'divedit\'>" + team.food + "</textarea>";
  div_html_string += "<textarea class=\'divedit\'>" + team.fame + "</textarea>";
  div_team.innerHTML = div_html_string;

  var remove_button = document.createElement("button");
  remove_button.setAttribute("class", "remove")
  remove_button.innerHTML = "Remove";
  remove_button.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  })
  div_team.appendChild(remove_button)

  return div_team;
}

function loading_panels() {
  teams = JSON.parse(fs.readFileSync('./app/teams.json').toString());

  //// loading view teams panel
  teams.forEach((team) => {
    div_teams.appendChild(create_team(team));
  });

}

///////////////////////////////////////
///////// Main panel reactions ////////
///////////////////////////////////////

///////////////////// Teams
button_teams.addEventListener('click', () => {
  var teams_div = document.querySelectorAll("div#team");
  var json_teams = [];
  teams_div.forEach((team) => {
    json_teams.push({ "name": team.children[0].value, "gold": Number(team.children[1].value), "food": Number(team.children[2].value), "fame": Number(team.children[3].value) });
  });
  fs.writeFileSync('./app/teams.json', JSON.stringify(json_teams), function (err) {
    if (err) throw err;
  });
  window.location.replace("./index.html");
});

button_cancel_teams.addEventListener('click', () => {
  window.location.replace("./index.html");
});

button_add_team.addEventListener('click', () => {
  div_teams.appendChild(create_team({"name": "", "gold": "0", "food": "0", "fame": "0"}));
});

///////////////////////////////////////
/////////        Init          ////////
///////////////////////////////////////

// loading panels
loading_panels();