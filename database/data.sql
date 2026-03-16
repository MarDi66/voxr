SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict drKszuxdixKayTC8jk9PzZf9aqQ5DIUwfofRe79GPPElViC5JfTFsbMyChT5GAJ

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'a0f18c54-b3ed-4a3b-9bf2-66d4aff7cd2a', '{"action":"user_signedup","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-03-14 18:48:40.412363+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b98c687-7b67-4bb0-acd7-8f547c60bff2', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-14 18:48:40.417371+00', ''),
	('00000000-0000-0000-0000-000000000000', '891bb481-4317-404a-8df1-3cb8ca507810', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-14 18:48:40.442281+00', ''),
	('00000000-0000-0000-0000-000000000000', '55cad529-a27e-4a64-8ebe-bbfdcab806d1', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 18:48:52.514072+00', ''),
	('00000000-0000-0000-0000-000000000000', '0570df7a-fbdd-468f-aac6-f92d3b687364', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-14 21:31:35.566053+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8d28b64-71ac-4a47-9023-715e23372b14', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-14 21:31:35.566534+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a075b5a-bf2b-451a-bf75-c0327928d2a5', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-14 22:35:31.521983+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d5815e1-fbef-4e7f-96bf-6b991777ac75', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-14 22:35:31.522462+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd335af38-78a5-42ce-a4ac-8c7c0c7d41de', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 22:56:18.691905+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f93bb34-9dc2-44be-a434-856236839a0b', '{"action":"user_signedup","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-03-14 22:56:26.041306+00', ''),
	('00000000-0000-0000-0000-000000000000', '818d653e-5525-463d-9020-88aa666e682f', '{"action":"login","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-14 22:56:26.046318+00', ''),
	('00000000-0000-0000-0000-000000000000', '51a0ff62-5840-4741-b375-e0ad9570ada7', '{"action":"user_recovery_requested","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"user"}', '2026-03-14 22:56:26.07301+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c39c73f0-24ee-4842-b6c4-bae3709a0265', '{"action":"login","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"account"}', '2026-03-14 22:56:40.002562+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b945aa1a-7062-4060-a14d-02001390497c', '{"action":"logout","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:02:24.709045+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dd7373a1-0f69-45f2-b566-2ae8dcb32b7f', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-14 23:02:32.222385+00', ''),
	('00000000-0000-0000-0000-000000000000', '02e9f539-1cbc-457d-b016-9096809943d9', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:02:37.957597+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc198ea0-9f20-4d49-91c0-57383b8e4ca3', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:02:44.761927+00', ''),
	('00000000-0000-0000-0000-000000000000', '00cb3c84-330d-4b07-9878-72f798227478', '{"action":"user_signedup","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-03-14 23:02:56.282061+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fa612ae-83ee-4e48-a84b-c08981519615', '{"action":"login","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-14 23:02:56.287224+00', ''),
	('00000000-0000-0000-0000-000000000000', '7bd5e591-9e67-4f94-a285-acc389cef7e1', '{"action":"user_recovery_requested","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-14 23:02:56.313307+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce1c5a69-4961-4444-9516-809a70edb4ab', '{"action":"login","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:03:01.722343+00', ''),
	('00000000-0000-0000-0000-000000000000', '4b39c329-6e95-4d06-ad00-722d47460f32', '{"action":"logout","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:13:49.983817+00', ''),
	('00000000-0000-0000-0000-000000000000', '552bbf8d-c593-4011-b016-e323ecef980c', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-14 23:13:56.473681+00', ''),
	('00000000-0000-0000-0000-000000000000', '260d5ce0-2702-4a69-bd0a-5181e0a893fd', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-14 23:14:02.648886+00', ''),
	('00000000-0000-0000-0000-000000000000', '4572dcbb-80bc-4908-a1fb-f8ef6539e1a3', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 00:12:35.999608+00', ''),
	('00000000-0000-0000-0000-000000000000', '6579a05f-d6c1-4a80-91a8-66ec28d518f0', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 00:12:36.000114+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac9efbf6-221b-495a-bd3f-2123f547cc92', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 00:32:18.450018+00', ''),
	('00000000-0000-0000-0000-000000000000', '6fa1d978-2615-4de5-b1c6-292007729ab9', '{"action":"user_recovery_requested","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"user"}', '2026-03-15 00:32:22.702143+00', ''),
	('00000000-0000-0000-0000-000000000000', '6bf45973-9e0f-47c4-9b09-1de9d9b432a1', '{"action":"login","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"account"}', '2026-03-15 00:32:32.404238+00', ''),
	('00000000-0000-0000-0000-000000000000', '998995da-dc69-4ecb-b41e-043aa650e8da', '{"action":"logout","actor_id":"a5e24acc-93a1-4ae8-8688-3b5cd58330d0","actor_username":"yohann@traacks.fr","actor_via_sso":false,"log_type":"account"}', '2026-03-15 00:49:44.673163+00', ''),
	('00000000-0000-0000-0000-000000000000', '7880dbe0-0c05-4066-9c53-8ecbffe80b13', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 00:49:50.765297+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c60474c0-eec1-4fe5-b5dd-6fe0723fa57b', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 00:49:57.728703+00', ''),
	('00000000-0000-0000-0000-000000000000', '6f7ec172-3020-4654-b231-72a5ff446cd5', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:36.917026+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe18a9f3-0dfc-401b-9e09-1634487fa02a', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:36.917615+00', ''),
	('00000000-0000-0000-0000-000000000000', '68c4e935-9beb-42c4-a2b2-7a498ab69e48', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.03232+00', ''),
	('00000000-0000-0000-0000-000000000000', '1405de6a-118a-4626-a15b-4066b50b67e9', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.103128+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a24b38c9-74c7-4ff2-b6a5-e4e4cdba8c61', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.171779+00', ''),
	('00000000-0000-0000-0000-000000000000', '4c737a41-97aa-4fd4-931d-b6a3c300f6eb', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.23664+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2028be1-8aa6-439c-b144-4d612ebfc8a7', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.307597+00', ''),
	('00000000-0000-0000-0000-000000000000', '006fccf1-b4be-4515-b339-4f34f12b9da6', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.390311+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ae9d71a-b472-4709-a561-cd230bec418c', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.466912+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ad177ddb-0c81-434a-afba-7a6bc1f26c08', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.54179+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a421509d-e5c4-4d62-aba2-596ae0c88a27', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.618854+00', ''),
	('00000000-0000-0000-0000-000000000000', '0e91d900-4051-414c-a5d9-0c25f273f268', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.690343+00', ''),
	('00000000-0000-0000-0000-000000000000', '3550d441-a948-4a99-aa08-02b57968651f', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.767698+00', ''),
	('00000000-0000-0000-0000-000000000000', '1e8ca82a-b7af-4062-8a70-bdaac9dd9ac6', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.849104+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8989521-bbac-4ef6-a42c-ded8e64eaea5', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.917934+00', ''),
	('00000000-0000-0000-0000-000000000000', '8e9f9a63-3df1-4939-bfde-0252c1ded0a4', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:37.989806+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2de5eea-a2cd-487b-91ab-c328e2d82697', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.059905+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c4d8c4c5-01c6-44e2-bbbc-c5967b7c5925', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.142872+00', ''),
	('00000000-0000-0000-0000-000000000000', '57903b36-e8bf-4ca3-b7bd-ae77cdc5d958', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.211563+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e9e97c3-224f-4a5a-b898-f07aa8fe4c1e', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.284917+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce29fb40-6c01-4995-b09e-fe054ee427fa', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.348828+00', ''),
	('00000000-0000-0000-0000-000000000000', '893cc7f9-1b51-4fa0-bf26-63aec95db0a0', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.431912+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd046b0d2-3814-460c-b8ea-5fc23478fbb8', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.514706+00', ''),
	('00000000-0000-0000-0000-000000000000', '62987ae4-9b04-47fc-8b20-c3d5de13b8a5', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 08:38:38.57724+00', ''),
	('00000000-0000-0000-0000-000000000000', '1a52ddfd-8255-46b6-9713-96e86d4bdbce', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 17:17:30.552598+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d0a75e2-cf6e-431f-b6fd-3567db088b2d', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 17:17:30.553176+00', ''),
	('00000000-0000-0000-0000-000000000000', '7e2c59f2-84b3-446c-86f2-46d28798408f', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 17:30:52.455371+00', ''),
	('00000000-0000-0000-0000-000000000000', 'de93ff1e-a877-444f-bcf8-fe08736d330b', '{"action":"user_recovery_requested","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 17:31:02.583301+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5b3b381-92a2-40ae-bd35-e84f318fed39', '{"action":"login","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 17:31:11.932915+00', ''),
	('00000000-0000-0000-0000-000000000000', '710c5be9-44c4-401c-817f-860a7433e013', '{"action":"logout","actor_id":"240855d4-c3e6-4a4b-9d80-1c17c17a68c6","actor_username":"yohann.mtfpro+new@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 17:36:47.777497+00', ''),
	('00000000-0000-0000-0000-000000000000', '7966f376-1454-4232-a99d-8e3f70c348f6', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 17:36:57.709803+00', ''),
	('00000000-0000-0000-0000-000000000000', '107a3a1e-2bed-4c83-9a79-edc66c96c808', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 17:37:02.140351+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f67760ef-9b4f-41b8-b826-b8c290213f32', '{"action":"token_refreshed","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 21:14:25.904174+00', ''),
	('00000000-0000-0000-0000-000000000000', '6eda9c13-75a0-448f-8486-1bdfeccbd1a1', '{"action":"token_revoked","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"token"}', '2026-03-15 21:14:25.904701+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fc25e03-21dd-4a90-ba88-da2d4cb7b714', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 21:38:34.759027+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dee6a09c-f5f7-43d2-a3ce-0bbc8a05fc6a', '{"action":"user_signedup","actor_id":"fe7ac01f-33f8-4654-91f8-66c95fb299be","actor_username":"yohann.mtfpro+admin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2026-03-15 21:38:53.612922+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e29eab06-a88f-4a1a-a6f1-2af6f91719c2', '{"action":"login","actor_id":"fe7ac01f-33f8-4654-91f8-66c95fb299be","actor_username":"yohann.mtfpro+admin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2026-03-15 21:38:53.618+00', ''),
	('00000000-0000-0000-0000-000000000000', '1186c93b-0023-49d4-b737-b2f597c0cdc3', '{"action":"user_recovery_requested","actor_id":"fe7ac01f-33f8-4654-91f8-66c95fb299be","actor_username":"yohann.mtfpro+admin@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 21:38:53.642828+00', ''),
	('00000000-0000-0000-0000-000000000000', '7112daf3-4605-4837-8a50-b7de1150041d', '{"action":"login","actor_id":"fe7ac01f-33f8-4654-91f8-66c95fb299be","actor_username":"yohann.mtfpro+admin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 21:39:00.687355+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c8580af-0e71-45ff-b22e-ea65078cc739', '{"action":"logout","actor_id":"fe7ac01f-33f8-4654-91f8-66c95fb299be","actor_username":"yohann.mtfpro+admin@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 21:57:42.320913+00', ''),
	('00000000-0000-0000-0000-000000000000', '081b4634-0580-4d64-94bb-b015815476e1', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 21:57:49.14144+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b4f43680-c0a5-40e7-b6d1-481a62ad6ccb', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 21:57:54.347357+00', ''),
	('00000000-0000-0000-0000-000000000000', '605962cb-ccf1-42ed-814d-d45469f51a86', '{"action":"logout","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 21:59:25.123182+00', ''),
	('00000000-0000-0000-0000-000000000000', '46af3c0e-8f87-4888-86e5-33bcde4803f4', '{"action":"user_recovery_requested","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"user"}', '2026-03-15 22:02:28.850014+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b48404c7-191a-42d0-93da-24413dcc33b1', '{"action":"login","actor_id":"48a90adc-4a2d-46b7-b298-8e09c690cdcf","actor_username":"yohann.mtfpro@gmail.com","actor_via_sso":false,"log_type":"account"}', '2026-03-15 22:02:33.839155+00', '');


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at", "invite_token", "referrer", "oauth_client_state_id", "linking_target_id", "email_optional") VALUES
	('f81a9322-ce48-4483-a6c7-807335492d82', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '9ed96acf-ac20-4064-b3ca-71fc79921535', 's256', 'fLAHQaClMmK9gh50St6DorCmR3M_UxrFhqFGc0MxbW0', 'magiclink', '', '', '2026-03-14 18:48:40.432791+00', '2026-03-14 18:48:40.432791+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('52049362-74c5-4965-bd36-11eea24d7ac0', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', '306918b9-c153-4942-b802-9ead79627a2c', 's256', '_NmtFW2EBmhn_h_pYfmkBx0r-WxWTM5zKtgViFjK61E', 'magiclink', '', '', '2026-03-14 22:56:26.062332+00', '2026-03-14 22:56:26.062332+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('674e7c42-dd58-4658-aec6-ad20dbcf5462', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '54d7379c-b5a8-49dc-ae63-7a83c99ac919', 's256', 'j8scwAWyFpXvA02iee2DLrP5Rimg-gOreUDYElHauZc', 'magiclink', '', '', '2026-03-14 23:02:32.20636+00', '2026-03-14 23:02:32.20636+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('d6a39fc9-762e-42de-9247-670a1cb56cc8', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', '12623e8d-6934-41c7-95c4-2d5c861b06b5', 's256', '3RWllbqaKGSOHJ5sq7MNPl0uX3fLr9BM9SMKo-oQ1JQ', 'magiclink', '', '', '2026-03-14 23:02:56.301794+00', '2026-03-14 23:02:56.301794+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('dce3e217-7002-4c2a-9b30-31faa7dad4f8', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '502758ff-169e-4eb7-a713-e51b421cccec', 's256', 'ojvQCk74ww3LbYudeFo_ePWGRvdit5RWhy5m6t9rTCo', 'magiclink', '', '', '2026-03-14 23:13:56.458624+00', '2026-03-14 23:13:56.458624+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('6ec75df5-7d08-4d03-ac27-0d4a11c55cc6', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', '16f0d484-f479-4cc0-980a-1e4d028ad88d', 's256', '_GUv1UsNgsH-oPuqIer04OpscpIZG1ZX9KgZ1C3dDv4', 'magiclink', '', '', '2026-03-15 00:32:22.685863+00', '2026-03-15 00:32:22.685863+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('842ef5d1-95b1-4040-ae23-16377af5b9ce', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '9d7a21e2-36e9-43b6-9da1-5a093c736902', 's256', 'JF8zQzZMwV35dxRtnOPjBcJIYRpAeguDD171QXeIliM', 'magiclink', '', '', '2026-03-15 00:49:50.75505+00', '2026-03-15 00:49:50.75505+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('858059e6-41ff-4ea0-b0ae-d86621872723', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', 'bd13cba0-6712-428a-b311-6bc08296a84e', 's256', 'kX3gBhukUAEMv3zzrEc7FxTwiifhVDWr2edcKVqlyN0', 'magiclink', '', '', '2026-03-15 17:31:02.571043+00', '2026-03-15 17:31:02.571043+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('c1901449-c7e7-4da1-9f8c-4e7b18f16c09', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '8f71fd78-efcc-46b6-aad5-d6918b734aad', 's256', '0QZiwBd3GhLezB7X3mTN5H77s9Sg5BNhv9iMYgxVAIY', 'magiclink', '', '', '2026-03-15 17:36:57.691114+00', '2026-03-15 17:36:57.691114+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('d57faa40-a002-4654-a4e0-17b17b6378c4', 'fe7ac01f-33f8-4654-91f8-66c95fb299be', 'a62aacf0-10f2-43b1-acaf-eeea9ed7271f', 's256', 'JzWcA_5z-H3n9Pesqwgrjoljg-vlAEcvy7X_nAbBHsg', 'magiclink', '', '', '2026-03-15 21:38:53.631748+00', '2026-03-15 21:38:53.631748+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('9d56e267-37b7-4dde-8f4e-e064a79566ad', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '110e356e-9957-4bd8-95ef-f8435dcaf560', 's256', 'qNfwGV2L1ZddiW-nHpohwZqXsVl9-8tUYegVnQQaY90', 'magiclink', '', '', '2026-03-15 21:57:49.130682+00', '2026-03-15 21:57:49.130682+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false),
	('6d76340c-b018-4e11-bc6e-5d8368a0725b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '6f4b7acc-8598-4013-a9d1-1bbb95584bf6', 's256', 'XSV-bMNE2VgZ10sKWl5EJB_50oKvdzEkI6dE7JOqCF4', 'magiclink', '', '', '2026-03-15 22:02:28.831684+00', '2026-03-15 22:02:28.831684+00', 'magiclink', NULL, NULL, NULL, NULL, NULL, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'authenticated', 'authenticated', 'yohann@traacks.fr', '$2a$10$GQTCHM8ZLscGjA.pg1Te0.Zqcgs6rZLTyMM.b.9A5.272ocWbN2SO', '2026-03-14 22:56:26.041604+00', NULL, '', NULL, '', '2026-03-15 00:32:22.703091+00', '', '', NULL, '2026-03-15 00:32:32.40677+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a5e24acc-93a1-4ae8-8688-3b5cd58330d0", "email": "yohann@traacks.fr", "email_verified": true, "phone_verified": false}', NULL, '2026-03-14 22:56:26.037831+00', '2026-03-15 00:32:32.409206+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'fe7ac01f-33f8-4654-91f8-66c95fb299be', 'authenticated', 'authenticated', 'yohann.mtfpro+admin@gmail.com', '$2a$10$keAv2iaRaJKJEaIj1inILe.mOW4bv038SsWJsg8XDgO1wsYmMoQA2', '2026-03-15 21:38:53.613236+00', NULL, '', NULL, '', '2026-03-15 21:38:53.643322+00', '', '', NULL, '2026-03-15 21:39:00.690197+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "fe7ac01f-33f8-4654-91f8-66c95fb299be", "email": "yohann.mtfpro+admin@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-15 21:38:53.609355+00', '2026-03-15 21:39:00.692856+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', 'authenticated', 'authenticated', 'yohann.mtfpro+new@gmail.com', '$2a$10$ZEzqUBELL1JFOjDYEz1ZVuQe5jH4FwiDGkVEC74IZuViTVNPHnoeC', '2026-03-14 23:02:56.28232+00', NULL, '', NULL, '', '2026-03-15 17:31:02.583962+00', '', '', NULL, '2026-03-15 17:31:11.934484+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "240855d4-c3e6-4a4b-9d80-1c17c17a68c6", "email": "yohann.mtfpro+new@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-14 23:02:56.278648+00', '2026-03-15 17:31:11.935918+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'authenticated', 'authenticated', 'yohann.mtfpro@gmail.com', '$2a$10$Q2/M/Q0kqh2FJM8bv6i8fe69D871DU4W14vgMvlCFEriRcvOcIErq', '2026-03-14 18:48:40.41285+00', NULL, '', NULL, '', '2026-03-15 22:02:28.850959+00', '', '', NULL, '2026-03-15 22:02:33.841422+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "48a90adc-4a2d-46b7-b298-8e09c690cdcf", "email": "yohann.mtfpro@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2026-03-14 18:48:40.405572+00', '2026-03-15 22:02:33.843118+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('48a90adc-4a2d-46b7-b298-8e09c690cdcf', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '{"sub": "48a90adc-4a2d-46b7-b298-8e09c690cdcf", "email": "yohann.mtfpro@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-14 18:48:40.410977+00', '2026-03-14 18:48:40.410994+00', '2026-03-14 18:48:40.410994+00', 'fbca05e2-4f01-40b9-afe0-470c2768acbd'),
	('a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', '{"sub": "a5e24acc-93a1-4ae8-8688-3b5cd58330d0", "email": "yohann@traacks.fr", "email_verified": false, "phone_verified": false}', 'email', '2026-03-14 22:56:26.040089+00', '2026-03-14 22:56:26.040149+00', '2026-03-14 22:56:26.040149+00', '9373e726-ca6f-4c7c-b262-9963bd836dce'),
	('240855d4-c3e6-4a4b-9d80-1c17c17a68c6', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', '{"sub": "240855d4-c3e6-4a4b-9d80-1c17c17a68c6", "email": "yohann.mtfpro+new@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-14 23:02:56.280895+00', '2026-03-14 23:02:56.280909+00', '2026-03-14 23:02:56.280909+00', 'ec205406-df9e-4b84-866b-56ce9d2294d5'),
	('fe7ac01f-33f8-4654-91f8-66c95fb299be', 'fe7ac01f-33f8-4654-91f8-66c95fb299be', '{"sub": "fe7ac01f-33f8-4654-91f8-66c95fb299be", "email": "yohann.mtfpro+admin@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2026-03-15 21:38:53.611753+00', '2026-03-15 21:38:53.611773+00', '2026-03-15 21:38:53.611773+00', 'c33614a6-e15e-49ce-8c3b-1b8ec60fac4e');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('9c7061f2-929e-4319-a0f7-2b0ede0b0736', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-15 22:02:33.841473+00', '2026-03-15 22:02:33.841473+00', NULL, 'aal1', NULL, NULL, 'node', '192.168.65.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('9c7061f2-929e-4319-a0f7-2b0ede0b0736', '2026-03-15 22:02:33.843559+00', '2026-03-15 22:02:33.843559+00', 'otp', '4e04d67c-2110-4d77-b9a2-ae1b16c0d51f');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 22, 'ap7vfu2ertvn', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', false, '2026-03-15 22:02:33.842313+00', '2026-03-15 22:02:33.842313+00', NULL, '9c7061f2-929e-4319-a0f7-2b0ede0b0736');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: workspaces; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspaces" ("id", "name", "slug", "created_by", "created_at", "auto_join_enabled") VALUES
	('68037979-98c9-4868-afc4-f598f8c6fb6b', 'mardi.work', 'mardiwork', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-14 18:49:03.957623+00', false);


--
-- Data for Name: feedback_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."feedback_items" ("id", "workspace_id", "author_id", "title", "body", "category", "status", "created_at", "updated_at", "is_flagged") VALUES
	('f160d0fa-3751-4cab-b6c5-75b8d9f2ec90', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Is Robert mad?', 'Sending messages @ 11pm wtf', 'question', 'published', '2026-03-14 21:43:42.015081+00', '2026-03-14 21:43:42.015081+00', false),
	('f155b73b-8efa-4247-8673-39b07431b954', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Once again', 'A new one to test', 'question', 'hidden', '2026-03-14 22:28:53.889048+00', '2026-03-14 23:24:52.875905+00', false),
	('d8496bfc-b6f7-4dfd-8468-30506c453b24', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'This is a new feedback', 'This one is really cool', 'idea', 'published', '2026-03-14 22:28:18.893666+00', '2026-03-15 01:11:00.247348+00', false),
	('eb62c4ef-7f85-4bc9-a1a1-e102703ca073', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'This is a praise feedback', 'So cool to work here with you', 'praise', 'published', '2026-03-14 21:46:25.537202+00', '2026-03-15 01:11:00.247348+00', true);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."comments" ("id", "workspace_id", "item_id", "author_id", "body", "status", "created_at") VALUES
	('c2dd8fe1-4315-47e4-8228-2cdc34ab355c', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'eb62c4ef-7f85-4bc9-a1a1-e102703ca073', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'Let''s go!', 'published', '2026-03-14 22:57:09.080631+00'),
	('d40bf8c7-3452-476d-be72-785caf47419a', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'd8496bfc-b6f7-4dfd-8468-30506c453b24', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'Waw!', 'published', '2026-03-14 22:57:17.938269+00'),
	('353ccfc6-2523-427f-b5d1-2c2ef2cf6e4e', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'eb62c4ef-7f85-4bc9-a1a1-e102703ca073', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Super cool', 'hidden', '2026-03-14 22:50:56.826993+00'),
	('763f76d8-dd2f-420a-b8b6-ea274b25963b', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'eb62c4ef-7f85-4bc9-a1a1-e102703ca073', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Waw!', 'hidden', '2026-03-14 22:24:59.007849+00'),
	('3fcca1dd-304a-47cc-a15a-db6c7cdc248d', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'd8496bfc-b6f7-4dfd-8468-30506c453b24', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'SO cool', 'published', '2026-03-15 08:39:26.210353+00');


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."forms" ("id", "workspace_id", "created_by", "title", "description", "visibility", "status", "created_at") VALUES
	('e2e2d48d-ae80-418a-b046-25c5fda5e791', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Public form title', NULL, 'public', 'published', '2026-03-15 00:05:19.28363+00'),
	('e86db7df-5c94-4487-8b2e-72c6a694ab9c', '68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'Private title', 'Private description', 'private', 'closed', '2026-03-15 00:31:26.254751+00');


--
-- Data for Name: form_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_questions" ("id", "form_id", "question_text", "question_type", "options", "position", "required") VALUES
	('6f68387e-eb1d-49b5-88be-f4bcd7b413f6', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', 'Short text', 'short_text', '[]', 0, true),
	('85170cb7-08ad-4ce5-bbea-b3eeb3a91507', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', 'Long text', 'long_text', '[]', 1, true),
	('3cbceb32-09b5-42c6-9d2d-a707401bbf83', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', 'Single choice', 'single_choice', '["Option 1", "Option 2"]', 2, true),
	('63c93205-902f-4388-85f6-15c18b8ffcba', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', 'Multiple choice', 'multiple_choice', '["Choice 1", "Choice 2", "Choice 3"]', 3, true),
	('dc989040-5b7a-4a2f-ae1a-0447b7c7685f', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', 'Rating 1-5', 'rating', '[]', 4, true),
	('0e87eb19-f6b8-4fad-83b1-b2ac8b5748f6', 'e86db7df-5c94-4487-8b2e-72c6a694ab9c', 'Long', 'long_text', '[]', 0, true),
	('3765db82-7f9b-479c-9d35-cba118c417fc', 'e86db7df-5c94-4487-8b2e-72c6a694ab9c', 'Rating', 'rating', '[]', 1, true),
	('0dfc134b-da5f-4a1f-83de-5c34d3796011', 'e86db7df-5c94-4487-8b2e-72c6a694ab9c', 'Short ', 'short_text', '[]', 2, true);


--
-- Data for Name: form_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_responses" ("id", "form_id", "respondent_id", "created_at") VALUES
	('d73d8131-6959-430b-adf2-cda88d4d9e27', 'e2e2d48d-ae80-418a-b046-25c5fda5e791', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-15 00:24:49.515294+00'),
	('5ab8f9bf-2c6d-4010-8564-89a076f42b90', 'e86db7df-5c94-4487-8b2e-72c6a694ab9c', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-15 00:32:07.561634+00'),
	('644e63c0-f694-483f-b2d5-7d4eceea1cfc', 'e86db7df-5c94-4487-8b2e-72c6a694ab9c', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', '2026-03-15 00:42:17.073552+00');


--
-- Data for Name: form_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."form_answers" ("id", "response_id", "question_id", "answer_value") VALUES
	('716f8772-a3eb-4c72-9e60-7df7609cf711', 'd73d8131-6959-430b-adf2-cda88d4d9e27', '6f68387e-eb1d-49b5-88be-f4bcd7b413f6', 'Short answer'),
	('0f500b4e-f188-45db-a2cf-319aa494e424', 'd73d8131-6959-430b-adf2-cda88d4d9e27', '85170cb7-08ad-4ce5-bbea-b3eeb3a91507', 'Long answer'),
	('dfe0e8fd-a8d0-44cf-a3a2-61cd9d701ce9', 'd73d8131-6959-430b-adf2-cda88d4d9e27', '3cbceb32-09b5-42c6-9d2d-a707401bbf83', 'Option 1'),
	('b9191f4a-819f-4b09-866c-c56420007035', 'd73d8131-6959-430b-adf2-cda88d4d9e27', '63c93205-902f-4388-85f6-15c18b8ffcba', 'Choice 1|||Choice 3'),
	('326032b8-0cec-4776-b8fa-231a491a7903', 'd73d8131-6959-430b-adf2-cda88d4d9e27', 'dc989040-5b7a-4a2f-ae1a-0447b7c7685f', '5'),
	('0405dd73-15cc-4cc4-9521-186276b474f5', '5ab8f9bf-2c6d-4010-8564-89a076f42b90', '0e87eb19-f6b8-4fad-83b1-b2ac8b5748f6', 'Long'),
	('e8ca91f1-14a2-4d5e-832c-5f7f520e7731', '5ab8f9bf-2c6d-4010-8564-89a076f42b90', '3765db82-7f9b-479c-9d35-cba118c417fc', '3'),
	('7b982180-f4c8-45c6-94c7-8a619c755c04', '5ab8f9bf-2c6d-4010-8564-89a076f42b90', '0dfc134b-da5f-4a1f-83de-5c34d3796011', 'Short'),
	('bd296f75-2e54-439c-b043-2c4609ff0c85', '644e63c0-f694-483f-b2d5-7d4eceea1cfc', '0e87eb19-f6b8-4fad-83b1-b2ac8b5748f6', 'Long new'),
	('67252521-7133-4b57-9556-1f0d030af72e', '644e63c0-f694-483f-b2d5-7d4eceea1cfc', '3765db82-7f9b-479c-9d35-cba118c417fc', '2'),
	('6887417c-5a63-4ffb-98ae-b7adb971bd3a', '644e63c0-f694-483f-b2d5-7d4eceea1cfc', '0dfc134b-da5f-4a1f-83de-5c34d3796011', 'Short new');


--
-- Data for Name: reactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."reactions" ("id", "workspace_id", "target_type", "target_id", "user_id", "emoji", "created_at") VALUES
	('05398725-cf16-4075-a096-a952a9e37bea', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'comment', '353ccfc6-2523-427f-b5d1-2c2ef2cf6e4e', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '❤️', '2026-03-14 22:51:11.584142+00'),
	('bcdb35bf-0695-49c7-9579-3100d304d01d', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'item', 'd8496bfc-b6f7-4dfd-8468-30506c453b24', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '❤️', '2026-03-15 08:39:29.757968+00');


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."reports" ("id", "workspace_id", "target_type", "target_id", "reporter_id", "reason", "status", "created_at") VALUES
	('04cfc466-0b40-4748-afcf-e9638eb55395', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'comment', '353ccfc6-2523-427f-b5d1-2c2ef2cf6e4e', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', NULL, 'resolved', '2026-03-14 23:13:27.490739+00'),
	('d4481751-bc8f-42f9-951c-99c5a60f53e9', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'comment', '763f76d8-dd2f-420a-b8b6-ea274b25963b', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', NULL, 'dismissed', '2026-03-14 23:13:24.784407+00'),
	('bd2ed5ca-baee-48a8-aa34-35f9c995ccd8', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'comment', '763f76d8-dd2f-420a-b8b6-ea274b25963b', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', NULL, 'resolved', '2026-03-14 22:58:51.203356+00'),
	('dfb7ea83-7173-42c6-905e-1816f0bf3003', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'item', 'f155b73b-8efa-4247-8673-39b07431b954', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', NULL, 'resolved', '2026-03-14 23:13:10.598954+00'),
	('353b9b4f-ea7f-4f71-b768-a16eb233a950', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'item', 'f155b73b-8efa-4247-8673-39b07431b954', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', NULL, 'resolved', '2026-03-14 22:56:46.877989+00'),
	('0167a234-162c-4805-bad9-85c29c3ed7ec', '68037979-98c9-4868-afc4-f598f8c6fb6b', 'comment', 'd40bf8c7-3452-476d-be72-785caf47419a', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', NULL, 'pending', '2026-03-15 22:10:11.930085+00');


--
-- Data for Name: workspace_domains; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workspace_invites; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspace_invites" ("id", "workspace_id", "token_hash", "role", "created_by", "created_at", "expires_at", "used_at", "used_by", "status", "token") VALUES
	('b8c39f12-aa58-4829-b1f9-a7cab3a5d322', '68037979-98c9-4868-afc4-f598f8c6fb6b', '4a4fc3e970cb9b62177ed32cb51a50f38218803da64273a89ba439ba2fd6a84d', 'member', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-14 22:56:16.253791+00', '2026-03-21 22:56:16.252+00', '2026-03-14 22:56:42.005+00', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'used', 'dd614f4ed0187a7622a327607f84c697d549a710df84c543ddbd9d594cca244d'),
	('342eea0a-e289-4058-af0d-80668fb5e248', '68037979-98c9-4868-afc4-f598f8c6fb6b', '0ddac9e0faba900684d106a51d41d59c724f41c0570467f2ae09ae56ff4260dd', 'member', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-14 23:02:43.281879+00', '2026-03-21 23:02:43.28+00', '2026-03-14 23:03:03.403+00', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', 'used', '18e330387585515f58992da71c7bfdfe9d95b9e287d3051917d168396b818f60'),
	('853053a9-acd1-4323-beed-b915a7a30824', '68037979-98c9-4868-afc4-f598f8c6fb6b', '2b2955753fcf0bf5731c6a6f2e0bfe23daa972de0cc750b143050c0e72cbf262', 'admin', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', '2026-03-15 21:38:20.325534+00', '2026-03-22 21:38:20.319+00', '2026-03-15 21:50:05.215+00', 'fe7ac01f-33f8-4654-91f8-66c95fb299be', 'used', '2a2c2d67b1386311e1eaa24bb4d680f0353e53c91874e374019b67d22e5d7b2d');


--
-- Data for Name: workspace_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."workspace_members" ("workspace_id", "user_id", "role", "status", "joined_at") VALUES
	('68037979-98c9-4868-afc4-f598f8c6fb6b', '48a90adc-4a2d-46b7-b298-8e09c690cdcf', 'owner', 'active', '2026-03-14 18:49:03.963675+00'),
	('68037979-98c9-4868-afc4-f598f8c6fb6b', 'a5e24acc-93a1-4ae8-8688-3b5cd58330d0', 'member', 'active', '2026-03-14 22:56:42.001785+00'),
	('68037979-98c9-4868-afc4-f598f8c6fb6b', 'fe7ac01f-33f8-4654-91f8-66c95fb299be', 'admin', 'active', '2026-03-15 21:50:05.212619+00'),
	('68037979-98c9-4868-afc4-f598f8c6fb6b', '240855d4-c3e6-4a4b-9d80-1c17c17a68c6', 'member', 'active', '2026-03-14 23:03:03.401254+00');


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_namespaces; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: iceberg_tables; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 22, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

-- \unrestrict drKszuxdixKayTC8jk9PzZf9aqQ5DIUwfofRe79GPPElViC5JfTFsbMyChT5GAJ

RESET ALL;
