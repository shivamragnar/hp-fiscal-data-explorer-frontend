
What and Why this repository?
-----------------------------
This repository is to publish the frontend code of Himachal Pradesh Fiscal Data Explorer. Fiscal Data Explorer is a unique tool where citizens can explore both budgets and spending data of Himachal Pradesh in an easy to comprehend and simple to use manner. The project is divided into two repositories hp-fiscal-data-explorer-frontend and hp-fiscal-data-explorer-backend. This repository is the first step towards building more open source fiscal explorers. We selected Himachal Pradesh as our target state because Himachal Pradesh’s finance department uploads the district wise expenditure and revenue data on daily basis on Himkosh of how different stakeholders. The data uploaded is granular and accessible as compared to other states.

Relevant Links
--------------
* [Platform link](https://hp.openbudgetsindia.org/#/)
* [Backend repository link](https://github.com/CivicDataLab/hp-fiscal-data-explorer-backend)
* [Wiki](https://github.com/CivicDataLab/hp-fiscal-data-explorer-backend/wiki)

Pre-requisites
--------------

```
  Node.js: 12.6.0, 
  yarn: 1.19.0 or npm 6.14.2
```

Installation
--------------

```
# Setup Development environment
$ virtualenv env  
$ source env/bin/activate

# Clone Repository
$ git clone https://github.com/CivicDataLab/fiscal_data_explorer_frontend.git
$ cd fiscal_data_explorer_frontend

# Install all dependencies
$ yarn

# Run the server
$ yarn start

```

Contributing Guidelines
-----------------------
 * Create an issue for a feature/bug.
 * Discuss the implementation on the issue itself while attaching the supporting docs there.
 * Create a new branch for the issue.
 * Code in the branch.
 * Open a PR with the very first commit and add a WIP prefix to the title of the PR. e.g. WIP: Fix #1 - Fixed bar chart labels.
 * When finished with the implementation, request reviews and remove the WIP prefix.
 * If approved, merge the branch. If you are merging from your local CLI(instead of Github UI), make sure your merge commit message contain Fix #1 (for our          example, the issue number is 1, replace it with whatever issue number you worked on).
 * Go back and check if your issue is closed or not, if not just close it with a reference to the PR which closes it and then go ahead and delete the                branch.
  
## Contributors
- [Abrar Burk](https://github.com/silvergravel)
- [Arpit Arora](https://github.com/TheDataAreClean)
- Arun Sudarsan
- [Gaurav Godhwani](https://github.com/gggodhwani)
- [Preethi G](https://github.com/preethical)
- [Shivam Sharma](https://github.com/shivamragnar)
- [Shreya Agrawal](https://github.com/shreyaagrawal0809)

Folder structure
----------------

```
.
├── LICENSE
├── README.md
├── build
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── package-lock.json
├── package.json
├── public
│   ├── assets
│   ├── favicon.png
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src
│   ├── App.js
│   ├── App.scss
│   ├── App.test.js
│   ├── actions
│   ├── components
│   ├── content
│   ├── data
│   ├── dictionary
│   ├── imgs
│   ├── index.js
│   ├── index.scss
│   ├── logo.svg
│   ├── reducers
│   ├── scss
│   ├── serviceWorker.js
│   ├── store.js
│   └── utils
└── yarn.lock
```
License
-------
The code is licensed under MIT License while the contents inside the content folder are licensed under CC-BY-4.0.
