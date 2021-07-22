const fs = require('fs');


const div_teams = document.getElementById('div_teams');
const button_teams = document.getElementById('button_teams');
const button_cancel_teams = document.getElementById('button_cancel_teams');


// JSON variable
var teams = null;


/////////////////////////////////////////////
//////////    Loading panels   //////////////
/////////////////////////////////////////////

// <div id='team'> - edit teams
function create_team(team) {
  var div_team = document.createElement("div");
  div_team.setAttribute("id", "team");
  var div_html_string = "<label hidden>" + team.id + "</label>";
  div_html_string += "<textarea class=\'divedit_str\'>" + team.name + "</textarea>"
  div_html_string += "<textarea class=\'divedit\'>" + team.gold + "</textarea>";
  div_html_string += "<textarea class=\'divedit\'>" + team.food + "</textarea>";
  div_html_string += "<textarea class=\'divedit\'>" + team.fame + "</textarea>";
  div_team.innerHTML = div_html_string;
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
    json_teams.push({ "id": team.children[0].innerHTML, "name": team.children[1].value, "gold": Number(team.children[2].value), "food": Number(team.children[3].value), "fame": Number(team.children[4].value) });
  });
  fs.writeFileSync('./app/teams.json', JSON.stringify(json_teams), function (err) {
    if (err) throw err;
  });
  window.location.replace("./index.html");
});

button_cancel_teams.addEventListener('click', () => {
  window.location.replace("./index.html");
});


///////////////////////////////////////
/////////        Init          ////////
///////////////////////////////////////

// loading panels
loading_panels();