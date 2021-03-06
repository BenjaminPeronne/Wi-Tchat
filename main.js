/**
 * @author Benjamin Peronne
 * @email contact@benjaminperonne.fr
 * @create date 2021-02-13 20:08:18
 * @modify date 2021-02-13 20:08:18
 * @desc [Wi_Tchat]
 */

//  --------------------

const API = 'https://trankillprojets.fr/wal/wal.php';
const xhr = new XMLHttpRequest();

let user = { id: 0, name: "", mail: "", relations: [] };
user.id = getCookie('idOfUser');
user.name = getCookie('identite');
user.mail = getCookie('mail');
user.relations = getCookie('idOfRelation');

let hiddenChat = document.querySelector('#rightContainer');
let hiddenContact = document.querySelector('#leftContainer_');

//  --------------------

console.log(user);

const logOut = () => {
    document.location.href = '../../index.html  ';
    document.cookie =
        'idOfUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

const signUp = () => {
    // Prevent reloading the page
    document.querySelector('#signup').addEventListener('submit', function (e) {
        e.preventDefault();

        xhr.onreadystatechange = function () {
            // if done and everything is ok
            try {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.responseText);
                    alert(response.etat.message);
                    console.log(response);
                    document.location.href = '../../index.html';
                }
            } catch (error) {
                alert('An error has occurred...');
            }
        };
        pseudo = document.querySelector('#userName').value;
        email = document.qpseudo = document.querySelector('#email').value;
        console.log(pseudo);
        console.log(email);

        xhr.open(
            'GET',
            API +
                '?inscription&identite=' +
                encodeURIComponent(pseudo) +
                '&mail=' +
                encodeURIComponent(email),
            true
        );
        xhr.send(null);

        return false;
    });
};

const connection = () => {
    let id_user = document.querySelector('#userName').value;

    setCookie('idOfUser', id_user, 360);
    console.log('Try to save into a cookie :' + getCookie('idOfUser'));
    // Prevent reloading the page
    document.querySelector('#login').addEventListener('submit', function (e) {
        e.preventDefault();

        // let id_user = document.querySelector('#userName').value;

        // if done and everything is ok
        xhr.onreadystatechange = function () {
            try {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.responseText);                    
                    console.log(response);                    
                    document.location.href = './src/html/chat.html';
                }
            } catch (error) {
                console.error('An error has occurred');
            }
        };

        xhr.open(
            'GET',
            API +
                '?activation=' +
                encodeURIComponent(getCookie('idOfUser')),
            true
        );
        xhr.send(null);

        return false;
    });
};

const getInformation = () => {
    console.log('Inside getId function' + getCookie('idOfUser'));

    xhr.onreadystatechange = function () {
        try {
            // if done and everything is ok
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response.identite + ' ' + response.mail);
                const newElement_1 = document.createElement('h4');
                const newElement_2 = document.createElement('p');
                let element = document.querySelector('#username');
                element.appendChild(newElement_1).innerText = response.identite;
                newElement_1.classList.add('nav-link');
                newElement_1.classList.add('username');
                element.appendChild(newElement_2).innerText = response.mail;
                newElement_2.classList.add('mail');
                getFriends(getCookie('idOfUser'));
                setCookie('identite', response.identite, 360);
                setCookie('mail', response.mail, 360);
                hiddenChat.setAttribute('style', 'visibility : hidden');
            }
        } catch (error) {
            console.error('Error ' + this.status);
            alert('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?information&identifiant=' +
            encodeURIComponent(getCookie('idOfUser')),
        true
    );
    xhr.send(null);

    return false;
};

const getFriends = (id_user) => {

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response.relations);
                console.log(user);

                let containerRight = document.querySelector('#rightContainer');
                containerRight.hidden = false;

                if (response.relations.length == 0) {
                    const newElement_div = document.createElement('div');
                    const newElement_p = document.createElement('p');

                    let element = document.querySelector('#friendList');

                    element.appendChild(newElement_div);
                    newElement_div.classList.add('leftContainerLine');
                    newElement_div.classList.add('mt-2');
                    newElement_div.classList.add('px-5');
                    newElement_div.classList.add('pt-1');

                    newElement_div.appendChild(newElement_p).innerText =
                        'No Friends ;(';
                    newElement_p.classList.add('text-white');
                    newElement_p.classList.add('pt-2');
                } else {
                    // for (let i = 0; i < response.relations.length; i++) {
                    for (let i in response.relations) {
                        if (!user.relations[response.relations[i].relation]) {
                            // document.cookie =
                            // 'idOfRelation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                            showMessage(user.relations);
                        }
                        const newElement_div = document.createElement('div');
                        const newElement_div_left = document.createElement(
                            'div'
                        );
                        const newElement_div_right = document.createElement(
                            'div'
                        );
                        const newElement_p = document.createElement('p');
                        const newElement_a = document.createElement('a');
                        const newElement_line = document.createElement('div');
                        const newElement_span = document.createElement('span');

                        let element = document.querySelector('#friendList');

                        element.appendChild(newElement_div);
                        newElement_div.classList.add('leftContainerLine');
                        newElement_div.classList.add('mt-2');
                        newElement_div.classList.add('px-5');
                        newElement_div.classList.add('pt-1');
                        newElement_div.classList.add('globalFriendList');
                        newElement_div.classList.add('pointer');
                        newElement_div.setAttribute(
                            'id',
                            response.relations[i].relation
                        );

                        // Left ---------------------------------------------------
                        newElement_div.appendChild(newElement_div_left);
                        newElement_div_left.classList.add('friendNameLeft');

                        newElement_div_left.appendChild(
                            newElement_p
                        ).innerText = response.relations[i].identite;
                        newElement_p.classList.add('text-white');
                        newElement_p.classList.add('pt-2');
                        newElement_p.setAttribute(
                            'id',
                            response.relations[i].relation
                        );
                        newElement_p.setAttribute(
                            'onclick',
                            'showClickedPannel(this.id)'
                        );
                        // Left ---------------------------------------------------

                        // Right ---------------------------------------------------
                        newElement_div.appendChild(newElement_div_right);
                        newElement_div_right.classList.add(
                            'iconRemoveFriendRight'
                        );

                        newElement_div_right.appendChild(newElement_a);
                        newElement_a.setAttribute(
                            'id',
                            response.relations[i].relation
                        );
                        newElement_a.setAttribute(
                            'onclick',
                            'removeFriend(this.id)'
                        );
                        newElement_a.classList.add('pointer');

                        newElement_a.appendChild(newElement_span).innerText =
                            'delete_forever';
                        newElement_span.classList.add('material-icons');
                        newElement_span.classList.add('text-white');
                        newElement_span.classList.add('left-add');
                        newElement_span.classList.add('pt-2');
                        // Right ---------------------------------------------------

                        element.appendChild(newElement_line);
                        newElement_line.classList.add('line');
                        newElement_line.classList.add('mt-2');
                    }
                }
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API + '?relations&identifiant=' + encodeURIComponent(id_user),
        true
    );
    xhr.send(null);

    return false;
};

const keyAction = () => {
    let input = document.querySelector('#getMailFriend');

    input.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            let emailValue = document.querySelector('#getMailFriend').value;
            event.preventDefault();
            console.log('value from input : ' + emailValue);
            document.querySelector('#sendMail').onclick();
            addFriend(emailValue);
        }
    });
};
keyAction();

const addFriend = (returnEmail) => {
    // let idUser, emailValue;
    // idUser = localStorage.getItem('id');

    emailValue = returnEmail;
    emailValue = document.querySelector('#getMailFriend').value;

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                alert(response.etat.message);
                location.reload();
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };
    xhr.open(
        'GET',
        API +
            '?lier&identifiant=' +
            encodeURIComponent(getCookie('idOfUser')) +
            '&mail=' +
            encodeURIComponent(emailValue),
        true
    );
    xhr.send(null);

    return false;
};

const removeFriend = (id_relation) => {
    // let idUser = localStorage.getItem('id');

    console.log('id of user ' + getCookie('idOfUser'));
    console.log('id of relation ' + id_relation);

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                if (id_relation != null) {
                    alert(response.etat.message);
                    location.reload();
                }
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };
    xhr.open(
        'GET',
        API +
            '?delier&identifiant=' +
            getCookie('idOfUser') +
            '&relation=' +
            id_relation,
        true
    );
    xhr.send(null);

    return false;
};

const showClickedPannel = (name) => {
    hiddenChat.setAttribute('style', 'visibility : visible');

    let nameOfFriend;
    nameOfFriend = name;

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log('name of friend ' + nameOfFriend);
                document.querySelector('.friendName_').innerHTML = nameOfFriend;
                for (let i = 0; i < response.relations.length; i++) {
                    if (response.relations[i].relation == nameOfFriend) {
                        document.querySelector('.friendName_').innerHTML =
                            response.relations[i].identite;
                        showMessage(response.relations[i].relation);
                        if (window.matchMedia("(max-width: 500px)").matches) {
                            hiddenContact.hidden = true;
                            hiddenChat.hidden = false;

                            let inputLabel = document.querySelector('#inputLabel');
                            let send_ = document.querySelector('#send_');
                            console.log('Resize at height');
                            inputLabel.classList.remove('col-11');
                            send_.classList.remove('col-1');

                            inputLabel.classList.add('col-9');
                            send_.classList.add('col-1');
                        }


                        // localStorage.setItem(
                        //     'idRelation',
                        //     response.relations[i].relation
                        // );

                        setCookie(
                            'idOfRelation',
                            response.relations[i].relation,
                            360
                        );
                    }
                }
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?relations&identifiant=' +
            encodeURIComponent(getCookie('idOfUser')),
        true
    );
    xhr.send(null);

    return false;
};

const closePannel = () => {
    hiddenChat.setAttribute('style', 'visibility : hidden');
    $("#discussion").empty();
    if (window.matchMedia("(max-width: 414px)").matches) {
        hiddenContact.hidden = false;
        hiddenChat.hidden = true;
    }

};

const createMessageToShow = (responseMessage) => {
    let chatPannel = document.querySelector('#discussionPanel_');

    // right bull discussion - receiver --------------
    const rightDivElement = document.createElement('div');
    chatPannel.appendChild(rightDivElement);
    rightDivElement.className = 'd-flex flex-row m-lg-3';

    const rightBullMessage_div = document.createElement('div');
    rightDivElement.appendChild(rightBullMessage_div);
    rightBullMessage_div.className =
        'receiver mt-1 clearfix px-2 mx-3';

    const rightBullMessage_p = document.createElement('p');
    rightBullMessage_div.appendChild(
        rightBullMessage_p
    ).innerText = responseMessage;
    rightBullMessage_p.className = 'text-white pt-3';
    // right bull discussion - receiver -------------
}

const showMessage = (id) => {
    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);

                // for (let i of response.messages) {
                //     console.log(response.messages[i].message);
                //     createMessageToShow(response.messages[i].message);
                // }
               
                for (let i = 0; i < response.messages.length; i++) {
                    console.log(response.messages[i].message);
                    createMessageToShow(response.messages[i].message);
                }
                showMessage(id);
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?lire&identifiant=' +
            encodeURIComponent(getCookie('idOfUser')) +
            '&relation=' +
            encodeURIComponent(id),
        true
    );

    xhr.send(null);

    return false;
};

const createMessageToSend = (text) => {
    let chatPannel = document.querySelector('#discussionPanel_');

    // left bull discussion - sender --------------
    const leftDivElement = document.createElement('div');
    chatPannel.appendChild(leftDivElement);
    leftDivElement.className = 'd-flex flex-row-reverse m-lg-3';

    const leftBullMessage_div = document.createElement('div');
    leftDivElement.appendChild(leftBullMessage_div);
    leftBullMessage_div.className =
        'sender mt-2 clearfix px-2 mx-3';

    const leftBullMessage_p = document.createElement('p');
    leftBullMessage_div.appendChild(
        leftBullMessage_p
    ).innerText = text;
    leftBullMessage_p.className = 'text-white pt-3';
    // left bull discussion - sender --------------
}

const sendMessage = () => {
    console.log('id relation from send message ' + getCookie('idOfRelation'));

    let inputValue = document.querySelector('#writeToInput').value;
    
    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                if (inputValue.length > 0) {
                    document.querySelector('#writeToInput').value = '';
                }
                createMessageToSend(inputValue);                
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?ecrire&identifiant=' +
            encodeURIComponent(getCookie('idOfUser')) +
            '&relation=' +
            encodeURIComponent(getCookie('idOfRelation')) +
            '&message=' +
            encodeURIComponent(inputValue),
        true
    );

    xhr.send(null);

    return false;
};

const keyActionToSend = () => {
    let input = document.querySelector('#writeToInput');

    input.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            let inputValue = document.querySelector('#writeToInput').value;
            event.preventDefault();
            sendMessage(inputValue);
            // window.setInterval(function () {
            //     var elem = document.querySelector('#discussionPanel_');
            //     elem.scrollTop = elem.scrollHeight;
            // }, 1000);

        }
    });
};
keyActionToSend();