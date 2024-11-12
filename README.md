# GrepolisScriptBarryWood
Repository of the Grepolis Script created by Peter17dollar &amp; Larzz


## Overview
This Tampermonkey script is designed to collect specific data from your profile on the website `www.grepolis.nl`. The data gathered includes:

- **Troops per town**: Collects detailed troop information for each town you control.
- **Culture level**: Retrieves your current culture level.
- **Wall level and assigned god**: Collects the wall level and the god assigned to each town.
- **Siege status**: Detects if any of your towns are currently under siege.

The script will upload this information to an Azure Blob Storage as a `.json` file to minimize space usage. 

## Installation Guide

### Prerequisites
1. **Tampermonkey Extension**: Ensure you have the Tampermonkey extension installed on your browser. Tampermonkey is available for most major browsers including Chrome, Firefox, Safari, and Edge. You can download it from [Tampermonkey.net](https://www.tampermonkey.net/).

### Step-by-Step Installation

1. **Create a New Tampermonkey Script**:
   - Open Tampermonkey in your browser.
   - Click on the **"Dashboard"**.
   - Click the **"+"** button to create a new script.

2. **Copy and Paste the Script**:
   - Copy the entire script code you received.
   - Paste it into the editor window in Tampermonkey.

3. **Configure the Azure Blob Storage Token and world**:
   - At the top of the script, locate the following lines:
     ```javascript
     const sasToken = 'put down your token here';
     const storageAccount = "put down your storage account name";
     const containerName = "put down your container name";
     const world = 114;
     
     ```
   - Replace the 'const world = 114', to the world that you want this script to work on.
   - Replace the string with the Azure Blob Storage access token/storageaccount name / container name provided by your alliance. This token allows secure access to the storage location. Be sure not to share this token!
  

4. **Save the Script**:
   - After pasting and configuring the script, click **"File"** and then **"Save"**.

5. **Activate the Script**:
   - Ensure the script is activated. You should see a green toggle next to your script name on the Tampermonkey dashboard only when you are on the grepolis website.

### Usage

1. **Login to Grepolis**:
   - Open your browser and log in to your account on `www.grepolis.nl`.

2. **Script Execution**:
   - The script will **only run if and only if** you press the 'upload' button. This button is located above the assigned god in the town and just under 'buy gold'. When this button is pushed the script will upload the data to the storage

3. **Data Upload**:
   - The gathered data will be compiled into a `.json` file and uploaded to the specified Azure Blob Storage using the token you provided.

### Security Notice

- **Private Access Token**: The access token for the Azure Blob Storage is **private** and should only be shared within your alliance. This ensures that only authorized individuals can access the uploaded data.
- **Data Sensitivity**: Be aware that the collected data includes strategic information about your towns. Ensure that the token is kept secure and only shared with trusted members.

## Support
If you encounter any issues during installation or use, please contact your alliance's technical officer for assistance and if you are that technical officer you can contact me on my [email](mailto:peter17dollargaming@gmail.com)

---

