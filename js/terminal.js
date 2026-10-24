/**
 * Interactive Developer Terminal
 * Features: Command Execution, Autocomplete, History Navigation, Easter Eggs
 */

(function () {
  const terminalInput = document.getElementById("terminal-input");
  const terminalHistory = document.getElementById("terminal-history");
  const terminalBody = document.querySelector(".terminal-body");
  const quickButtons = document.querySelectorAll(".quick-cmd-btn");

  if (!terminalInput || !terminalHistory) return;

  let commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: "List of available commands:\n  <span class='term-cyan'>about</span>        Show bio and summary\n  <span class='term-cyan'>skills</span>       Display core tech stack\n  <span class='term-cyan'>projects</span>     List highlighted engineering projects\n  <span class='term-cyan'>exp</span>          Display career timeline\n  <span class='term-cyan'>contact</span>      Show email, phone & social profiles\n  <span class='term-cyan'>theme &lt;name&gt;</span> Switch theme (obsidian, emerald, violet, light)\n  <span class='term-cyan'>matrix</span>       Run Matrix code rain sequence\n  <span class='term-cyan'>sudo hire-me</span> Recruiter fast-track protocol\n  <span class='term-cyan'>cat resume</span>   Open interactive ATS resume modal\n  <span class='term-cyan'>clear</span>        Clear the terminal display\n  <span class='term-cyan'>date</span>         Display current system time\n  <span class='term-cyan'>whoami</span>       Print current session user",
    
    about: () => {
      const p = window.PORTFOLIO_DATA?.profile;
      return `<span class='term-green'>${p?.name || "Rachit Verma"}</span> — ${p?.title}\n<span class='term-dim'>Status:</span> B.Tech CSE (Data Science) Student\n<span class='term-dim'>Tagline:</span> ${p?.tagline}\n\n${p?.bio}`;
    },

    skills: () => {
      const skills = window.PORTFOLIO_DATA?.skills || [];
      const grouped = {};
      skills.forEach(s => {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push(`${s.name} (<span class='term-cyan'>${s.level}%</span>)`);
      });
      let out = "<span class='term-green'>Core Competencies Matrix:</span>\n";
      for (const cat in grouped) {
        out += `\n[<span class='term-purple'>${cat.toUpperCase()}</span>]\n  ${grouped[cat].join(", ")}`;
      }
      return out;
    },

    projects: () => {
      const projects = window.PORTFOLIO_DATA?.projects || [];
      let out = "<span class='term-green'>Featured Engineering Projects:</span>\n";
      projects.forEach((proj, idx) => {
        out += `\n${idx + 1}. <span class='term-cyan'>${proj.title}</span>\n   <span class='term-dim'>Desc:</span> ${proj.subtitle}\n   <span class='term-dim'>Tech:</span> ${proj.tech.join(", ")}`;
      });
      out += "\n\n💡 Tip: Scroll to the Projects section or click 'Details' on cards for architecture specs!";
      return out;
    },

    exp: () => {
      const exp = window.PORTFOLIO_DATA?.experience || [];
      let out = "<span class='term-green'>Career Timeline:</span>\n";
      exp.forEach(e => {
        out += `\n• <span class='term-purple'>${e.role}</span> @ <span class='term-cyan'>${e.company}</span> (<span class='term-dim'>${e.duration}</span>)\n  ${e.description}`;
      });
      return out;
    },

    contact: () => {
      const p = window.PORTFOLIO_DATA?.profile;
      return `<span class='term-green'>Direct Contact Channels:</span>\n• Email:    <a href='mailto:${p?.email}' class='term-cyan'>${p?.email}</a>\n• Phone:    ${p?.phone}\n• Location: ${p?.location}\n• GitHub:   <a href='${p?.socials?.github}' target='_blank' class='term-cyan'>${p?.socials?.github}</a>\n• LinkedIn: <a href='${p?.socials?.linkedin}' target='_blank' class='term-cyan'>${p?.socials?.linkedin}</a>`;
    },

    date: () => {
      return `Current time: <span class='term-yellow'>${new Date().toLocaleString()}</span>`;
    },

    whoami: () => {
      return "visitor@portfolio [authenticated as guest: developer/recruiter]";
    },

    matrix: () => {
      let matrixLines = "";
      const chars = "01010101XYZABCアイウエオカキクケコサシスセソタチツテト0123456789";
      for (let i = 0; i < 6; i++) {
        let line = "";
        for (let j = 0; j < 40; j++) {
          line += chars[Math.floor(Math.random() * chars.length)];
        }
        matrixLines += `<span class='term-green'>${line}</span>\n`;
      }
      return `${matrixLines}<span class='term-green'>[Matrix stream established. Wake up, Neo...]</span>`;
    },

    "sudo hire-me": () => {
      return `<span class='term-green'>[AUTH GRANTED]</span> Sudo permissions verified.\n<span class='term-yellow'>STATUS: Candidate profile unlocked!</span>\nCandidate is currently: <span class='term-cyan'>${window.PORTFOLIO_DATA?.profile?.status?.text}</span>\n👉 Drop an email to <a href='mailto:${window.PORTFOLIO_DATA?.profile?.email}' class='term-cyan'>${window.PORTFOLIO_DATA?.profile?.email}</a> to schedule an interview!`;
    },

    "cat resume": () => {
      const resumeModal = document.getElementById("resume-modal");
      if (resumeModal) {
        resumeModal.classList.add("open");
        return "<span class='term-green'>Opening interactive ATS resume modal...</span>";
      }
      return "Resume file requested. Click 'Download Resume' in the hero section.";
    }
  };

  function appendOutput(cmd, outputHtml) {
    const cmdBlock = document.createElement("div");
    cmdBlock.className = "terminal-history-item";
    cmdBlock.innerHTML = `
      <div class="terminal-input-row" style="margin-top:0;">
        <span class="terminal-prompt">visitor@rachit-verma:~$</span>
        <span style="color:#ffffff;">${escapeHtml(cmd)}</span>
      </div>
      <div class="terminal-output-line" style="margin-top:0.35rem;">${outputHtml}</div>
    `;
    terminalHistory.appendChild(cmdBlock);
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  function handleCommand(rawCmd) {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    // Add to history
    commandHistory.push(cmd);
    historyIndex = commandHistory.length;

    // Sound effect
    if (window.playUiSound) window.playUiSound("terminal");

    const parts = cmd.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    if (cmd.toLowerCase() === "clear") {
      terminalHistory.innerHTML = "";
      return;
    }

    if (mainCmd === "theme") {
      const themes = ["obsidian", "emerald", "violet", "light"];
      if (themes.includes(arg)) {
        if (window.switchTheme) window.switchTheme(arg);
        appendOutput(cmd, `<span class='term-green'>Switched active theme to: <b>${arg}</b></span>`);
      } else {
        appendOutput(cmd, `<span class='term-yellow'>Unknown theme '${arg}'. Valid choices: obsidian, emerald, violet, light</span>`);
      }
      return;
    }

    // Direct command match or alias
    if (COMMANDS[cmd.toLowerCase()]) {
      const res = typeof COMMANDS[cmd.toLowerCase()] === "function" 
        ? COMMANDS[cmd.toLowerCase()]() 
        : COMMANDS[cmd.toLowerCase()];
      appendOutput(cmd, res);
      return;
    }

    if (COMMANDS[mainCmd]) {
      const res = typeof COMMANDS[mainCmd] === "function" 
        ? COMMANDS[mainCmd]() 
        : COMMANDS[mainCmd];
      appendOutput(cmd, res);
      return;
    }

    // Unknown command
    appendOutput(
      cmd, 
      `<span class='term-dim'>Command not found: </span><span class='term-yellow'>${escapeHtml(cmd)}</span>. Type <span class='term-cyan'>help</span> for available commands.`
    );
  }

  // Keydown listeners for Enter, History, Tab
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = "";
      handleCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || "";
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = terminalInput.value.trim().toLowerCase();
      if (!current) return;
      const allCmds = Object.keys(COMMANDS).concat(["clear", "theme obsidian", "theme emerald", "theme violet", "theme light"]);
      const match = allCmds.find(c => c.startsWith(current));
      if (match) {
        terminalInput.value = match;
      }
    }
  });

  // Quick button clicks
  quickButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });

  // Initial welcome message
  setTimeout(() => {
    appendOutput(
      "welcome", 
      "<span class='term-green'>Portfolio CLI v2.4 initialized.</span> Type <span class='term-cyan'>help</span> or click the buttons below to explore!"
    );
  }, 400);

  // Expose global execution
  window.runTerminalCommand = handleCommand;
})();
