let name = "Tony";
let verb = "Loves";
let noun = "Birds";
let jsonString;
let data


let namestats = document.getElementById('name-stats');
namestats.innerHTML = name.toUpperCase() + "'S STATS";
let nametitle = document.querySelectorAll('.name');
nametitle.forEach(function(element) {
  element.innerHTML = name.toUpperCase();
});

let verbsfile = "verbs.txt"
fetch(verbsfile)
    .then(response => response.text()) // Get the content of the file
    .then(data => {
        // Split the file content by new lines
        let lines = data.split("\n");

        // Get the dropdown content div
        let dropdownContent = document.querySelector(".dropdown-content-verbs");

        // Create an <a> tag for each line
        lines.forEach(line => {
            if (line.trim() !== "") { // Make sure the line is not empty
                let aTag = document.createElement("a");
                aTag.href = "#"; // Set href for the anchor tag
                aTag.innerHTML = line; // Set the text as the line from the file

                // Append the anchor tag to the dropdown-content-verbs div
                dropdownContent.appendChild(aTag);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the file:", error);
    });

let nounsfile = "nouns.txt"
fetch(nounsfile)
    .then(response => response.text()) // Get the content of the file
    .then(data => {
        // Split the file content by new lines
        let lines = data.split("\n");

        // Get the dropdown content div
        let dropdownContent = document.querySelector(".dropdown-content-nouns");

        // Create an <a> tag for each line
        lines.forEach(line => {
            if (line.trim() !== "") { // Make sure the line is not empty
                let aTag = document.createElement("a");
                aTag.href = "#"; // Set href for the anchor tag
                aTag.innerHTML = line; // Set the text as the line from the file

                // Append the anchor tag to the dropdown-content-verbs div
                dropdownContent.appendChild(aTag);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the file:", error);
    });


// let results = document.getElementById('results');

// fetch('ai-functions.txt')
//   .then(response => response.text())
//   .then(fileContent => {
//     const data = {
//       model: "gpt-4o-mini",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: `

//         Here is a list of care functions for a fish, and 'stats' titles for 
//         the fish: ${fileContent}. 

//         A goldfish ${verb} ${noun}. 

//         Based on the ai-functions.txt file, list which function(s) you will use to handle 
//         the situation, no details. Then, based on stats.txt file, list out the trait(s) that
//         you think will be effected based on your decision and the situation at hand, no 
//         details. Finally, if there are any major concerns you have, write it out in a 
//         short sentence (max 10 words). If no major concerns for fish, write: 'No.' 

//         Return the output in a JSON format with clearly labeled sections for 'AI_FUNCTIONS', 
//         'STATS', and 'Major_Concerns'. List each function and stat as an array of values. 
//         Write the major concerns as a single string. Do not put anything outside the curly brackets.` },
//       ],
//     };

//     return fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.env_variable}`,
//       },
//       body: JSON.stringify(data),
//     });
//   })
//   .then(response => response.json())
//   .then(result => {
//     console.log(result.choices[0].message);
//     jsonString = result.choices[0].message.content;
//     data = JSON.parse(jsonString);

//     results1.innerHTML =  data.AI_FUNCTIONS;
//     results2.innerHTML =  data.STATS;
//     results3.innerHTML =  data.Major_Concerns;


//     if (result.usage) {
//       console.log(`Prompt tokens: ${result.usage.prompt_tokens}`);
//       console.log(`Completion tokens: ${result.usage.completion_tokens}`);
//       console.log(`Total tokens: ${result.usage.total_tokens}`);
//     }
//   })
//   .catch(error => console.error('Error:', error));
