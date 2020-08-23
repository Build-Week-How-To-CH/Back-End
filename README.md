# Back-End
How-To

## Documentation

Base URL for deployed API: https://bw-how-2.herokuapp.com/

## **Endpoints**

| Method | URL | Description | Requires Token | Requires Admin |
|--------|-----|-------------|----------------|----------------|
| POST | /api/auth/register | register a new user | - | - |
| POST | /api/auth/login | login as existing user | - | - |
| POST | /api/howtos | create a new howto | X | X |
| POST | /api/users | creates a new user without returning a token | X | X |
| GET | /api/users | gets all users | X | X |
| GET | /api/users/:id | gets specific user | X | X |
| GET | /api/users/:id/howtos | gets all howtos authored by a user | X | - |
| GET | /api/howtos | gets all howtos | X | - |
| GET | /api/howtos/:id | gets a specific howto | X | - |
| PUT | /api/users/:id | edit a user | X | X |
| PUT | /api/howtos/:id | edit a howto | X | X |
| DELETE | /api/users/:id | delete a user | X | X |
| DELETE | /api/howtos/:id | delete a howto | X | X |

Note: If you try to delete a user that has authored any how-tos, you will not be able to. You must first delete all of the user's howtos before deleting the user.

## **Table Requirements**

## **Users**

| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | yes | yes | auto generated by the API |
| username | string | yes | yes | - |
| password | string | yes | no | - |
| isAdmin | boolean | yes | no | determines whether user can create howtos |

# **How-Tos**

| Name | Type | Required | Unique | Notes |
|------|------|----------|--------|-------|
| id | integer | yes | yes | auto generated by the API |
| user_id | integer | yes | no | Must be a valid user's id, this will be the author |
| title | string | yes | no | - |
| category | string | yes | no | - |
| content | string | yes | no | - |

## **Login's**

If i need to update the database at any point during the week all users made up until that point will be deleted. These logins will always be available to use.
| username | password | isAdmin |
| ----- | -------- | ---- |
| user | password | false |
| admin | password | true |

## **Requests and Returns**

### POST /api/auth/register
Request body:
```
{
    "username": "example",
    "password": "password",
    "isAdmin": true
}
```
Returns:
```
{
    "message": "User registered successfully",
    "user": {
        "id": 6,
        "username": "example",
        "password": "$2a$08$Swr0TBG39oQS.S5QWWbbre/A6VtKH32/bk0Vr1nUD5vgDnkFtbQy.",
        "isAdmin": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJ1c2VybmFtZSI6ImV4YW1wbGUiLCJpc0FkbWluIjoxLCJpYXQiOjE1OTgyMDE2NDYsImV4cCI6MTU5OTA2NTY0Nn0.GP3P2hSPFI64JcnBbCABHDzpFhw8_GChfa_A4r9mWeo"
}
```

### POST /api/auth/login
Request body:
```
{
    "username": "christian",
    "password": "password"
}
```
Returns:
```
{
    "welcome": "christian",
    "user": {
        "id": 3,
        "username": "christian",
        "password": "$2a$12$GvnMJ1BhS2we8bOXamjgJe/.PBE280Dw38QRbLNiZtVExGz5SDWCa",
        "isAdmin": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6ImNocmlzdGlhbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTU5ODIwMTgwNiwiZXhwIjoxNTk5MDY1ODA2fQ.7iGEq3zWDZ8qt95wwYZr30tLWQpwNxKszBQLCdD0Jao"
}
```

### POST /api/users
Request body:
```
{
    "username": "example2",
    "password": "password",
    "isAdmin": false
}
```
Returns:
```
{
    "message": "User created successfully",
    "user": {
        "id": 7,
        "username": "example2",
        "password": "$2a$08$21MSmMRVC6E8rgaxzpmjtewo.WrjsCu9C0c6bLgKTI7QKBqED7tYe",
        "isAdmin": false
    }
}
```

### POST /api/howtos
Request body:
```
{
    "user_id": 3,
    "title": "test",
    "category": "test",
    "content": "test"
}
```
Returns:
```
{
    "message": "Howto created successfully",
    "howto": {
        "id": 7,
        "title": "test",
        "author": "christian",
        "user_id": 3,
        "category": "test",
        "content": "test"
    }
}
```

### GET /api/users
Returns:
```
{
    "users": [
        {
            "id": 1,
            "username": "user",
            "password": "$2a$08$E1Mb2BVrVHK58uLzBXqLMe26YxPfCr6cZv9R8e/mQU149KRbt5lSy",
            "isAdmin": false
        },
        {
            "id": 2,
            "username": "admin",
            "password": "$2a$08$8VcxZDSmdRdn84DQFKvlxeGyoBgSM5DWC/k8kpKSpfIjUKoym3cqK",
            "isAdmin": true
        },
        {
            "id": 3,
            "username": "christian",
            "password": "$2a$08$OjzHVTJ4aHSp5Um0Rbx4pOSFMAwo4N6HyWxsZYZvCbSqHeah/phZe",
            "isAdmin": true
        },
        {
            "id": 4,
            "username": "dave",
            "password": "$2a$08$TYVHWtzV4ffoFuKvBIW7r.nBs0dP7bcx1IY5rBwsOgxx84JXqlrze",
            "isAdmin": false
        },
        {
            "id": 5,
            "username": "dave1",
            "password": "$2a$08$.gzYBf9eeb/OsQEhsFWHF.HR1nO9AAEudBKyQqHzTD28GCiZ/O0lW",
            "isAdmin": true
        },
        {
            "id": 6,
            "username": "example",
            "password": "$2a$08$Swr0TBG39oQS.S5QWWbbre/A6VtKH32/bk0Vr1nUD5vgDnkFtbQy.",
            "isAdmin": true
        },
        {
            "id": 7,
            "username": "example2",
            "password": "$2a$08$21MSmMRVC6E8rgaxzpmjtewo.WrjsCu9C0c6bLgKTI7QKBqED7tYe",
            "isAdmin": false
        }
    ]
}
```

### GET /api/users/:id
Returns:
```
{
    "user": {
        "id": 3,
        "username": "christian",
        "password": "$2a$08$OjzHVTJ4aHSp5Um0Rbx4pOSFMAwo4N6HyWxsZYZvCbSqHeah/phZe",
        "isAdmin": true
    }
}
```

### GET /api/howtos/
Returns:
```
{
    "howtos": [
        {
            "id": 1,
            "title": "How to Win a Game of Chess",
            "author": "christian",
            "user_id": 3,
            "category": "games",
            "content": "Step 1: Tell your opponent that you are a grand master in order to psych them out. Step 2: If your opponent calls your bluff, try your best to win. Step 3: If you start getting close to losing, flip the board and say that you're late for a chess meeting. Step 4: Checkmate."
        },
        {
            "id": 2,
            "title": "How to Start a New Life",
            "author": "christian",
            "user_id": 3,
            "category": "travel",
            "content": "Step 1: Destroy your passport. Step 2: Steal someone else's passport and paste your own photo on theirs with an Elmers glue stick. Step 3: Fly to Argentina and start your new life as a wheat farmer."
        },
        {
            "id": 3,
            "title": "How to Make a Sandwich",
            "author": "christian",
            "user_id": 3,
            "category": "food",
            "content": "Step 1: Get 2 slices of bread. Step 2: spead peanutbutter on one slice, jelly on the other. Step 3: Combine and Enjoy!"
        },
        {
            "id": 4,
            "title": "How to Change a Tire",
            "author": "christian",
            "user_id": 3,
            "category": "automotive",
            "content": "Step 1: Place jack under vehicle and jack up until the desired tire to change is off the ground. Step 2: Remove the lug nuts from the tire. Step 3: Remove old tire and replce it with the new one. Step 4: Tighten the lug nuts. Step 5: Lower the vehicle and you are good to go!"
        },
        {
            "id": 5,
            "title": "How to Start a Fire",
            "author": "christian",
            "user_id": 3,
            "category": "outdoor",
            "content": "Step 1: Pile up your wood in fireplace Step 2: add lighter fluid Step 3: light a match and throw it in the lighter fluid and enjoy!"
        },
        {
            "id": 7,
            "title": "test",
            "author": "admin",
            "user_id": 2,
            "category": "test",
            "content": "test"
        }
    ]
}
```

### GET /api/howtos/:id
Returns:
```
{
    "howto": {
        "id": 1,
        "title": "How to Win a Game of Chess",
        "author": "christian",
        "user_id": 3,
        "category": "games",
        "content": "Step 1: Tell your opponent that you are a grand master in order to psych them out. Step 2: If your opponent calls your bluff, try your best to win. Step 3: If you start getting close to losing, flip the board and say that you're late for a chess meeting. Step 4: Checkmate."
    }
}
```

### GET /api/users/:id/howtos
Returns:
```
{
    "howtos": [
        {
            "title": "test",
            "author": "admin",
            "user_id": 2,
            "category": "test",
            "content": "test"
        }
    ]
}
```

### PUT /api/users/:id
Request body:
```
{
    "username": "christian39",
    "password": "testing",
    "isAdmin": true
}
```
Returns:
```
{
    "message": "User with id 5 updated successfully",
    "user": {
        "id": 5,
        "username": "christian39",
        "password": "testing",
        "isAdmin": true
    }
}
```

### PUT /api/howtos/:id
Request body:
```
{
    "user_id": 2,
    "title": "testing",
    "category": "testing",
    "content": "testing"
}
```
Returns:
```
{
    "message": "Howto with id 7 successfully updated",
    "howto": {
        "id": 7,
        "title": "testing",
        "author": "admin",
        "user_id": 2,
        "category": "testing",
        "content": "testing"
    }
}
```

### DELETE /api/users/:id
Returns:
```
{
    "message": "User with id 7 successfully deleted",
    "deletedUser": {
        "id": 7,
        "username": "example2",
        "password": "$2a$08$21MSmMRVC6E8rgaxzpmjtewo.WrjsCu9C0c6bLgKTI7QKBqED7tYe",
        "isAdmin": false
    }
}
```

### DELETE /api/howtos/:id
Returns:
```
{
    "message": "Howto with id 7 deleted successfully",
    "deletedHowto": {
        "id": 7,
        "title": "testing",
        "author": "admin",
        "user_id": 2,
        "category": "testing",
        "content": "testing"
    }
}
```