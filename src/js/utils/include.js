export async function includeHTML() {
  async function processDataIncludes() {
    const elements = document.querySelectorAll("[data-include]");
    if (elements.length === 0) return false;

    for (const element of elements) {
      const file = element.getAttribute("data-include");
      try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        const html = await response.text();

        const temp = document.createElement("div");
        temp.innerHTML = html;
        element.replaceWith(...temp.childNodes); // keep nested data-include working
      } catch (err) {
        console.error(`Error including ${file}:`, err);
        element.innerHTML = `<div class="error">Failed to load ${file}</div>`;
      }
    }

    return true;
  }

  // Keep running until all nested includes are processed
  while (await processDataIncludes()) {}
}

// export async function includeHTML() {
//   // console.log("Starting includeHTML function");

//   // Handle elements with data-include attribute
//   const dataIncludeElements = document.querySelectorAll("[data-include]");
//   // console.log("Found data-include elements:", dataIncludeElements.length);
//   console.log(
//     "Data-include elements:",
//     Array.from(dataIncludeElements).map((el) => ({
//       element: el,
//       file: el.getAttribute("data-include"),
//     }))
//   );

//   for (const element of dataIncludeElements) {
//     const file = element.getAttribute("data-include");
//     // console.log("Processing data-include file:", file);
//     try {
//       const response = await fetch(file);
//       // console.log("Response status:", response.status);
//       if (!response.ok) throw new Error(`Failed to load ${file}`);
//       const html = await response.text();
//       // console.log("HTML content:", html);
//       element.innerHTML = html;
//       // console.log("Successfully included:", file);
//     } catch (error) {
//       console.error(`Error including ${file}:`, error);
//       element.innerHTML = `<div class="error">Failed to load ${file}</div>`;
//     }
//   }

//   // Handle include tags
//   const includeTags = Array.from(document.getElementsByTagName("include")); // fixed here
//   // console.log("Found include tags:", includeTags.length);
//   console.log(
//     "Include tags:",
//     includeTags.map((el) => ({
//       element: el,
//       file: el.getAttribute("src"),
//     }))
//   );

//   for (const element of includeTags) {
//     const file = element.getAttribute("src");
//     // console.log("Processing include tag file:", file);
//     try {
//       const response = await fetch(file);
//       // console.log("Response status:", response.status);
//       if (!response.ok) throw new Error(`Failed to load ${file}`);
//       const html = await response.text();
//       // console.log("HTML content:", html);
//       element.outerHTML = html;
//       // console.log("Successfully included:", file);
//     } catch (error) {
//       console.error(`Error including ${file}:`, error);
//       element.outerHTML = `<div class="error">Failed to load ${file}</div>`;
//     }
//   }

//   // console.log("Finished includeHTML function");
// }
