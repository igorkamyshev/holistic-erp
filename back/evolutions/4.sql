CREATE TABLE public."telegram_channel" (
    id    character varying NOT NULL,
    name  character varying NOT NULL,
    link  character varying
);

ALTER TABLE ONLY public."telegram_channel"
    ADD CONSTRAINT "PK_telegramChannel_id" PRIMARY KEY (id);

CREATE TABLE public."agency__telegram_channels_telegram_channel" (
    "agencyName"         character varying NOT NULL,
    "telegramChannelId"  character varying NOT NULL
);

ALTER TABLE ONLY public."agency__telegram_channels_telegram_channel"
    ADD CONSTRAINT "FK_agency_telegramChannels" FOREIGN KEY ("agencyName")         REFERENCES public."agency"          (name),
    ADD CONSTRAINT "FK_telegramChannel_agency"  FOREIGN KEY ("telegramChannelId")  REFERENCES public."telegram_channel" (id);

#DOWN

DROP TABLE public."agency__telegram_channels_telegram_channel";
DROP TABLE public."telegram_channel";