# SecondBrain (Backend)
Contains SecondBrain backend informations.

## UML Diagram
```mermaid
classDiagram
    class accountController {
        +validateEmail(input) boolean
        +login(req, res) 
        +register(req, res) 
        +updateAccount(req, res) 
        +deleteAccount(req, res) 
        +getAllAccount(req, res) 
    }

    class noteController {
        +createNote(req, res) 
        +getNote(req, res) 
        +deleteNote(req, res) 
        +updateNote(req, res) 
    }

    class reminderController {
        +createReminder(req, res) 
        +getReminder(req, res) 
        +deleteReminder(req, res) 
        +updateReminder(req, res) 
    }

    class teamController {
        +createTeam(req, res) 
        +getTeamByTeamId(req, res) 
        +getTeamByAccountId(req, res) 
        +deleteTeam(req, res) 
        +updateTeam(req, res) 
        +getMemberFromTeam(req, res) 
        +joinTeam(req, res) 
        +leaveTeam(req, res) 
    }

    class accountRoute {
        -router~express.Router~
    }

    class noteRoute {
        -router~express.Router~
    }

    class reminderRoute {
        -router~express.Router~
    }

    class teamRoute {
        -router~express.Router~
    }

    class hasher {
        +hashThis(thing)
    }

    class logger {
        +error(message)
        +warn(message)
        +info(message)
        +http(message)
        +debug(message)
    }

    class dbconfig {
        -pool~pg.Pool~
        +databaseConnectionTest() 
    }

    class loggingMiddleware {
        -morgan
        -logger
        -stream
        +skip()
        -morganMiddleware
    }

    class index {
        -express
        -bodyParser
        -logger
        -loggingMidware
        -databaseConnectionTest
        -accountRoute
        -teamRoute
        -noteRoute
        -reminderRoute
        -cors
        -app
    }

    accountController --> dbconfig : uses
    accountController --> hasher : uses
    accountController --> logger : uses

    noteController --> dbconfig : uses
    noteController --> logger : uses

    reminderController --> dbconfig : uses
    reminderController --> logger : uses

    teamController --> dbconfig : uses
    teamController --> logger : uses

    accountRoute --> accountController : uses
    noteRoute --> noteController : uses
    reminderRoute --> reminderController : uses
    teamRoute --> teamController : uses

    dbconfig --> logger : uses

    loggingMiddleware --> logger : uses

    index --> accountRoute : uses
    index --> teamRoute : uses
    index --> noteRoute : uses
    index --> reminderRoute : uses
    index --> loggingMiddleware : uses
    index --> logger : uses
```

## ER Diagram
```mermaid
erDiagram
    ACCOUNT {
        UUID id PK
        TEXT email
        TEXT name
        TEXT password
        TIMESTAMP created_at
    }

    TEAM {
        UUID id PK
        TEXT title
        UUID owner_id FK
        TIMESTAMP created_at
    }

    ACCOUNT_TEAM {
        UUID id PK
        UUID account_id FK
        UUID team_id FK
    }

    NOTE {
        UUID id PK
        UUID team_id FK
        TEXT title
        TEXT body
        TIMESTAMP created_at
    }

    REMINDER {
        UUID id PK
        UUID team_id FK
        TEXT title
        TEXT body
        TIMESTAMP reminded_at
        reminder_status status
        TIMESTAMP created_at
    }

    ACCOUNT ||--o{ ACCOUNT_TEAM : has
    ACCOUNT ||--o{ TEAM : owns
    TEAM ||--|{ NOTE : contains
    TEAM ||--|{ REMINDER : contains
    TEAM ||--o{ ACCOUNT_TEAM : has
```

## Endpoints
### Base URL `/account`
> `POST /login`<br>
> Log into an existing account
>> Request body
>> ```json
>> {
>>    "email":"example@mail.com",
>>    "password":"example123"
>> }
>
>> Respond body (If success)
>> ```json
>> {
>>     "success": true,
>>     "message": "Login Success!",
>>     "data": {
>>         "id": "[UUID]",
>>         "email": "example@mail.com",
>>         "name": "Example Person",
>>         "password": "[64-bit hashed password]",
>>         "created_at": "[Timestamp with no timezone]"
>>     }
>> }

> `POST /register`<br>
> Register a new account
>> Request body
>> ```json
>> {
>>    "name":"Example Person",
>>    "email":"example@mail.com",
>>    "password":"example123"
>> }
>
>> Respond body (If success)
>> ```json
>> {
>>     "success": true,
>>     "message": "Register Success!",
>>     "data": null
>> }

> `DELETE /:accountId`<br>
> Delete an account
>> ```json
>> {
>>    "password":"example123"
>> }
>
>> Respond body (If success)
>> ```json
>> {
>>     "success": true,
>>     "message": "Delete success!",
>>     "data": null
>> }

> `PUT /:accountId`<br>
> Update an account
>> Request body
>> ```json
>> {
>>    "name":"[new name]",
>>    "email":"[new email]",
>>    "password":"[new password]"
>> }
>
>> Respond body (If success)
>> ```json
>> {
>>     "success": true,
>>     "message": "Update Success!",
>>     "data": {
>>         "id": "[UUID]",
>>         "email": "[new email]",
>>         "name": "[new name]",
>>         "password": "[new 64-bit hashed password]",
>>         "created_at": "[Timestamp with no timezone]"
>>     }
>> }
### Base URL `/team`
> `POST /create` Create a note

> `GET /:teamId` Get all notes from a team

> `DELETE /:noteId` Delete a note

> `PUT /:noteId` Update a note
### Base URL `/note`
> `POST /create` Create a note

> `GET /:teamId` Get all notes from a team

> `DELETE /:noteId` Delete a note

> `PUT /:noteId` Update a note
### Base URL `/reminder`