var Globals = {};
Globals.randomize = true;
Globals.specify = false;

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

function generateLabelElement(for_text, class_text, text_content) {
    var label = document.createElement("label");
    label.setAttribute("for", for_text);
    label.setAttribute("class", class_text);
    label.innerText = text_content;
    return label
}

function generateInputElement(type_text, name_text, id_text, class_text, value_text) {
    var input = document.createElement("input");
    input.setAttribute("type", type_text);
    input.setAttribute("name", name_text);
    input.setAttribute("id", id_text);
    input.setAttribute("class", class_text);
    input.setAttribute("value", value_text);
    return input;
}

function getSpecifyTitleElement() {
    var title = document.createElement("p");
    title.setAttribute("class", "title");
    title.innerText = "Specify Number of Users to Simulate: ";
    return title;
}

function generateTotalNumbersLabel() {
    return generateLabelElement("user_count", "title", "Total Number of Users to Simulate: ");
}

function generateTotalNumbersInput() {
    return generateInputElement("text", "user_count", "user_count", "val test-input", '{{ num_users or ""}}');
}

function removeAllUserNumberInputs(container_element) {
    var children = Array.from(container_element.children);
    console.log(children);
    for(var i = 0; i < children.length; i++) {
        console.log(children.length);
        console.log(i);
        console.log('child');
        var child = children[i];
        console.log(child);
        container_element.removeChild(child);
    }
}

function setTotalUserNumberInputForRandomize() {
    var input_container = document.getElementById("user-num-input-container");
    removeAllUserNumberInputs(input_container);
    return;
    var new_label = generateTotalNumbersLabel();
    var new_input = generateTotalNumbersInput();
    input_container.appendChild(new_label);
    input_container.appendChild(new_input);
}

function getInputsForAllTestsSelected() {
    var tests_selected_container = document.getElementById('tests_selected_text_area');
    var tests_selected = tests_selected_container.children;
    var new_inputs = [getSpecifyTitleElement()];
    for(var i = 0; i < tests_selected.length; i++) {
        var child = tests_selected[i];
        var user_count_text = child.attributes.id.textContent.replace("_selected", "_user_count");
        var label = generateLabelElement(
            user_count_text,
            "title",
            child.innerText,
            );
        
        var input = generateInputElement(
            "test",
            user_count_text,
            user_count_text,
            "val test-input",
            ""
        );
        new_inputs.push(input);
        new_inputs.push(label);
        // <label for="event_details_get_user_count" class="title">Number of 'Event Details GET' Users: </label>
        // <input type="text" name="event_details_get_user_count" id="event_details_get_user_count" class="val test-input" value="{{ num_users or "" }}"/><br>
        // <label for="live_booth_attendee_user_count" class="title">Number of 'Live Booth Attendee' Users: </label>
        // <input type="text" name="live_booth_attendee_user_count" id="live_booth_attendee_user_count" class="val test-input" value="{{ num_users or "" }}"/><br>
    }
    return new_inputs;
}

function setUserNumberInputForSpecify() {
    var input_container = document.getElementById("user-num-input-container");
    removeAllUserNumberInputs(input_container);
    return;
    var new_inputs = getInputsForAllTestsSelected();
    for(var i = 0; i < new_inputs.length; i++) {
        input_container.appendChild(new_inputs[i]);
    }
}

function ifIdAttrIsRemoval(ele) {
    return ele.attributes.id && ele.attributes.id.textContent.includes("_removal");
}

document.addEventListener("click", function(e) {
    if(e.target.getAttribute("id") == "add_test_client_button") {
        handleClickofAddTestButton();
    }

    if(ifIdAttrIsRemoval(e.target)) {
        handleClickofRemoveTestButton(e.target.parentNode);
    }
}, false);

document.getElementById("randomize_user_count").addEventListener("click", function(e) {
    if(e.target.checked && !Globals.randomize) {
        setTotalUserNumberInputForRandomize();
        Globals.randomize = true;
        Globals.specify = false;
    }
}, false)

document.getElementById("specify_user_count").addEventListener("click", function(e) {
    if(e.target.checked && !Globals.specify) {
        setUserNumberInputForSpecify();
        Globals.specify = true;
        Globals.randomize = false;
    }
}, false)
