function change_yandere_settings_Number(obj){
    document.getElementById(obj.name).style.setProperty('--rate', `${obj.value * 20}%`);
}

function change_yandere_name(obj){
    document.getElementsByClassName("yandere-name")[0].textContent = obj.value;
}

function change_yandere_main_picture(obj){
    let filepath = obj.files[0];
    console.log(filepath)
    let reader = new FileReader();
    reader.onloadend = () => {
        let img = document.getElementsByClassName("yandere-main")[0];
        console.log(reader)
        img.src = reader.result;
    }
    reader.readAsDataURL(filepath);
}

function change_yandere_hyoka_comment(obj){
    let insert_hyoka_comment = obj.value.replace("\n", "<br>");
    document.getElementsByClassName("hyoka-comment")[0].firstElementChild.innerHTML = insert_hyoka_comment;
}

function on_mouse_textarea_of_main_sentence(obj){
    document.getElementsByClassName("fix-area")[0].style.webkitTransform = "translateY(11vh)";
}

function on_click_fix_area(obj){
    let settings = document.getElementsByClassName("settings_down");
    for(let element of settings){
        element.classList.remove("settings_down");
    }
    obj.classList.add("settings_down")
}

function insert_script_at_cursor_in_textarea(word){
    let textarea = document.getElementsByName("yandere-description")[0];
    if(textarea !== textarea.ownerDocument.activeElement){
        textarea.value = textarea.value + word;
        return false;
    }
    let sentence = textarea.value;
    let pos = textarea.selectionStart;
    let before = sentence.substr(0, pos);
    let after = sentence.substr(pos, sentence.length);
    textarea.value = before + word + after;
}