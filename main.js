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

let hiddenChat = document.querySelector('#rightContainer');

//  --------------------

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

    localStorage.setItem('id', id_user);

    console.log('Inside connection function ' + localStorage.getItem('id'));

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
                    console.log(response.relations);
                    document.location.href = './src/html/chat.html';
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
    });
};

const getId = () => {
    let idUser;

    idUser = localStorage.getItem('id');

    console.log('Inside getId function' + idUser);

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
                getFriends(idUser);
                hiddenChat.setAttribute('style', 'visibility : hidden');
            }
        } catch (error) {
            console.error('Error ' + this.status);
            alert('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API + '?information&identifiant=' + encodeURIComponent(idUser),
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
                    for (let i = 0; i < response.relations.length; i++) {
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
                        newElement_div.setAttribute(
                            'onclick',
                            'showClickedPannel(this.id)'
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
    let idUser, emailValue;
    idUser = localStorage.getItem('id');
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
            encodeURIComponent(idUser) +
            '&mail=' +
            encodeURIComponent(emailValue),
        true
    );
    xhr.send(null);

    return false;
};

const removeFriend = (id_relation) => {
    let idUser = localStorage.getItem('id');

    console.log('id of user ' + idUser);
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
        API + '?delier&identifiant=' + idUser + '&relation=' + id_relation,
        true
    );
    xhr.send(null);

    return false;
};

const showClickedPannel = (name) => {
    let idUser;

    idUser = localStorage.getItem('id');

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
                        
                        localStorage.setItem('idRelation', response.relations[i].relation);
                    }
                }
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API + '?relations&identifiant=' + encodeURIComponent(idUser),
        true
    );
    xhr.send(null);

    return false;
};

const closePannel = () => {
    hiddenChat.setAttribute('style', 'visibility : hidden');
};

const showMessage = (id) => {
    let idUser, id_relation;

    // id_relation = localStorage.getItem('idRelation');
    // console.log('id relation from localStorage ' + id_relation);
    // console.log('id relation from parameter ' + idRelation);

    idUser = localStorage.getItem('id');

    let chatPannel = document.querySelector('#discussionPanel_');

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status) {
                let response = JSON.parse(this.responseText);
                console.log(response);

                for (let i = 0; i < response.messages.length; i++) {
                    console.log(response.messages[i].message);

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
                    ).innerText = response.messages[i].message;
                    rightBullMessage_p.className = 'text-white pt-3';
                    // right bull discussion - receiver -------------
                }
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?lire&identifiant=' +
            encodeURIComponent(idUser) +
            '&relation=' +
            encodeURIComponent(id),
        true
    );

    xhr.send(null);

    return false;
};

const sendMessage = () => {
    let idUser, idRelation;

    idUser = localStorage.getItem('id');

    idRelation = localStorage.getItem('idRelation');

    console.log('id relation from send message ' + idRelation);

    let chatPannel = document.querySelector('#discussionPanel_');
    let inputValue = document.querySelector('#writeToInput').value;

    xhr.onreadystatechange = function () {
        try {
            if (this.readyState == 4 && this.status) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                if (inputValue.length > 0) {
                    document.querySelector('#writeToInput').value = '';
                }

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
                ).innerText = inputValue;
                leftBullMessage_p.className = 'text-white pt-3';
                // left bull discussion - sender --------------
            }
        } catch (error) {
            console.error('An error has occurred');
        }
    };

    xhr.open(
        'GET',
        API +
            '?ecrire&identifiant=' +
            encodeURIComponent(idUser) +
            '&relation=' +
            encodeURIComponent(idRelation) +
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
