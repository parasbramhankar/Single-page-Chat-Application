let GUser1Name = '';
let GUser2Name = '';
let GMessagesUser1 = [];
let GMessagesUser2 = [];

document.getElementById("usernamePopup1").style.display = "flex";

// Hide options menus initially
document.querySelectorAll('.options-menu').forEach(menu => {
  menu.style.display = 'none';
});

function setUsernames(p_intUser) {
  if (p_intUser === 'user1') {
    GUser1Name = document.getElementById("user1Name").value;
    if (GUser1Name) {
      document.getElementById("user1Header").innerText = GUser1Name;
      document.getElementById("usernamePopup1").style.display = "none";
      document.getElementById("usernamePopup2").style.display = "flex";
    }
  } else {
    GUser2Name = document.getElementById("user2Name").value;
    if (GUser2Name) {
      document.getElementById("user2Header").innerText = GUser2Name;
      document.getElementById("usernamePopup2").style.display = "none";
    }
  }
}

function sendMessage(p_intUser) {
  const INPUTFIELD = document.getElementById(`input${p_intUser}`);
  const MESSAGETEXT = INPUTFIELD.value.trim();
  if (MESSAGETEXT === "") return;

  const TIME = new Date().toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
  const MESSAGE = { text: MESSAGETEXT, time: TIME };

  if (p_intUser === 1) {
    GMessagesUser1.push({ ...MESSAGE, isSending: true });
    GMessagesUser2.push({ ...MESSAGE, isSending: false });
  } else {
    GMessagesUser2.push({ ...MESSAGE, isSending: true });
    GMessagesUser1.push({ ...MESSAGE, isSending: false });
  }

  displayMessages();
  INPUTFIELD.value = "";
}

function displayMessages() {
  const CONTENT1 = document.getElementById("content1");
  const CONTENT2 = document.getElementById("content2");

  CONTENT1.innerHTML = '';
  CONTENT2.innerHTML = '';

  if (GMessagesUser1.length === 0) {
    CONTENT1.innerHTML = `<p class="empty-message">No messages yet</p>`;
  } else {
    GMessagesUser1.forEach(msg => {
      const MESSAGEELEMENT = document.createElement("p");
      MESSAGEELEMENT.classList.add("message");

      if (msg.isSending) {
        MESSAGEELEMENT.classList.add("user-sent");
      } else {
        MESSAGEELEMENT.classList.add("user-receive");
      }

      MESSAGEELEMENT.innerHTML = `${msg.text} <span class="timestamp">${msg.time}</span>`;
      CONTENT1.appendChild(MESSAGEELEMENT);
    });
  }

  if (GMessagesUser2.length === 0) {
    CONTENT2.innerHTML = `<p class="empty-message">No messages yet</p>`;
  } else {
    GMessagesUser2.forEach(msg => {
      const MESSAGEELEMENT = document.createElement("p");
      MESSAGEELEMENT.classList.add("message");

      if (msg.isSending) {
        MESSAGEELEMENT.classList.add("user-sent");
      } else {
        MESSAGEELEMENT.classList.add("user-receive");
      }

      MESSAGEELEMENT.innerHTML = `${msg.text} <span class="timestamp">${msg.time}</span>`;
      CONTENT2.appendChild(MESSAGEELEMENT);
    });
  }

  CONTENT1.scrollTop = CONTENT1.scrollHeight;
  CONTENT2.scrollTop = CONTENT2.scrollHeight;
}

// Toggle emoji picker
function showEmojis(p_intUser) {
  const EMOJIPICKER = document.getElementById(`emojiPicker${p_intUser}`);
  EMOJIPICKER.innerHTML = `<button onclick="addEmoji(${p_intUser}, '😊')">😊</button>
                           <button onclick="addEmoji(${p_intUser}, '😂')">😂</button>
                           <button onclick="addEmoji(${p_intUser}, '❤️')">❤️</button>`;
}

// Add selected emoji to the input field
function addEmoji(p_intUser, emoji) {
  const INPUTFIELD = document.getElementById(`input${p_intUser}`);
  INPUTFIELD.value += emoji;
  document.getElementById(`emojiPicker${p_intUser}`).innerHTML = `<button onclick="showEmojis(${p_intUser})">😊</button>`;
}

// Toggle file options (uploading images/documents)
function showFileOptions(p_intUser) {
  const FILEINPUT = document.createElement('input');
  FILEINPUT.type = 'file';
  FILEINPUT.accept = 'image/*, .pdf, .docx';
  FILEINPUT.addEventListener('change', function (e) {
    const FILE = e.target.files[0];
    if (FILE) {
      const MESSAGE = { text: `File: ${FILE.name}`, time: new Date().toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true }) };
      if (p_intUser === 1) {
        GMessagesUser1.push({ ...MESSAGE, isSending: true });
        GMessagesUser2.push({ ...MESSAGE, isSending: false });
      } else {
        GMessagesUser2.push({ ...MESSAGE, isSending: true });
        GMessagesUser1.push({ ...MESSAGE, isSending: false });
      }
      displayMessages();
    }
  });
  FILEINPUT.click();
}

// Function to toggle options dropdown for user 1

function toggleOptionsUser1(p_intUser) {
  const OPTIONMENU = document.getElementById(`optionsMenu${p_intUser}`);
  
  document.querySelectorAll('.options-menu1').forEach(menu => {
    menu.style.display = 'none'; // Close all menus before opening the selected one
  });

  OPTIONMENU.style.display = OPTIONMENU.style.display === "none" ? "block" : "none"; // Toggle visibility
}

//.for user 2
function toggleOptionsUser2(p_intUser) {
  const OPTIONMENU = document.getElementById(`optionsMenu${p_intUser}`);
  
  document.querySelectorAll('.options-menu2').forEach(menu => {
    menu.style.display = 'none'; // Close all menus before opening the selected one
  });

  OPTIONMENU.style.display = OPTIONMENU.style.display === "none" ? "block" : "none"; // Toggle visibility
}


// Function to clear chat
function clearChat(p_intUser) {
  if (p_intUser === 1) {
    GMessagesUser1 = [];
  } else {
    GMessagesUser2 = [];
  }
  displayMessages();
  const OPTIONMENU = document.getElementById(`optionsMenu${p_intUser}`);
  OPTIONMENU.style.display = "none"; // Close the options menu
}

// Function to change profile picture
function changeProfilePicture(p_intUser) {
  const FILEINPUT = document.createElement('input');
  FILEINPUT.type = 'file';
  FILEINPUT.accept = 'image/*';
  FILEINPUT.addEventListener('change', function (e) {
    const FILE = e.target.files[0];
    if (FILE) {
      const READER = new FileReader();
      READER.onload = function (event) {
        const PROFILEPICELEMENT = document.getElementById(p_intUser === 1 ? "user1ProfilePic" : "user2ProfilePic");
        PROFILEPICELEMENT.src = event.target.result;  // Set the profile picture
      };
      READER.readAsDataURL(FILE);
    }
  });
  FILEINPUT.click();  // Trigger file input dialog
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
  const OPTIONMENUS = document.querySelectorAll('.options-menu');
  const OPTIONSBUTTONS = document.querySelectorAll('.options');

  OPTIONMENUS.forEach(menu => {
    if (!menu.contains(event.target)) {
      let LIsOptionsButtonClicked = false;
      OPTIONSBUTTONS.forEach(button => {
        if (button.contains(event.target)) {
          LIsOptionsButtonClicked = true;
        }
      });

      if (!LIsOptionsButtonClicked) {
        menu.style.display = 'none';
      }
    }
  });
});
