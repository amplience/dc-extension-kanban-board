[![Amplience Dynamic Content](media/header.png)](https://amplience.com/dynamic-content)

# dc-extension-kanban-board

## How to install Kanban dashboard extension

This extension needs to be [registered](https://amplience.com/docs/development/registeringextensions.html) in the Dynamic Content application (Developer -> Extensions) under the type of Dashboard.

The dashboard requires a specific configuration and the following example settings need to be defined:

### Setup

![Setup](media/setup.png)

#### URL

You can use our deployed version of this extension (builds from the "production" branch) -

[https://dc-extension-kanban-board.amplience.net](https://dc-extension-kanban-board.amplience.net)

_As this is an open source project you're welcome to host your own "fork" of this project. You can use any standard static hosting service (Netlify, Amplify, Vercel, etc.) if you wish._

### Permissions

![Permissions](media/permissions.png)

To use the application the following permissions must be enabled:

API permissions

- Read access
- Write access

Sandbox permissions

- Allow same origin
- Allow top navigation
- Allow pop-ups

### Installation parameters

```json
{
  "repositoryId": "<repository_id>",
  "statuses": [
    {
      "id": "<workflow_status_id>"
    },
    {
      "id": "<workflow_status_id>"
    },
    {
      "id": "<workflow_status_id>"
    }
  ]
}
```
