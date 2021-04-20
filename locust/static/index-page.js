function removeNoneTextFromTestsSelected() {
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
    if(tests_selected_artificial_list.textContent == "None Selected") {
        tests_selected_artificial_list.innerText = "";
    }
}

function addNoneTextToTestsSelected() {
    var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
    if(tests_selected_artificial_list.children.length == 0) {
        tests_selected_artificial_list.innerText = "None Selected";
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
    test_div.setAttribute("class", "test_selection_artificial_list");
    test_div.setAttribute("id", test.value.concat("_selected"));
    test_div.innerText = test.textContent.concat(" ");
    var removal = createRemoveTestButton(test.value);
    test_div.appendChild(removal);
    return test_div;
}

function istestClientAlreadyInArtificialList(test_name) {
    var tests_already_selected = document.getElementById('tests_selected_text_area').children;
    var test_clicked_found_in_list = Array.from(tests_already_selected).filter(e => e.textContent.includes(test_name));
    return test_clicked_found_in_list.length == 0;
}

function handleClickofAddTestButton() {
    var current_selection = document.getElementById("test_client").value;
    var options = document.getElementById("test_client").options;
    var selected_test = Array.from(options).filter(e => e.value == current_selection)[0];
    var test_selection_status = istestClientAlreadyInArtificialList(selected_test.textContent);
    if (test_selection_status) {
        removeNoneTextFromTestsSelected();
        var tests_selected_artificial_list = document.getElementById("tests_selected_text_area");
        var appendage = createDivForSelectedTest(selected_test);
        tests_selected_text_area.append(appendage);
    }
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

    if(e.target.getAttribute("id").includes("_removal")) {
        handleClickofRemoveTestButton(e.target.parentNode);
    }
}, false);

document.getElementById("randomize_user_count").addEventListener("click", function(e) {
    console.log("randomize click");
    console.log(e);
    console.log(e.checked);
}, false)

document.getElementById("specify_user_count").addEventListener("click", function(e) {
    console.log('specify click');
    console.log(e);
    console.log(e.checked);
}, false)

document.getElementById("randomize_user_count").addEventListener("load", function(e) {
    console.log('randomize load');
    console.log(e);
    console.log(e.checked);
}, false)

document.getElementById("specify_user_count").addEventListener("load", function(e) {
    console.log('specify load');
    console.log(e);
    console.log(e.checked);
}, false)