CREATE TABLE public."agency" (
    name  character varying NOT NULL,
    token character varying NOT NULL
);

ALTER TABLE ONLY public."agency"
    ADD CONSTRAINT "PK_agency_name" PRIMARY KEY (name);

CREATE TABLE public."agency__staff_user" (
    "agencyName" character varying NOT NULL,
    "userLogin"  character varying NOT NULL
);

ALTER TABLE ONLY public."agency__staff_user"
    ADD CONSTRAINT "FK_agency_staff" FOREIGN KEY ("agencyName") REFERENCES public."agency" (name),
    ADD CONSTRAINT "FK_user_staff"   FOREIGN KEY ("userLogin")  REFERENCES public."user"   (login);

#DOWN

DROP TABLE public."agency__staff_user";
DROP TABLE public."agency";