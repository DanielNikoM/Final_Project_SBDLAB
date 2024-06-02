-- account table
CREATE TABLE account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- team table
CREATE TABLE team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    owner_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- account-team table
CREATE TABLE account_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL,
    team_id UUID NOT NULL
);

-- note table
CREATE TABLE note (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- reminder status enum
CREATE TYPE reminder_status AS ENUM('DONE', 'NOT DONE', 'CANCELED');

-- reminder table
CREATE TABLE reminder (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    reminded_at TIMESTAMP NOT NULL,
    status reminder_status DEFAULT 'NOT DONE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);