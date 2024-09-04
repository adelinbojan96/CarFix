--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2024-09-04 11:52:59

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4863 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16427)
-- Name: buyers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.buyers (
    id integer NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.buyers OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16414)
-- Name: firm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.firm (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying,
    created_at integer NOT NULL
);


ALTER TABLE public.firm OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16419)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id_message integer NOT NULL,
    message character varying NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    time_sent timestamp without time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16409)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying,
    user_id integer NOT NULL,
    price real NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp without time zone,
    firm_id integer NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16424)
-- Name: sellers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sellers (
    id integer NOT NULL,
    id_user integer NOT NULL
);


ALTER TABLE public.sellers OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24595)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16404)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    email character varying NOT NULL,
    role character varying,
    created_at timestamp without time zone,
    picture bytea
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4856 (class 0 OID 16427)
-- Dependencies: 220
-- Data for Name: buyers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4853 (class 0 OID 16414)
-- Dependencies: 217
-- Data for Name: firm; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4854 (class 0 OID 16419)
-- Dependencies: 218
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4852 (class 0 OID 16409)
-- Dependencies: 216
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4855 (class 0 OID 16424)
-- Dependencies: 219
-- Data for Name: sellers; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4851 (class 0 OID 16404)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'adelinbojan', '$2a$10$JxZfFxxyLYISh3jzsxXQxu8U90MMFfZcYtEpsBfN1SrKo5KwO0T2a', 'adelinbojan96@gmail.com', 'Buyer', '2024-09-03 15:33:39.557145', NULL);
INSERT INTO public.users VALUES (2, 'adelinutz', '$2a$10$RgpDmIpa4hdbnKv8EhFd5.4MacTyc0Hn16z1php6d9ZkQORkF7L/y', 'adelinbojan96@gmail.com', 'Buyer', '2024-09-03 15:35:16.247359', NULL);
INSERT INTO public.users VALUES (3, 'idk', '$2a$10$j0n2RoGd5UcsXyl1fQAzTe1PmvgCTkY0TnGKjw7txUlKsywKBKwI2', 'idk', 'Buyer', '2024-09-04 09:09:37.574695', NULL);


--
-- TOC entry 4864 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


-- Completed on 2024-09-04 11:52:59

--
-- PostgreSQL database dump complete
--

