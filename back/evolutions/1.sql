CREATE TABLE public."user" (
    login              character varying NOT NULL,
    profile_name       character varying,
    profile_photo      character varying,
    "TelegramUsername" character varying,
    "TelegramId"       integer
);

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_user_login" PRIMARY KEY (login);

#DOWN

DROP TABLE public."user";