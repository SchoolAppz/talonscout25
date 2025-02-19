let auto_algae_removed = 0;
let auto_coral_l1 = 0;
let auto_coral_l2 = 0;
let auto_coral_l3 = 0;
let auto_coral_l4 = 0;
let teleop_algae_removed = 0;
let algae_scored_net = 0;
let algae_scored_processor = 0;
let leave = false;
let endgame_result = '';
let robot_condition = 'fine';
let drive_condition = 'fine';
let defense = false;
let post_match_comments = '';
let match_data = []; 

// DOM elements
const algaeRemovedBtnAuto = document.getElementById('algaeRemovedBtnAuto');
const coralScoredBtn = document.getElementById('coralScoredBtn');
const coralScoreDialog = document.getElementById('coralScoreDialog');
const leaveCheckbox = document.getElementById('leave');
const algaeRemovedBtnTeleop = document.getElementById('algaeRemovedBtnTeleop');
const coralScoredBtnT = document.getElementById('coralScoredBtnT');
const algaeScoredBtn = document.getElementById('algaeScoredBtn');
const algaeScoreDialog = document.getElementById('algaeScoreDialog');
const endgameResultDropdown = document.getElementById('endgameResult');
const robotConditionSlider = document.getElementById('robotCondition');
const driveConditionSlider = document.getElementById('driveCondition');
const defenseCheckbox = document.getElementById('defense');
const commentsBox = document.getElementById('comments');
const newMatchBtn = document.getElementById('newMatchBtn');
const exportBtn = document.getElementById('exportBtn');

// Fix dialog issue by ensuring the dialogs are showing and closing properly
coralScoredBtn.addEventListener('click', function() {
    coralScoreDialog.showModal(); // Open the coral scoring dialog
});

document.querySelectorAll('#coralScoreDialog .dialog-button').forEach(button => {
    button.addEventListener('click', function() {
        const coralLevel = button.textContent;
        if (coralLevel === 'L1') auto_coral_l1++;
        else if (coralLevel === 'L2') auto_coral_l2++;
        else if (coralLevel === 'L3') auto_coral_l3++;
        else if (coralLevel === 'L4') auto_coral_l4++;

        document.getElementById('coralScoreStatus').textContent = `Coral Level: ${coralLevel}`;
        coralScoreDialog.close(); // Close dialog after selecting a level
    });
});

// Auto algae removal event
algaeRemovedBtnAuto.addEventListener('click', function() {
    auto_algae_removed++;
    document.getElementById('autoAlgaeCount').textContent = `Algae removed in Auto: ${auto_algae_removed}`;
});

// Leave checkbox change handler
leaveCheckbox.addEventListener('change', function() {
    leave = leaveCheckbox.checked;
    document.getElementById('leaveStatus').textContent = `Leave: ${leave ? 'Yes' : 'No'}`;
});

// Teleop coral scoring event
coralScoredBtnT.addEventListener('click', function() {
    coralScoreDialog.showModal(); // Open the coral scoring dialog in Teleop
});

// Teleop algae scoring event
algaeScoredBtn.addEventListener('click', function() {
    algaeScoreDialog.showModal(); // Open the algae scoring dialog
});

document.querySelectorAll('#algaeScoreDialog .dialog-button').forEach(button => {
    button.addEventListener('click', function() {
        const location = button.textContent;
        if (location === 'Net') algae_scored_net++;
        else if (location === 'Processor') algae_scored_processor++;

        document.getElementById('algaeScoreStatus').textContent = `Algae Scored: ${location}`;
        algaeScoreDialog.close(); // Close dialog after selecting a location
    });
});

// Endgame result selection
endgameResultDropdown.addEventListener('change', function() {
    endgame_result = endgameResultDropdown.value;
    document.getElementById('endgameResultStatus').textContent = `Endgame Result: ${endgame_result}`;
});

// Fixing robot condition slider
robotConditionSlider.addEventListener('input', function() {
    const conditionLevels = ['Tipped', 'Very Tippy', 'Tippy', 'Fine'];
    robot_condition = conditionLevels[robotConditionSlider.value];
    document.getElementById('robotConditionText').textContent = `Robot Condition: ${robot_condition}`;
});

// Fixing drive condition slider
driveConditionSlider.addEventListener('input', function() {
    const conditionLevels = ['Disabled', 'Stalled', 'Broken', 'Fine'];
    drive_condition = conditionLevels[driveConditionSlider.value];
    document.getElementById('driveConditionText').textContent = `Drive Condition: ${drive_condition}`;
});

// Defense checkbox handler
defenseCheckbox.addEventListener('change', function() {
    defense = defenseCheckbox.checked;
    document.getElementById('defenseStatus').textContent = `Defense Played: ${defense ? 'Yes' : 'No'}`;
});

// Comments box handler
commentsBox.addEventListener('input', function() {
    post_match_comments = commentsBox.value;
    document.getElementById('commentsStatus').textContent = `Comments: ${post_match_comments}`;
});

// New Match button - saving data and resetting form
newMatchBtn.addEventListener('click', function() {
    match_data.push({
        auto_algae_removed,
        auto_coral_l1,
        auto_coral_l2,
        auto_coral_l3,
        auto_coral_l4,
        teleop_algae_removed,
        algae_scored_net,
        algae_scored_processor,
        leave,
        endgame_result,
        robot_condition,
        drive_condition,
        defense,
        post_match_comments
    });

    // Reset match data and UI for the next match
    auto_algae_removed = 0;
    auto_coral_l1 = 0;
    auto_coral_l2 = 0;
    auto_coral_l3 = 0;
    auto_coral_l4 = 0;
    teleop_algae_removed = 0;
    algae_scored_net = 0;
    algae_scored_processor = 0;
    leave = false;
    endgame_result = '';
    robot_condition = 'fine';
    drive_condition = 'fine';
    defense = false;
    post_match_comments = '';

    robotConditionSlider.value = 3;
    driveConditionSlider.value = 3;
    defenseCheckbox.checked = false;
    commentsBox.value = '';
    document.getElementById('robotConditionText').textContent = 'Robot Condition: Fine';
    document.getElementById('driveConditionText').textContent = 'Drive Condition: Fine';
    document.getElementById('leaveStatus').textContent = 'Leave: No';
    document.getElementById('defenseStatus').textContent = 'Defense Played: No';
    document.getElementById('commentsStatus').textContent = 'Comments:';

    document.getElementById('newMatchStatus').textContent = 'Data saved for new match. Ready for the next match!';
});

// Export button for CSV file
exportBtn.addEventListener('click', function() {
    let csvContent = "data:text/csv;charset=utf-8,Match Data\n";
    csvContent += "Auto Algae Removed,Auto Coral L1,Auto Coral L2,Auto Coral L3,Auto Coral L4,Teleop Algae Removed,Algae Scored Net,Algae Scored Processor,Leave,Endgame Result,Robot Condition,Drive Condition,Defense Played,Comments\n";

    match_data.forEach((data, index) => {
        const row = Object.values(data).join(",");
        csvContent += `${row}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "match_data.csv");
    document.body.appendChild(link);
    link.click();
});
