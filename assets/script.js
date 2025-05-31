const toast = document.getElementById("toast");
const output = document.getElementById("output");

// Apply auto dark mode based on system preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add("dark");
}

document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

function showToast(message) {
  toast.innerText = message;
  toast.style.display = "block";
  setTimeout(() => toast.style.display = "none", 3000);
}

function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file || file.type !== "text/plain") {
    showToast("Please select a valid .txt file");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById("manualInput").value = e.target.result;
    showToast("File loaded successfully.");
  };
  reader.onerror = function () {
    showToast("Failed to read file.");
  };
  reader.readAsText(file);
}

function processText() {
  const char = document.getElementById("character").value;
  const replacement = document.getElementById("replacement").value;
  let content = document.getElementById("manualInput").value;

  if (!char || char.length !== 1) {
    showToast("Please enter a single character.");
    return;
  }

  const lines = content.split(/\r?\n/).map(line => {
    const index = line.indexOf(char);
    if (index === -1) return line;
    return replacement ? line.substring(0, index) + replacement : line.substring(0, index);
  });

  output.value = lines.join("\n");
}

function clearAll() {
  document.getElementById("character").value = '';
  document.getElementById("replacement").value = '';
  document.getElementById("manualInput").value = '';
  output.value = '';
}

function copyOutput() {
  if (!output.value.trim()) return showToast("Nothing to copy!");
  navigator.clipboard.writeText(output.value);
  showToast("Output copied to clipboard!");
}
