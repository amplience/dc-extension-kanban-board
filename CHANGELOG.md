# Changelog

## [1.3.0](https://www.github.com/amplience/dc-extension-kanban-board/compare/v1.2.0...v1.3.0) (2023-07-18)


### Features

* rebrand ([#47](https://www.github.com/amplience/dc-extension-kanban-board/issues/47)) ([cd9eebf](https://www.github.com/amplience/dc-extension-kanban-board/commit/cd9eebf5e8178e21d7e32a489c32a7bb3d0e4161))
* remove Amplience DC header logo from README ([89dce3d](https://www.github.com/amplience/dc-extension-kanban-board/commit/89dce3d701e51e1a60507dd84f249babd7716651))
* remove DC header asset ([63ee18a](https://www.github.com/amplience/dc-extension-kanban-board/commit/63ee18a7e9d66e9c64a8886b4c506c0c84f73a8f))

## [1.2.0](https://www.github.com/amplience/dc-extension-kanban-board/compare/v1.1.0...v1.2.0) (2023-06-05)


### Features

* chore: use node 16.x as default ([0524b1f](https://www.github.com/amplience/dc-extension-kanban-board/commit/0524b1f4dfdfe5008f1298ad75eda71a2e7ca5fc))

## [1.1.0](https://www.github.com/amplience/dc-extension-kanban-board/compare/v1.0.0...v1.1.0) (2022-10-26)


### Features

* fetch users Updated dc-extensions-sdk version ([8bf5f13](https://www.github.com/amplience/dc-extension-kanban-board/commit/8bf5f13f42787395faee37edbba1629f65561e12))
* Updated package.lock ([5c925cb](https://www.github.com/amplience/dc-extension-kanban-board/commit/5c925cb242133048d290a8e0e0570c63fa683166))

## 1.0.0 (2021-02-15)


### Features

* adds header with counts and paths, and card content type labels ([8d5b912](https://www.github.com/amplience/dc-extension-kanban-board/commit/8d5b912719272e7444f173ca7a51c7f614a9f850))
* **assignee filter:** adding missing tests, updating jest config and updated to use store value ([9e00a85](https://www.github.com/amplience/dc-extension-kanban-board/commit/9e00a853bd91fbe1432be00bb4496e31556d85ab))
* **assignee filter:** updated theme and corrected some snowpack remnants ([c16cd48](https://www.github.com/amplience/dc-extension-kanban-board/commit/c16cd48ad47f55196e27c3da5c63160610ab344d))
* **assignee list:** updated to show a +num when multiple assignees ([7254568](https://www.github.com/amplience/dc-extension-kanban-board/commit/7254568cac5da8d457f4eaa7d007c5a57448a193))
* **assignees:** added new components and services to load users and display assignees ([7599f41](https://www.github.com/amplience/dc-extension-kanban-board/commit/7599f41d5d0722c2c5af347bb0b4a1aa7a79f0ad))
* **card:** add content item link and slight refactor of dc extension client ([90babc9](https://www.github.com/amplience/dc-extension-kanban-board/commit/90babc9dbc10f8b2074e67c7c53d7f4824293fdd))
* **content item filters:** added faceting to the loading of content items ([0a4e493](https://www.github.com/amplience/dc-extension-kanban-board/commit/0a4e493ca666d0854548c84245ea166c9f9c9c2a))
* **content item model:** FTF-27 modified has time string again and style tweaks ([010eaaf](https://www.github.com/amplience/dc-extension-kanban-board/commit/010eaafb3f267a4db100fd4e8e9a6671365a8654))
* **data services:** FTF-27 WIP corrected facet post body ([4f5d0e3](https://www.github.com/amplience/dc-extension-kanban-board/commit/4f5d0e3c2ce0314f6d6419885155ea6da5ef9503))
* **data services:** FTF-27 WIP hopefully fixing build blocking errors ([8703c6c](https://www.github.com/amplience/dc-extension-kanban-board/commit/8703c6c3c1cb3b75b2a7d943c46638e3d44314ba))
* **data services:** FTF-27 WIP: retrieving statuses and content items by status ([948aaa5](https://www.github.com/amplience/dc-extension-kanban-board/commit/948aaa55e980e48cc086569904ed2d14bc673712))
* **drag and drop:** add total item count to each respective status lane. ([58a071d](https://www.github.com/amplience/dc-extension-kanban-board/commit/58a071da2097b9f37bf674783db74b7e8d913a26))
* **drag and drop:** drag and drop now drags and drops real content items. ([fccd081](https://www.github.com/amplience/dc-extension-kanban-board/commit/fccd0814cc46736a209281aefeb434df655b18d9))
* **drag and drop:** FTF-28 - add check to make sure content is switching lanes. ([9882459](https://www.github.com/amplience/dc-extension-kanban-board/commit/988245912d8e0519689650a8c84c8d89ae9bc5c6))
* **drag and drop:** FTF-28 - add drag and drop to kanban board, WIP ([b46d048](https://www.github.com/amplience/dc-extension-kanban-board/commit/b46d048ac23d0e9328ee8e8c9e0a818e974c5ade))
* **drag and drop:** FTF-28 - assign default list of content items, irrespective of whether user completes drop (this handles situation where user decides to get feisty and drag the card here, there and everywhere!) ([ddb6a05](https://www.github.com/amplience/dc-extension-kanban-board/commit/ddb6a05c90bb5ff1f15c09e0336c1a7f2f11ca6c))
* **drag and drop:** FTF-28 - made counts dynamic on board, total is still hardcoded. ([9c9357e](https://www.github.com/amplience/dc-extension-kanban-board/commit/9c9357e6b188d4c566cd581ae29c4a2f44fe3635))
* **drag and drop:** FTF-28 - update dropped ContentItem on the fly and sort the lane in descending order. ([9736ade](https://www.github.com/amplience/dc-extension-kanban-board/commit/9736adea0217f524d50b641f68d8d052dcd89998))
* **drag and drop:** FTF-28 fixed column scrolling. ([7486524](https://www.github.com/amplience/dc-extension-kanban-board/commit/74865240bf2608a85453ae9bc6b6bf0fc60689de))
* **drag and drop:** move hydrate status code into re-callable function and persist SDK params for reuse. WIP as currently using a timeout... ([c50bfcd](https://www.github.com/amplience/dc-extension-kanban-board/commit/c50bfcd53f125732f20284a1d1995069a1df78cf))
* **drag and drop:** plumbing out updating workflow status ([eb8777a](https://www.github.com/amplience/dc-extension-kanban-board/commit/eb8777abdb0707f4bf10e7117bc9efc7eb11a61d))
* **drag and drop:** update loading of hydratedStatuses inside of onMount, re-introduced drag and drop functionality. ([9a5a40f](https://www.github.com/amplience/dc-extension-kanban-board/commit/9a5a40f8c110dbf39a181b3af93c888a608b4d88))
* **drag styling:** add active drop target styling. ([3474eb5](https://www.github.com/amplience/dc-extension-kanban-board/commit/3474eb532b7a45b70fc681aa7ed9cfdda5b4253c))
* **drop styling:** add blue background when hovering over drop zone, removed dashed border. ([d3bf1d5](https://www.github.com/amplience/dc-extension-kanban-board/commit/d3bf1d50b7466c75ed4d3499d7de645ee514379f))
* **filter by assignee:** wIP added a filter and dropdown with basic html for the checkboxes ([9616a60](https://www.github.com/amplience/dc-extension-kanban-board/commit/9616a60be78e14ecb131922670565c959507e34d))
* **frag and drop:** partial fix for undefined modified date. Problem still occurs right after drop due to type incompatibility. ([18bf353](https://www.github.com/amplience/dc-extension-kanban-board/commit/18bf3538c04c4875ce5a97b1a510d19edb4d2066))
* FTF-10 add min width to columns with horizontal scroll ([15779b0](https://www.github.com/amplience/dc-extension-kanban-board/commit/15779b0f2aead427aafef09d346eff2aacce9752))
* **FTF-25:** roughing out the components and columns ([12944ec](https://www.github.com/amplience/dc-extension-kanban-board/commit/12944ecb4c9b90ffc97f14be76247e51d4158aba))
* **header:** FTF-10 remove top margin ([dd33e5c](https://www.github.com/amplience/dc-extension-kanban-board/commit/dd33e5c97f8e145f442bf49b5ab025573c986f96))
* **hover styling:** add dashed border on hover + regulate where styles should be applied on drag/drop. ([1589bbb](https://www.github.com/amplience/dc-extension-kanban-board/commit/1589bbb01cae43213ca28655c3b39c2296c0796c))
* **loading:** FTF-10 add loader and error message ([81d0f1e](https://www.github.com/amplience/dc-extension-kanban-board/commit/81d0f1e40691ea57ff0d74a31c5642b2659a4b6b))
* **loading:** FTF-10 add truncate component for chips ([d08935b](https://www.github.com/amplience/dc-extension-kanban-board/commit/d08935b2a83883bdacb106da0e9824aa3e45ac3c))
* making repoId optional ([9cb0409](https://www.github.com/amplience/dc-extension-kanban-board/commit/9cb0409878a08c3fb6d18ab4375d5b1695bbd710))
* **show more button:** add show more button and trying and balance real estate in column header. ([cff28bd](https://www.github.com/amplience/dc-extension-kanban-board/commit/cff28bd856090dd120f7fa7ffae298a778c6f6a4))
* **show more link:** remove show more link for now. ([0447f93](https://www.github.com/amplience/dc-extension-kanban-board/commit/0447f935f186083fb31c340dbfee21e8d599f079))
* **status model:** do not filter out unhydrated statuses ([816d388](https://www.github.com/amplience/dc-extension-kanban-board/commit/816d3881e7bbc2614f4745d944a7fee14357a7e7))
* **status model:** FTF-10 adds from last 7 days info and plugs in status chip color ([108ed72](https://www.github.com/amplience/dc-extension-kanban-board/commit/108ed72ad2e6c4c3c0751998d97c0aa1a056da94))
* **status model:** FTF-27 adds status model with facet field methods ([b34f055](https://www.github.com/amplience/dc-extension-kanban-board/commit/b34f0554668804c9ba57bdc67814a6c63e6261b3))
* **status model:** FTF-27 check there is a last status before trying to do anything with it ([c125b30](https://www.github.com/amplience/dc-extension-kanban-board/commit/c125b30f2cf2eb6c570ebe38163effa35178e128))
* **status model:** FTF-27 switch to using more robust installation params status model and using status model when retrieving content items ([3dbb0f0](https://www.github.com/amplience/dc-extension-kanban-board/commit/3dbb0f044516997f1a0894d770a23a597ebf905b))


### Bug Fixes

* **asignee filter:** changing alignment of the filter icon ([1a58e6c](https://www.github.com/amplience/dc-extension-kanban-board/commit/1a58e6c7ab1f9ba908fe0bffdb05ec0a3bd6c756))
* **cant double click cards:** FTF-53 - add doubleclick functionality to cards and apply appropriate hover styles. ([a87574d](https://www.github.com/amplience/dc-extension-kanban-board/commit/a87574de833965097b9692802c1e2d4494a6af9a))
* **card:** displaying assigned user avatar to the right ([96f1ada](https://www.github.com/amplience/dc-extension-kanban-board/commit/96f1ada79331f33110c69ab95daf6b9360b7b0a1))
* **card:** FTF-66 force wrap on unbreakable strings and inline clickable title ([109e69a](https://www.github.com/amplience/dc-extension-kanban-board/commit/109e69adf4adda3ac81ce95d18ea595264482eae))
* **card:** FTF-68 adds assignee placeholder as per spec ([551b613](https://www.github.com/amplience/dc-extension-kanban-board/commit/551b613d25514850f747c9a626a257be86e872b2))
* **card:** removing style changes staged by mistake ([ab5db9d](https://www.github.com/amplience/dc-extension-kanban-board/commit/ab5db9dfa724eb29e15e95263288da3d3314bd9c))
* **cards:** format time to en-US convention (double digit hours, mins, no seconds and AM/PM) ([ceb2ba4](https://www.github.com/amplience/dc-extension-kanban-board/commit/ceb2ba45326c1296329d5aadd7dfc5d1b264e25e))
* **card:** styling tweaks and removing content item model modified date getter as caused height jump during drag ([0fc336b](https://www.github.com/amplience/dc-extension-kanban-board/commit/0fc336b56451e40a31b3a113b8fe18ceb907b22d))
* **chip:** status chip takes up available width and toolbar bottom margin tweak ([70b02a0](https://www.github.com/amplience/dc-extension-kanban-board/commit/70b02a04b985341f59057ca85b6b3f5445616c10))
* **drag and drop:** FTF-56 fixed positioning headers and absolutely positioning columns ([c4e3088](https://www.github.com/amplience/dc-extension-kanban-board/commit/c4e308857611d6f3be541f1d808f9a3d7e3253f5))
* **drag and drop:** FTF-56 forcing a min width ([09cc795](https://www.github.com/amplience/dc-extension-kanban-board/commit/09cc795a1917a554a2e66264b39594d572102503))
* **drag and drop:** moved reactive code for incrementing counts back to onFinalize handler. Only setting workflow if item is dropped into different column. ([8d861da](https://www.github.com/amplience/dc-extension-kanban-board/commit/8d861da67cb9148a3411b61ab1d1bf36bcc54402))
* **drop zone styling:** update column bg colour, min column width, bold content item text to 500/medium (same thing) and add pluralisation to content item/s text. ([62f11fc](https://www.github.com/amplience/dc-extension-kanban-board/commit/62f11fc9068562a575b4b096873521d31036d1df))
* **error:** FTF-69 add consistently friendly and ambiguous error message ([1d5cf9b](https://www.github.com/amplience/dc-extension-kanban-board/commit/1d5cf9b3a3b3771af648406b536203e53a55cb92))
* FTF-57: made body and html tag stretch to max content as 100% doesnt seem to cut it. ([d1f8e57](https://www.github.com/amplience/dc-extension-kanban-board/commit/d1f8e57c7e4df7d0dd2a3da7aa9a72cc5e8a8c5c))
* FTF-58 - cards are now 25px away from headers/counts. ([acea510](https://www.github.com/amplience/dc-extension-kanban-board/commit/acea5107a8c785681cdc4a944965b6e3ddcf6535))
* **header:** FTF-52 style tweaks to match design spec ([9002b81](https://www.github.com/amplience/dc-extension-kanban-board/commit/9002b819c6031a3d8daa195c52428c199c7b0bb7))
* **kanban board header:** add title attribute to repo/folder path. ([7cb4db4](https://www.github.com/amplience/dc-extension-kanban-board/commit/7cb4db42da72f4f5e4b926ff208433f715ff3474))
* **kanban board header:** FTF-65 - switched body height back to % given that the header no longer scrolls horizontally. added a max-width calc and ellipsis to repo/folder path in header. ([ff12823](https://www.github.com/amplience/dc-extension-kanban-board/commit/ff1282315cbaf496dc1190bfb03fac013739332c))
* **kanban board:** FTF-64 - move padding to grid wrapper, grid itself was doing weird things with padding when combined with grid layout gutters/gaps. ([41b3c6d](https://www.github.com/amplience/dc-extension-kanban-board/commit/41b3c6d16d334c42f15632411334d591a9f737b2))
* **kanban cards:** FTF-70 - update right,left margin of kanban cards to be 8px. ([0d93b78](https://www.github.com/amplience/dc-extension-kanban-board/commit/0d93b78be6dba3070cc48efa51c37f17188e6106))
* **kanban-board-scrolling:** change horizontal scroll target so that only the board part scrolls, fixed header issues in Safari too. ([172d020](https://www.github.com/amplience/dc-extension-kanban-board/commit/172d02079ce1ad5e2fbf308a825f7aa4acec4a61))
* **package.json:** updated to use the correct branch name ([3bffc7d](https://www.github.com/amplience/dc-extension-kanban-board/commit/3bffc7d10b19aecdba6a2440d2827d706b1e89d3))
* remove non-needed request ([b954c00](https://www.github.com/amplience/dc-extension-kanban-board/commit/b954c0058c59120f43f7e8387f952333a623c978))
* **status chip:** contrast colour now using fixed preset colours and fallback setter correctly parsing rgb string ([025fdec](https://www.github.com/amplience/dc-extension-kanban-board/commit/025fdec1a10abce9bbf31856413c13bad156bb59))
* **status:** hide count and add error message for unhydrated status ([f18bd85](https://www.github.com/amplience/dc-extension-kanban-board/commit/f18bd85d0643212a8462df44ee38a5df6f1dfac2))
