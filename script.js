const levels = {
  1: {
    title: "Level 1 - 로그인 우회",
    desc: "목표: admin 계정으로 로그인 우회",
    hint: "' OR '1'='1 를 사용해보세요"
  },
  2: {
    title: "Level 2 - UNION 공격",
    desc: "목표: 사용자 데이터를 추출",
    hint: "UNION SELECT를 활용해보세요"
  },
  3: {
    title: "Level 3 - Blind Injection",
    desc: "목표: 참/거짓 기반으로 정보 추출",
    hint: "AND 1=1 / AND 1=2 비교"
  }
};

document.getElementById("level").addEventListener("change", updateLevel);

function updateLevel() {
  const level = document.getElementById("level").value;
  document.getElementById("level-title").innerText = levels[level].title;
  document.getElementById("description").innerText = levels[level].desc;
  document.getElementById("hint").innerText = levels[level].hint;
}

function runAttack() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const level = document.getElementById("level").value;

  let query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  let result = "";

  if (level == 1) {
    if (password.includes("' OR '1'='1")) {
      result = "✅ 로그인 성공 (우회됨)";
    } else {
      result = "❌ 로그인 실패";
    }
  }

  if (level == 2) {
    if (username.toUpperCase().includes("UNION")) {
      result = "✅ 데이터 추출 성공: admin, password123";
    } else {
      result = "❌ 실패";
    }
  }

  if (level == 3) {
    if (username.includes("1=1")) {
      result = "✅ TRUE 응답 (조건 참)";
    } else if (username.includes("1=2")) {
      result = "❌ FALSE 응답 (조건 거짓)";
    } else {
      result = "❓ 조건 확인 불가";
    }
  }

  document.getElementById("query").innerText = query;
  document.getElementById("result").innerText = result;
}