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
    return generateLabelElement("user_count", "title specify-test", "Total Number of Users to Simulate: ");
}

function generateTotalNumbersInput() {
    return generateInputElement("text", "user_count", "user_count", "val test-input", "");
}

function removeAllUserNumberInputs(container_element) {
    var children = container_element.children;
    var child_len = children.length - 1;
    for(var i = child_len; i >= 0; i--) {
        var child = children[i];
        container_element.removeChild(child);
    }
}

function setTotalUserNumberInputForRandomize() {
    var input_container = document.getElementById("user-num-input-container");
    removeAllUserNumberInputs(input_container);
    var new_label = generateTotalNumbersLabel();
    var new_input = generateTotalNumbersInput();
    input_container.appendChild(new_label);
    input_container.appendChild(new_input);
}

function createInputsForAllTestsSelected() {
    var tests_selected_container = document.getElementById('tests_selected_text_area');
    var tests_selected = tests_selected_container.children;
    var tests_selected_len = tests_selected.length;
    var new_inputs = [getSpecifyTitleElement()];
    for(var i = 0; i < tests_selected_len; i++) {
        var child = tests_selected[i];
        var user_count_text = child.attributes.id.textContent.replace("_selected", "_user_count");
        var label = generateLabelElement(
            user_count_text,
            "title specify-test",
            child.innerText,
            );
        new_inputs.push(label);
        var input = generateInputElement(
            "test",
            user_count_text,
            user_count_text,
            "val test-input",
            ""
        );
        new_inputs.push(input);
    }
    if(new_inputs.length == 1) {
        var no_sel = document.createElement("div");
        no_sel.innerText = "No tests selected :(";
        new_inputs.push(no_sel);
    }
    return new_inputs;
}

function setUserNumberInputForSpecify() {
    var input_container = document.getElementById("user-num-input-container");
    removeAllUserNumberInputs(input_container);
    var new_inputs = createInputsForAllTestsSelected();
    var new_inputs_len = new_inputs.length
    for(var i = 0; i < new_inputs_len; i++) {
        input_container.appendChild(new_inputs[i]);
    }
}

function ifIdAttrIsRemoval(ele) {
    return ele.attributes.id && ele.attributes.id.textContent.includes("_removal");
}

function addTestToSpecifyGroup() {
    var current_selection = document.getElementById("test_client").value;
    var options = document.getElementById("test_client").options;
    var selected_test = Array.from(options).filter(e => e.value == current_selection)[0];
    var input_container = document.getElementById("user-num-input-container");
    var user_count_text = child.attributes.value.textContent.concat("_user_count");
    var label = generateLabelElement(
        user_count_text,
        "title specify-test",
        selected_test.innerText,
        );
    current_selection.appendChild(label);
    var input = generateInputElement(
        "test",
        user_count_text,
        user_count_text,
        "val test-input",
        ""
    );
    current_selection.appendChild(input);
}

function ifIsInputElement(child, original_ele) {
    var name_is = child.attributes.name;
    var child_text = child.attributes.name.textContent.replace("_user_count", "");
    var original_text = original_ele.attributes.id.textContent.replace("_selected", "");
    var are_equal = child_text == original_text;
    return name_is && are_equal;
}


function removeTestFromSpecifyGroup(ele) {
    var input_container = document.getElementById("user-num-input-container");
    var children = input_container.children;
    var removals = [];
    for(var i = 0; i < children.length; i++) {
        // Identifies the label element
        if(children[i].textContent == ele.textContent) {
            removals.push(children[i]);
        }
        // Identifies the input element
        console.log(children[i]);
        console.log(ele);
        if(children[i].name.textContent.replace('_user_count', "") == ele.attributes.id.textContent.replace("_selected"), "") {
            removals.push(chilren[i]);
        }
    }

}

document.addEventListener("click", function(e) {
    if(e.target.getAttribute("id") == "add_test_client_button") {
        if(Globals.specify) {
            addTestToSpecifyGroup();
        }
        handleClickofAddTestButton();
    }

    if(ifIdAttrIsRemoval(e.target)) {
        if(Globals.specify) {
            removeTestFromSpecifyGroup(e.target.parentNode);
        }
        handleClickofRemoveTestButton(e.target.parentNode);
    }
}, false);

document.getElementById("randomize_user_count").addEventListener("click", function(e) {
    if(e.target.checked && Globals.specify) {
        setTotalUserNumberInputForRandomize();
        Globals.randomize = true;
        Globals.specify = false;
    }
}, false)

document.getElementById("specify_user_count").addEventListener("click", function(e) {
    if(e.target.checked && Globals.randomize) {
        setUserNumberInputForSpecify();
        Globals.specify = true;
        Globals.randomize = false;
    }
}, false)
