# app-header



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [page-404](../pages/page-404)
 - [page-email-verification](../pages/auth/page-email-verification)
 - [page-forgot-password](../pages/auth/page-forgot-password)
 - [page-login](../pages/auth/page-login)
 - [page-register](../pages/auth/page-register)
 - [page-reset-password](../pages/auth/page-reset-password)

### Depends on

- ion-header
- ion-toolbar
- ion-buttons
- ion-button
- ion-title

### Graph
```mermaid
graph TD;
  app-header --> ion-header
  app-header --> ion-toolbar
  app-header --> ion-buttons
  app-header --> ion-button
  app-header --> ion-title
  ion-button --> ion-ripple-effect
  page-404 --> app-header
  page-email-verification --> app-header
  page-forgot-password --> app-header
  page-login --> app-header
  page-register --> app-header
  page-reset-password --> app-header
  style app-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built by Matt, using Stencil
