// script.js
document.getElementById("promptForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const task = document.getElementById("task").value.trim();
  const expertise = document.getElementById("expertise").value;
  const tools = document.getElementById("tools").value.trim();
  const notes = document.getElementById("notes").value.trim();

  const tone = document.getElementById("tone").value;
  const format = document.getElementById("format").value;
  const length = document.getElementById("length").value;

  // Get selected mode (do the task or guide)
  const mode = document.querySelector('input[name="mode"]:checked').value;

  let prompt = `Act as a subject matter expert in this domain. Your task is to ${task}.`;
  
    // Insert mode-specific instruction
  if (mode === "guide") {
    prompt += `\n\nRather than doing the task directly, provide a clear, step-by-step guide or process the user can follow to complete the task themselves.`;
  } else {
    prompt += `\n\nComplete the task as if you were doing it for the user.`;
  }

  prompt += `\n\nThe intended audience has a ${expertise} level of expertise.`;

  if (tools) {
    prompt += ` Use or reference the following tools and technologies where appropriate: ${tools}.`;
  }

  if (notes) {
    prompt += `\n\nAdditional context: ${notes}`;
  }

  prompt += `\n\nRespond in a ${tone || "tone and style appropriate to the task and audience"}.`;
  prompt += ` Format the output as ${format || "you find most suitable for the task"}.`;
  prompt += ` Aim for a length that is ${length || "appropriate to fully cover the topic without unnecessary detail"}.`;

  prompt += `\n\nProvide a clear, detailed, and high-quality response suitable for the given audience and task.`;

  document.getElementById("output").value = prompt;
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.select();
  output.setSelectionRange(0, 99999); // Mobile compatibility

  try {
    document.execCommand("copy");
    alert("Prompt copied to clipboard!");
  } catch (err) {
    alert("Failed to copy prompt.");
  }

  output.setSelectionRange(0, 0); // Deselect
});

