let name = "Tony";
let verb = "";
let noun = "";
let jsonString;
let data

const myEnvVariable = import.meta.env.VITE_API_KEY;

let namestats = document.getElementById('name-stats');
namestats.innerHTML = name.toUpperCase() + "'S STATS";
let nametitle = document.querySelectorAll('.name');
nametitle.forEach(function(element) {
  element.innerHTML = name.toUpperCase();
});

let verbtext = document.getElementById("verb");
let nountext = document.getElementById("noun");
let funclist;
let funcTitle = document.getElementById("funcTitle");
let funclist_written = ["Adjust Tank Setup",
                        "Filtration Maintenance",
                        "Water Quality Monitoring",
                        "Temperature Regulation",
                        "Feed",
                        "Dietary Variation",
                        "Partial Water Changes",
                        "Clean Tank",
                        "Tank Decoration Enrichment",
                        "Health Observation",
                        "Quarantine",
                        "Disease Treatment",
                        "Tank and Glass Cleaning",
                        "Lighting Regulation",
                        "Oxygenation and Aeration",
                        "Address Stress Management",
                        "Behavioral Stimulation",
                        "Seasonal Care Adjustments",
                        "Tank Size Upgrades",
                        "End-of-Life Care",
                        "Do Nothing"]

let statsOutput = document.querySelector(".chosen-stats");
let statsList = document.querySelector(".stats-list");
let duplicateButton = document.getElementById("duplicateButton");
let createdStats = [];

let verbsfile = "src/verbs.txt"
fetch(verbsfile)
    .then(response => response.text())
    .then(data => {
        let lines = data.split("\n");
        let dropdownContent = document.querySelector(".dropdown-content-verbs");

        lines.forEach(line => {
            if (line.trim() !== "") { 
                let aTag = document.createElement("a");
                aTag.innerHTML = line;

                aTag.onclick = function(event) {
                    event.preventDefault();
                    verb = line;
                    verbtext.innerHTML = verb;
                   
                    aTag.classList.add("highlight"); 
                    aTag.classList.add("disable-hover");
                    setTimeout(() => {
                        aTag.classList.remove("highlight"); 
                        aTag.classList.remove("disable-hover");
                    }, 1000);
                };

                dropdownContent.appendChild(aTag);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the file:", error);
    });

let nounsfile = "src/nouns.txt"
fetch(nounsfile)
    .then(response => response.text()) // Get the content of the file
    .then(data => {
        let lines = data.split("\n");
        let dropdownContent = document.querySelector(".dropdown-content-nouns");

        lines.forEach(line => {
            if (line.trim() !== "") {
                let aTag = document.createElement("a");
                aTag.innerHTML = line;

                aTag.onclick = function(event) {
                    event.preventDefault();
                    noun = line;
                    nountext.innerHTML = noun;
                   
                    aTag.classList.add("highlight");
                    aTag.classList.add("disable-hover");
                    setTimeout(() => {
                        aTag.classList.remove("highlight");
                        aTag.classList.remove("disable-hover");
                    }, 1000);
                };

                dropdownContent.appendChild(aTag);
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the file:", error);
    });


let funcfile = "src/ai-functions.txt"
fetch(funcfile)
    .then(response => response.text()) // Get the content of the file
    .then(data => {
        let lines = data.split("\n");
        let counter = 0;

        funclist = document.querySelector(".functions");

        lines.forEach(line => {
            if (line.trim() !== "" && line.trim() !== "AI FUNCTIONS:" && counter < 21) {
                let func = document.createElement("p");
                func.innerHTML = line;
                func.style.lineHeight = "10px";
                func.setAttribute('id', counter);

                // Append the anchor tag to the dropdown-content-verbs div
                // *funclist is the div that holds all the functions
                // *func is the individual function being added to the funclist
                funclist.appendChild(func);
                counter++;
            }
        });
    })
    .catch(error => {
        console.error("Error fetching the file:", error);
    });


window.submitSituation = function() {
    console.log("Verb: " + verb + " | Noun: " + noun);
    statsList.innerHTML = '';
    if (!funclist) {
        console.error("funclist is undefined or not found");
        return;
    }
    let allFuncs = funclist.querySelectorAll("p");
    allFuncs.forEach(func => {
        func.style.backgroundColor = "transparent";
    });

    funcTitle = document.getElementById("funcTitle");
    funcTitle.innerHTML = "AI HAS CHOSEN THE FOLLOWING FUNCTIONS: "
    funcTitle.style.backgroundColor = "#a5bef5";
    funcTitle.style.width = "90%";

    fetch('src/ai-functions.txt')
      .then(response => response.text())
      .then(fileContent => {
        console.log(fileContent);
        const data = {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `

                Here is the list of specific care functions for a fish, and the 'stats' titles for the fish: ${fileContent}. 

                A goldfish ${verb} ${noun}.

                Based on the given situation above and the care functions listed, **select AT LEAST one care function from the list EXACTLY as it appears to handle the situation Think about how you can help the fish based on your given functions**. 
                - The function should be copied **word-for-word** with the **exact same capitalization and spelling**.
                - You **MUST NOT** create any new functions that are not listed.
                - For example, do not return "Feed the fish" when "Feed" is an option on the list.

                Then, based on the stats.txt file, list out the trait(s) you think will be affected by your choice of function. 
                Again, the stat names should be **exactly** as they appear in the list.

                Finally, if there are any concerns or comments you have, write them in a short sentence (max 10 words).

                The output must be a valid JSON object with the following structure:
                {
                "AI_FUNCTIONS": ["List of chosen functions"],
                "STATS": ["List of affected stats"],
                "Major_Concerns": "Single string of concerns or comments."
                }

                Do not return anything that is not inside the curly brackets, do not use backticks, and do not create any new functions or stats. 
                Stick strictly to the provided lists.`  },
          ],
        };

        return fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${myEnvVariable}`,
          },
          body: JSON.stringify(data),
        });
      })
      .then(response => response.json())
      .then(result => {
        console.log(result.choices[0].message);
        jsonString = result.choices[0].message.content;
        data = JSON.parse(jsonString);

        // ***DEALING WITH AI FUNCTIONS LIST***
        const functionsArray = data.AI_FUNCTIONS;
        console.log(functionsArray);

        functionsArray.forEach(func => {
          for(let i = 0; i < funclist_written.length; i++){
            if(func == funclist_written[i]){
                allFuncs[i].style.backgroundColor = "#a5bef5";
            }
          }
        });

        // ***DEALING WITH STATS ADDING***
        const statsArray = data.STATS;
        console.log(data.STATS);

        statsArray.forEach(func => {
            // Create a new div for the stat
            let newStat = document.createElement('div');
            newStat.classList.add('stat-container'); // Optional: Add a class for styling
            newStat.style.display = "flex";
            newStat.style.alignItems = "center";
            newStat.style.justifyContent = "space-between";
            newStat.style.padding = "5px";
            newStat.style.margin = "5px 0px 5px 0px";

            // Create a paragraph to display the stat name
            let statName = document.createElement('p');
            statName.innerHTML = func;
            statName.style.margin = "0px";

            // Create the stat bar (outer bar)
            let statbar = document.createElement('div');
            statbar.classList.add('outer-statbar'); // Add a class for styling the bar
            statbar.style.width = '50%'; // Set full width for outer bar

            // Create the inner stat bar (inner bar to represent progress)
            let statinnerbar = document.createElement('div');
            statinnerbar.classList.add('inner-statbar'); // Add a class for inner bar styling
            statinnerbar.style.backgroundColor = "white";
            statinnerbar.style.width = '50%'; // Example width, set according to logic

            // Append the stat name and the bars to the new stat div
            newStat.appendChild(statName);
            statbar.appendChild(statinnerbar); // Inner bar inside outer bar
            newStat.appendChild(statbar); // Append the full bar (with inner bar)

            // Function to handle real-time width update
            function updateWidth(event) {
                const rect = statbar.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const barWidth = rect.width;
                const newWidthPercentage = (mouseX / barWidth) * 100;
                statinnerbar.style.width = `${newWidthPercentage}%`;
            }

            // Add the real-time update on mousemove
            statbar.addEventListener('mousemove', updateWidth);

            // Stop the real-time update on click
            statbar.addEventListener('click', function() {
                // Remove the mousemove event listener to stop the real-time update
                statinnerbar.style.backgroundColor =  "#a5bef5"
                statbar.removeEventListener('mousemove', updateWidth);
            });


            // Append the stat to the statsOutput container
            createdStats.push(newStat);
            statsOutput.appendChild(newStat);
        });


        // ***DEALING WITH CONCERNS***
        console.log(data.Major_Concerns);
        document.getElementById('concerns').innerHTML = data.Major_Concerns;


        if (result.usage) {
          console.log(`Prompt tokens: ${result.usage.prompt_tokens}`);
          console.log(`Completion tokens: ${result.usage.completion_tokens}`);
          console.log(`Total tokens: ${result.usage.total_tokens}`);
        }
      })
      .catch(error => console.error('Error:', error));

};

window.duplicate = function() {
    console.log("DUPLICATING");

    // Check if createdStats has any elements
    if (createdStats.length === 0) {
        console.error("No stats available to duplicate");
        return;
    }

    // Loop through the stored stat elements and append them to the stats-list container
    createdStats.forEach(stat => {
        let clonedStat = stat.cloneNode(true); // Clone the stat div
        statsList.appendChild(clonedStat); // Append the cloned stat to stats-list
    });

    // Clear the createdStats array after duplicating
    createdStats = [];
    statsOutput.innerHTML = '';
};



// TOOL TIP TOOL TIP TOOL TIP TOOL TIP

const tooltipContainer = document.querySelector('.tooltip-container');
const tooltip = document.querySelector('.tooltip');

const tooltipContainer2 = document.querySelector('.tooltip-container2');
const tooltip2 = document.querySelector('.tooltip2');

// Show and position tooltip on mouse move
tooltipContainer.addEventListener('mousemove', (event) => {
    tooltip.style.opacity = 1; // Make the tooltip visible

    // Set the position of the tooltip to follow the mouse cursor
    tooltip.style.left = `${event.pageX + 10}px`; // Offset slightly to avoid covering the cursor
    tooltip.style.top = `${event.pageY + -70}px`;
});

// Hide tooltip when mouse leaves the container
tooltipContainer.addEventListener('mouseleave', () => {
    tooltip.style.opacity = 0; // Hide the tooltip
});

tooltipContainer2.addEventListener('mousemove', (event) => {
    tooltip2.style.opacity = 1; // Make the tooltip visible

    // Set the position of the tooltip to follow the mouse cursor
    tooltip2.style.left = `${event.pageX + 10}px`; // Offset slightly to avoid covering the cursor
    tooltip2.style.top = `${event.pageY + -70}px`;
});

// Hide tooltip when mouse leaves the container
tooltipContainer2.addEventListener('mouseleave', () => {
    tooltip2.style.opacity = 0; // Hide the tooltip
});

