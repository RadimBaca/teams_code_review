const fs = require('fs');


const panel_view_teams = document.getElementById('panel_view_teams');
const button_edit_teams = document.getElementById('button_edit_teams');
const table_teams = document.getElementById('table_teams');

// JSON variable
var teams = null;

/////////////////////////////////////////////
//////////    Loading table    //////////////
/////////////////////////////////////////////

// <tr> team
function create_view_team(team) {
  var tr_team = document.createElement("tr");
  var tr_innerhtml_string = "<td><b>" + team.name + "</b></td>"
  tr_innerhtml_string += "<td>" + team.gold + "</td>";
  tr_innerhtml_string += "<td>" + team.food + "</td>";
  tr_innerhtml_string += "<td>" + team.fame + "</td>";
  tr_team.innerHTML = tr_innerhtml_string;
  return tr_team;
}


function loading_panels() {
  teams = JSON.parse(fs.readFileSync('./app/teams.json').toString());

  //// loading view team panel
  teams.forEach((team) => {
    table_teams.appendChild(create_view_team(team));
  });

}

/////////////////////////////////////////////
/////////         Events        /////////////
/////////////////////////////////////////////

button_edit_teams.addEventListener('click', () => {
  window.location.replace("./edit_teams.html");
});


///////////////////////////////////////
/////////        Init          ////////
///////////////////////////////////////

// loading panels
loading_panels();