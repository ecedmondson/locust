function removeNoneTextFromTestsSelected() {
    var tests_selected_artificial_list = document.getElementById('tests_selected_text_area');
    if(tests_selected_artificial_list.textContent == 'None Selected') {
        tests_selected_artificial_list.setAttribute('textContent', '');
    }
}

function addNoneTextToTestsSelected() {
    var tests_selected_artificial_list = document.getElementById('tests_selected_text_area');
    if(tests_selected_artificial_list.children.length == 0) {
        tests_selected_artificial_list.setAttribute('', 'None Selected');
    }

}

function createRemoveTestButton(test_value) {
    var button = document.createElement('i');
    button.setAttribute("class", "far fa-times-circle");
    button.setAttribute('id', test_value.concat("_removal"))
    return button;
}

function createDivForSelectedTest(test) {
    var test = document.createElement('div');
    test.setAttribute('class', "test_selection_artificial_list");
    test.setAttribute("id", test.value.concat("_selected"))
    test.innerText = test.textContent;
    test.appendChild(createRemoveTestButton(test.value));
    return test;
}

function handleClickofAddTestButton() {
    var current_selection = document.getElementById('test_client').value;
    var options = document.getElementById('test_client').options;
    var selected_test = Array.from(options).filter(e => e.value == current_selection)[0];
    removeNoneTextFromTestsSelected();
    var tests_selected_artificial_list = document.getElementById('tests_selected_text_area');
    tests_selected_text_area.append(addSelectedTestToList(selected_test));
}

function handleClickofRemoveTestButton(selection) {
    var tests_selected_artificial_list = document.getElementById('tests_selected_text_area');
    tests_selected_artificial_list.removeChild(selection);
    addNoneTextToTestsSelected();  
}



document.addEventListener("click", function(e) {
    // if(e.target.getAttribute("id") == "specify_user_count") {
    //   #selected_users = document.getElementsByTagName()
    // }
    if(e.target.getAttribute("id") == "add_test_client_button") {
        handleClickofAddTestButton();
    }

    if(e.target.getAttribute('class') == "test_selection_artificial_list") {
        console.log(e.parentNode);
        handleClickofRemoveTestButton(e.parentNode);
    }
    // <i class="far fa-times-circle"></i>
}, false);