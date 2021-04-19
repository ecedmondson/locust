function removeNoneTextFromTestsSelected() {
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
    console.log(tests_selected_artificial_list.textContent == "None Selected");
    if(tests_selected_artificial_list.textContent == "None Selected") {
        tests_selected_artificial_list.innerText = "";
    }
}

function addNoneTextToTestsSelected() {
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
    if(tests_selected_artificial_list.children.length == 0) {
        tests_selected_artificial_list.setAttribute("", "None Selected");
    }

}

function createRemoveTestButton(test_value) {
    var button = document.createElement("i");
    button.setAttribute("class", "far fa-times-circle");
    button.setAttribute("id", test_value.concat("_removal"));
    return button;
}

function createDivForSelectedTest(test) {
    var test_div = document.createElement("div");
    test_div.setAttribute("class", "test_selection_artificial_list non-title");
    test_div.setAttribute("id", test.value.concat("_selected"));
    test_div.innerText = test.textContent;
    var removal = createRemoveTestButton(test.value);
    console.log(test);
    console.log(test_div);
    console.log(removal);
    test_div.appendChild(removal);
    console.log(test_div);
    return test_div;
}

function handleClickofAddTestButton() {
    var current_selection = document.getElementById("test_client").value;
    var options = document.getElementById("test_client").options;
    var selected_test = Array.from(options).filter(e => e.value == current_selection)[0];
    removeNoneTextFromTestsSelected();
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
    var appendage = createDivForSelectedTest(selected_test);
    tests_selected_text_area.append(appendage);
}

function handleClickofRemoveTestButton(selection) {
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
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

    if(e.target.getAttribute("class") == "test_selection_artificial_list") {
        console.log(e.parentNode);
        handleClickofRemoveTestButton(e.parentNode);
    }
    // <i class="far fa-times-circle"></i>
}, false);