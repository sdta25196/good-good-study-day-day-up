function run() {
  document.getElementById("document")
    .addEventListener("change", handleFileSelect, false);

  function handleFileSelect(event) {

    if (event.target.files[0].type === "text/plain") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        document.getElementById("output").innerText = ev.target.result;
      }
      reader.readAsText(file)
    } else {
      readFileInputEventAsArrayBuffer(event, function (arrayBuffer) {
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then(displayResult)
          .done();
      });
    }
  }

  function displayResult(result) {
    document.getElementById("output").innerHTML = result.value;

    var messageHtml = result.messages.map(function (message) {
      return '<li class="' + message.type + '">' + escapeHtml(message.message) + "</li>";
    }).join("");

    document.getElementById("messages").innerHTML = "<ul>" + messageHtml + "</ul>";
  }

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};

run()