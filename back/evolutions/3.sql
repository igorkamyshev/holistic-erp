ALTER TABLE public."user" 
    ADD COLUMN "credentialsPassword" character varying;

#DOWN

ALTER TABLE public."user" 
    DROP "credentialsPassword";
