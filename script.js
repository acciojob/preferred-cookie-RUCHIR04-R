document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const form = document.getElementById("preferences-form");
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  // Function to save preferences to cookies
  function savePreferences(event) {
    event.preventDefault(); // Prevent form submission

    // Get user preferences
    const fontSize = fontSizeInput.value + "px";
    const fontColor = fontColorInput.value;

    // Save preferences to cookies
    document.cookie = `fontsize=${fontSize}; path=/`;
    document.cookie = `fontcolor=${fontColor}; path=/`;

    // Apply preferences immediately
    applyPreferences();
  }

  // Function to apply preferences from cookies
  function applyPreferences() {
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {});

    if (cookies.fontsize) {
      document.documentElement.style.setProperty("--fontsize", cookies.fontsize);
      fontSizeInput.value = parseInt(cookies.fontsize);
    }

    if (cookies.fontcolor) {
      document.documentElement.style.setProperty("--fontcolor", cookies.fontcolor);
      fontColorInput.value = cookies.fontcolor;
    }
  }

  // Event listener for form submission
  form.addEventListener("submit", savePreferences);

  // Apply preferences on page load
  applyPreferences();
});