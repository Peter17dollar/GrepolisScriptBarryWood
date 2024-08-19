// ==UserScript==
// @name         Barry_Wood0.0.1
// @namespace    http://tampermonkey.net/
// @version      1.5.1
// @description  try to take over the world!
// @author       Peter17Dollar & larzz010
// @match        https://nl116.grepolis.com/game/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==
 
(function () {
    'use strict';
  const StorageToken = 'put down your token here';
  const storageAccount = "put down your storage account name";
  const containerName = "put down your container name";
    $(document).ready(function () {
        if (Game.world_id === "nl116") {
            initMutationObserver();
            addTroopCounterButton();
        }

                
 
 
        function addTroopCounterButton() {
            if (document.getElementById('troopCounterButton') === null) {
                var a = document.createElement('div');
                a.id = "troopCounterButton";
                a.className = 'btn_settings circle_button_small';
                a.style.top = '90px';
                a.style.right = '57px';
                a.style.zIndex = '10000';
                a.innerHTML = "";
                document.getElementById('ui_box').appendChild(a);
                $("#troopCounterButton").click(function () {
                    createTroopCounterWindow();
                });
            }
        }
 
        // Function to check if the banner should be shown
        function shouldShowBanner() {
            var lastShownTime = localStorage.getItem('bannerLastShownTime');
            var now = Date.now(); // Current timestamp in milliseconds
            var fourHoursInMillis = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
 
            if (!lastShownTime || now - lastShownTime >= fourHoursInMillis) {
                localStorage.setItem('bannerLastShownTime', now); // Update the timestamp in localStorage
                localStorage.removeItem('bannerClosed'); // Reset the closed flag
                return true; // Banner should be shown
            } else {
                return false; // Banner should not be shown
            }
        }
 
        // Function to create and show the banner
        function showBanner() {
 
            // Create the banner element
            var banner = document.createElement('div');
            banner.id = 'myBanner';
            banner.style.position = 'fixed';
            banner.style.top = '60px'; // Adjust as needed
            banner.style.left = '50%';
            banner.style.transform = 'translateX(-50%)';
            banner.style.width = '80%'; // Adjust width as needed
            banner.style.maxWidth = '800px'; // Max width to keep it contained
            banner.style.backgroundColor = '#8B0000'; // Dark red color
            banner.style.color = '#FFD700'; // Gold color for text
            banner.style.textAlign = 'center';
            banner.style.padding = '15px';
            banner.style.border = '2px solid #FFD700'; // Gold border
            banner.style.borderRadius = '10px';
            banner.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
            banner.style.zIndex = '1000'; // Make sure the banner is on top of other elements
            banner.style.fontFamily = "'Palatino Linotype', 'Book Antiqua', Palatino, serif"; // A font that fits the theme
            banner.style.fontSize = '18px';
 
            // Add text to the banner
            banner.textContent = 'It is time to update the troops!';
 
 
            // Create the close button
            var closeButton = document.createElement('span');
            closeButton.textContent = '✖';
            closeButton.style.marginLeft = '20px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.float = 'right';
            closeButton.onclick = function() {
                banner.style.display = 'none';
                localStorage.setItem('bannerClosed', 'true'); // Set the closed flag
            };
            banner.appendChild(closeButton);
 
            // Append the banner to the body
            document.body.appendChild(banner);
        }
 
        // Function to check if the banner has been closed
        function isBannerClosed() {
            return localStorage.getItem('bannerClosed') === 'true';
        }
 
        // Function to schedule the next banner
        function scheduleNextBanner() {
            setTimeout(function() {
                if (shouldShowBanner()) {
                    if (!isBannerClosed()) {
                        console.log("Banner should be reshown");
                        showBanner();
                    }
                }
                scheduleNextBanner(); // Schedule the next banner
            }, 30 * 60 * 1000); // 30 minutes in milliseconds
        }
 
        // Initial check and show the banner if necessary
        if (shouldShowBanner() && !isBannerClosed()) {
            showBanner();
        }
 
        // Schedule the next banner
        scheduleNextBanner();
 
        function createTroopCounterWindow() {
            var windowExists = false;
            var windowItem = null;
            var wnd = null;
 
            // Check if the window already exists
           for (var item of document.getElementsByClassName('ui-dialog-title')) {
               if (item.innerHTML == "TroopCounter") {
                   windowExists = true;
                   windowItem = item;
                   break;
               }
           }
 
           // Create the window if it doesn't exist
           if (!windowExists) {
               wnd = Layout.wnd.Create(Layout.wnd.TYPE_DIALOG, "TroopCounter");
               wnd.setContent(''); }
 
               for (var item of document.getElementsByClassName('ui-dialog-title')) {
                   if (item.innerHTML == "TroopCounter") {
                       windowItem = item;
                   }
           }
 
           // Set window properties
           wnd.setHeight('100');
           wnd.setWidth('300');
           wnd.setTitle("TroepenTeller");
 
           var title = windowItem;
           var frame = title.parentElement.parentElement.children[1].children[4];
           var fetchDataInterval = null;
           // Create checkbox container
           var checkboxContainer = document.createElement('div');
           checkboxContainer.style.display = 'flex';
           checkboxContainer.style.alignItems = 'center';
           checkboxContainer.style.justifyContent = 'center';
           checkboxContainer.style.height = '100%';
 
           // Create checkbox label
           var checkboxLabel = document.createElement('label');
           checkboxLabel.setAttribute('for', 'toggleCheckbox');
           checkboxLabel.innerHTML = 'Automatische troepenupdate';
 
 
           // Create checkbox input element
           var checkbox = document.createElement('input');
           checkbox.type = 'checkbox';
           checkbox.id = 'toggleCheckbox';
 
           // Retrieve previous checkbox state from localStorage
           var isChecked = localStorage.getItem('troopCounterCheckbox');
           if (isChecked === 'true') {
               checkbox.checked = true;
 
    }
 
           // Append checkbox input to checkbox anchor
           checkboxContainer.appendChild(checkbox);
 
           // Append checkbox anchor and label to container
           checkboxContainer.appendChild(checkboxLabel);
 
           // Create fetch data button
           var fetchDataButton = document.createElement('div');
           fetchDataButton.textContent = 'Update troepen';
           fetchDataButton.style.marginTop = '5px';
           fetchDataButton.style.padding = '4px 6px';
           fetchDataButton.style.backgroundRepeat = 'repeat-x';
           fetchDataButton.style.backgroundColor = '#000435';
           fetchDataButton.style.color = '#fc6';
           fetchDataButton.style.borderRadius = '4px';
           fetchDataButton.style.cursor = 'pointer';
           fetchDataButton.style.textAlign = 'center';
           fetchDataButton.style.alignItems = 'center';
           fetchDataButton.style.justifyContent = 'center';
 
           // Append container to modal content frame
           frame.appendChild(fetchDataButton);
 
           fetchDataButton.addEventListener('click', function () {
               fetchData();
               localStorage.setItem('lastFetchTime', Date.now())
               alert('Data succesvol verzonden!');
           });
 
 
 
           function fetchData() {
               let AllPlayerData = {
                   HomeTroops: [],
                   AwayTroops: [],
                   SupportInCity: [],
                   PlayerCL: [],
                   Wall: [],
                   Red: [],
                   IDs: [],
                   Troepen: []
               };
 
               var commands = MM.getModels().Takeover;
 
               for (let command in commands) {
                   let destinationTown = commands[command].attributes.destination_town.id;
                   let endf2time = commands[command].attributes.command.arrival_at;
                   let attacker = commands[command].attributes.origin_town.player_name;
                   let defender = commands[command].attributes.destination_town.player_name;
                   AllPlayerData.Red.push({
                       destination: destinationTown,
                       endf2: endf2time,
                       attacker : attacker,
                       defender : defender
                   });
               }
 
               // Getting all the cities units
               let playerName = Game.player_name;
               if (playerName.startsWith('.')) {
                   playerName = playerName.substring(1);
               }
               for (const fragmentId in ITowns.all_units.fragments) {
                   if (ITowns.all_units.fragments.hasOwnProperty(fragmentId)) {
                       const fragment = ITowns.all_units.fragments[fragmentId];
 
                       // Iterate over all models within the current fragment
                       for (const modelId in fragment.models) {
                           if (fragment.models.hasOwnProperty(modelId)) {
                               const model = fragment.models[modelId];
 
                               // Access and process the attributes
                               const troepen = model.attributes;
                               // Push the attributes
                               AllPlayerData.Troepen.push({speler: playerName, troepen: troepen});
                               console.log('Pushed:', troepen)
                           }
                       }
                   }
               }
 
               let townsObject = ITowns.towns
               // Implement your FetchData functionality here
               let lastUpdated = Date.now().toString();
               let cldata = TooltipFactory.getCultureOverviewTooltip().split('<br />');
               let player_villages = Game.player_villages;
 
               // Removing <b>...</b> tags from each element in the list
               for (let i = 0; i < cldata.length; i++) {
                   cldata[i] = cldata[i].replace(/<b>.*?<\/b>/g, '').trim(); }
 
               let cl = parseInt(cldata[1]);
               let open_slots = cl - player_villages
 
               AllPlayerData.PlayerCL.push({
                   playerName: playerName,
                   playerVillages: player_villages,
                   cultureLevel: cl,
                   openSlots: open_slots
               });
               let townsData = Object.values(townsObject).map(town => {
                   // Fetch home troops
                   let homeUnits = town.units();
                   let townName = town.name;
                   let townID = town.id;
                   let support = town.unitsSupport();
                   let unitsAway = town.unitsOuter();
                   let wall = town.getBuildings().attributes.wall
                   var hasPhalanx = uw.ITowns.getTown(townID).getResearches().get("phalanx")
                   var hasTower = uw.ITowns.getTown(townID).getBuildings().get("tower")
                   var God = uw.ITowns.getTown(townID).god()
 
                   AllPlayerData.HomeTroops.push(playerName, townName, homeUnits);
                   AllPlayerData.AwayTroops.push(playerName, townName,unitsAway);
                   AllPlayerData.SupportInCity.push(playerName, townName, support);
                   AllPlayerData.IDs.push({stad : townName, id: townID});
                   AllPlayerData.Wall.push({speler: playerName, stad: townName, destination: townID, muur: wall, falanx: hasPhalanx, toren: hasTower, god: God})});
 
               // Convert AllPlayerData to JSON string
                let allPlayerDataJson = JSON.stringify(AllPlayerData);
 
                // Call the function to upload data to Blob Storage
                uploadDataToBlobStorage(allPlayerDataJson, playerName);
           }
            async function uploadDataToBlobStorage(data, playerName) {
                
                const blobName = `${playerName}.json`;
                const sasToken = Storagetoken;
                const url = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
 
                try {
                    const response = await fetch(url, {
                        method: 'PUT',
                        headers: {
                            'x-ms-blob-type': 'BlockBlob',
                            'Content-Type': 'application/json'
                        },
                        body: data
                    });
 
                    if (response.ok) {
                        console.log('Data successfully uploaded to Blob Storage');
                    } else {
                        console.error('Failed to upload data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error uploading data:', error);
                }
           }
       }
    });
})();
